import proj4 from 'proj4'

/**
 * ECEF座標系からWGS84座標系への変換を行う関数
 * @param ecef_x ECEF座標系のX座標
 * @param ecef_y ECEF座標系のY座標
 * @param ecef_z ECEF座標系のZ座標
 * @returns WGS84座標系の経度緯度高度をオブジェクトとして返す。
 *          { lon: 経度, lat: 緯度, alt: 高度 }
 */
export function calcEcef2Wgs84(ecef_x: number, ecef_y: number, ecef_z: number) {
  // ECEF座標配列に代入
  const ecefCoords = [ecef_x, ecef_y, ecef_z]

  // ECEF座標系から緯度経度座標系への変換定義
  const fromProjection = '+proj=geocent +datum=WGS84 +units=m +no_defs'
  const toProjection = '+proj=longlat +datum=WGS84 +no_defs'

  // 座標変換の実行
  const longLatAlt = proj4(fromProjection, toProjection, ecefCoords)

  // 結果を返す
  return { lon: longLatAlt[0], lat: longLatAlt[1], alt: longLatAlt[2] }
}
