import type { Satellite } from '@prisma/client'
import * as satellite from 'satellite.js'
import {
  type GeodeticLocation,
  type LookAngles,
  type PositionAndVelocity,
} from 'satellite.js'

export interface CalclatedSatinfo {
  targetPositionAndVelocity: PositionAndVelocity
  lookAngles: LookAngles
}

/**
 * 用語
 * ECI ： Earth-centered inertial(地心慣性座標系)
 * 地球の中心を基準とした座標系
 * https://en.wikipedia.org/wiki/Earth-centered_inertial
 * https://lsas-tec.co.jp/coordinate_reference_frame/#:~:text=%E5%9C%B0%E7%90%83%E4%B8%AD%E5%BF%83%E6%85%A3%E6%80%A7%E5%BA%A7%E6%A8%99%E7%B3%BB,%E7%B3%BB%E3%81%AE%E4%B8%80%E3%81%A4%E3%81%A7%E3%81%99%E3%80%82
 *
 */

// 内容はほぼ以下を参考に構築
// https://github.com/shashwatak/satellite-js#sample-usage
/**
 *
 * オブザーバーの位置情報、ターゲットのTLE文字列、指定時刻を元に、ターゲットの位置情報と、
 * 観測者を基準としたターゲットの方位・迎角等を計算する
 * @param {GeodeticLocation} observerGd オブザーバー(観測者)の位置情報
 * @param {Date} date 計算日時
 * @param {tlestring} tlestring ターゲットのTLE文字列
 */
export function SatTrackingInfoFromObserver(
  observerGd: GeodeticLocation,
  date: Date,
  tlestring: Satellite,
): CalclatedSatinfo {
  // Calculate satellite position | 衛星の位置を計算する
  const satrec = satellite.twoline2satrec(
    tlestring.tleLine1,
    tlestring.tleLine2,
  )
  const positionAndVelocity = satellite.propagate(satrec, date)
  const positionEci = positionAndVelocity.position

  // GMST値を取得する(位置計算に使う)
  // You will need GMST for some of the coordinate transforms.
  // http://en.wikipedia.org/wiki/Sidereal_time#Definition
  const gmst = satellite.gstime(date)

  // Convert satellite position to the topocentric coordinate system
  // (ターゲットの座標を地表面座標系に変換し、オブザーバーを基準とした方位・迎角を計算する)
  //@ts-ignore
  const positionEcf = satellite.eciToEcf(positionEci, gmst)
  const lookAngles = satellite.ecfToLookAngles(observerGd, positionEcf)

  //計算結果を返す
  return {
    targetPositionAndVelocity: positionAndVelocity,
    lookAngles: lookAngles,
  }
}
