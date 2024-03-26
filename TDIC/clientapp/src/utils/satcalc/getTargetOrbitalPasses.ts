import type { Satellite } from '@prisma/client'
import { type GeodeticLocation, type LookAngles } from 'satellite.js'
import * as satellite from 'satellite.js'
import { v4 as uuidv4 } from 'uuid'

import type { OrbitalPass } from '@/types/OrbitalPass'

import { getTargetGeodeticLocation } from './getTargetGeodeticLocation'
import { SatTrackingInfoFromObserver } from './SatTrackingInfoFromObserver'

/**
 * ●考え方
 *
 * AOSとLOSにNullをセットしておく
 * 指定期間ループを回す
 * 仰角を確認し、0より大きくなり、かつAOSがNULLだった場合、パスが開始されたことを意味するので
 * その時刻をAOSとする。
 * 迎角が0より小さくなり、かつAOSがNULLでなく、かつLOSがNULLだった場合、パスが終了したことを
 * 意味するので、その時刻をLOSとする
 */

/**
 *
 * 軌道パス(オブザーバーから見てターゲットが水平線の上にいる時間帯を計算する)
 * @param {GeodeticLocation} observerGd オブザーバー(観測者)の位置情報
 * @param {Date} date 計算開始日時
 * @param {tlestring} tlestring ターゲットのTLE文字列
 * @param {pitch} number 計算ピッチ(秒)
 * @param {num} number ループ回数
 */

export function getTargetOrbitalPasses(
  observerGd: GeodeticLocation,
  startdate: Date,
  tlestring: Satellite,
  pitch: number,
  num: number,
): OrbitalPass[] {
  let aos: Date | null = null
  let ang_aos: LookAngles | null = null
  let los: Date | null = null
  let ang_los: LookAngles | null = null

  let maxel: Date | null = null
  let ang_maxel: LookAngles | null = null

  //引数をそのまま使うと参照元を上書きしてしまうので、別オブジェクトにコピーして使う
  const date = new Date(startdate.getTime())

  const orbitalPasses: OrbitalPass[] = []

  const satnum = satellite.twoline2satrec(
    tlestring.tleLine1,
    tlestring.tleLine2,
  ).satnum

  for (let i = 0; i < num; i++) {
    date.setSeconds(date.getSeconds() + 1 * pitch) // 1ピッチ秒を加算
    const res = SatTrackingInfoFromObserver(observerGd, date, tlestring)

    if (res.lookAngles.elevation > 0) {
      if (aos === null) {
        //迎角が0より大きく、かつAOSがNULLのカウントは、軌道パスに入った初回のステップであることを意味するので、
        //AOSとMAXEIをリセットする
        aos = new Date(date.getTime())
        ang_aos = res.lookAngles

        // maxeiの初期値を入れる

        maxel = new Date(date.getTime())
        ang_maxel = res.lookAngles
      }

      if (ang_maxel && res.lookAngles.elevation > ang_maxel.elevation) {
        //迎角が0より大きい条件の場合、そのステップの迎角を計算し、現在のMAXEIよりも大きいなら、
        //値を更新する
        maxel = new Date(date.getTime())
        ang_maxel = res.lookAngles
      }
    } else {
      if (aos !== null && los === null) {
        //迎角が0より小さく、かつAOSがNULLではなく、かつLOSがNULLである状態は、
        //パスから出たことを意味するのて、このカウントの値でLOSを更新し、
        //AOS、MAXEI、LOSの関連情報を更新、DB格納した後一連の値をNULL代入して
        //リセットし、次のパスに入るのを待つ状態にする。

        //AOSとMAXEIをリセットする
        los = new Date(date.getTime())
        ang_los = res.lookAngles

        const aos_target_gd = getTargetGeodeticLocation(aos, tlestring)
        const los_target_gd = getTargetGeodeticLocation(los, tlestring)
        const maxel_target_gd = getTargetGeodeticLocation(
          maxel || aos,
          tlestring,
        )

        //テーブルに代入
        orbitalPasses.push({
          id: uuidv4(),
          noradcatid: Number(satnum),
          aos: aos,
          los: los,

          maxel: maxel || aos,

          aos_target_longitude: aos_target_gd.longitude,
          aos_target_latitude: aos_target_gd.latitude,
          aos_target_height: aos_target_gd.height,
          aos_target_azimuth: ang_aos?.azimuth || 0,
          aos_target_elevation: ang_aos?.elevation || 0,
          aos_target_rangeSat: ang_aos?.rangeSat || 0,

          los_target_longitude: los_target_gd.longitude,
          los_target_latitude: los_target_gd.latitude,
          los_target_height: los_target_gd.height,
          los_target_azimuth: ang_los?.azimuth || 0,
          los_target_elevation: ang_los?.elevation || 0,
          los_target_rangeSat: ang_los?.rangeSat || 0,

          maxel_target_longitude: maxel_target_gd.longitude,
          maxel_target_latitude: maxel_target_gd.latitude,
          maxel_target_height: maxel_target_gd.height,
          maxel_target_azimuth: ang_maxel?.azimuth || 0,
          maxel_target_elevation: ang_maxel?.elevation || 0,
          maxel_target_rangeSat: ang_maxel?.rangeSat || 0,

          calclated_datetime: new Date(),
        })

        //各値をリセット
        aos = null
        los = null

        maxel = null
      }
    }
  }
  return orbitalPasses
}
