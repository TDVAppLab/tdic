import type { Satellite } from '@prisma/client'
import * as satellite from 'satellite.js'
import { type GeodeticLocation } from 'satellite.js'

// https://github.com/shashwatak/satellite-js#sample-usage
/**
 *
 * ターゲットのTLE文字列、指定時刻を元に、ターゲットの緯度経度情報を計算する
 * @param {Date} date 計算日時
 * @param {tlestring} tlestring ターゲットのTLE文字列
 */
export function getTargetGeodeticLocation(
  date: Date,
  tlestring: Satellite,
): GeodeticLocation {
  // Calculate satellite position | 衛星の位置を計算する
  const satrec = satellite.twoline2satrec(
    tlestring.tleLine1,
    tlestring.tleLine2,
  )

  const { position: positionEci } = satellite.propagate(satrec, date)

  // 衛星位置の座標系を変換(ECI -> geodetic location)
  const gstime = satellite.gstime(date) // GMST(グリニッジ恒星時)に変換

  //@ts-ignore
  const positionGd = satellite.eciToGeodetic(positionEci, gstime)

  return positionGd
}
