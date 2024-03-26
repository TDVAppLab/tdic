import proj4 from 'proj4'

/**
 * WGS84基準の緯度・経度・高度を入力すると、ECEFに変換して値を返す関数
 * @param lon 経度[deg]
 * @param lat 緯度[deg]
 * @param alt 高度[m]
 * @returns ECEF座標系のX座標, Y座標, Z座標を配列として返す。
 *         [ECEF X, ECEF Y, ECEF Z]
 */
const wgs2ecef = (lon: number, lat: number, alt: number) => {
  // WGS84の定義
  const WGS84 = 'EPSG:4326'

  // ECEFの定義
  const ECEF = '+proj=geocent +ellps=WGS84 +datum=WGS84 +units=m +no_defs'

  const ecefCoords = proj4(WGS84, ECEF, [lon, lat, alt])
  return ecefCoords
}

export default wgs2ecef
