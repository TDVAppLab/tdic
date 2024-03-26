/**
 * 経度情報を元にスクリーン上のX座標に変換を行う
 * @param longitude 経度
 * @param scale_x X方向のスケール
 * @param leftstart_x_rad X方向の左端の初期値(rad)
 * @returns スクリーン上のX座標
 */

export const XonScreen = (longitude: number, scale_x: number, leftstart_x_rad: number): number => {
  let ans: number

  if (longitude + leftstart_x_rad < 0) {
    ans = scale_x * (Math.PI + longitude + leftstart_x_rad)
  } else {
    ans = scale_x * (longitude + leftstart_x_rad - Math.PI)
  }
  return ans
}

/**
 * 緯度情報を元にスクリーン上のY座標に変換を行う
 * @param latitude 緯度
 * @param scale_y Y方向のスケール
 * @returns スクリーン上のY座標
 */
export const YonScreen = (latitude: number, scale_y: number): number => {
  return scale_y * Math.log(Math.tan(Math.PI / 4 + latitude / 2))
}
