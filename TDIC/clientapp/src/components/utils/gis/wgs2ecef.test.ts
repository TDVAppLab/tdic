import { describe, expect, it } from 'vitest'

import wgs2ecef from './wgs2ecef'

describe('wgs2ecef function', () => {
  it('should correctly convert WGS84 coordinates to ECEF coordinates', () => {
    const lon = 139 // 東京の経度
    const lat = 35 // 東京の緯度
    const alt = 0 // 高度

    //国土地理院のサイトで出した(139,35,0)の値
    //https://vldb.gsi.go.jp/sokuchi/surveycalc/surveycalc/transf.html

    const expectedEcefCoords = [-3947453.245, 3431468.754, 3637866.909]
    const result = wgs2ecef(lon, lat, alt)

    //国土地理院の出力結果と小数点2位まで一致するかを確認する
    expect(result[0]).toBeCloseTo(expectedEcefCoords[0], 2)
    expect(result[1]).toBeCloseTo(expectedEcefCoords[1], 2)
    expect(result[2]).toBeCloseTo(expectedEcefCoords[2], 2)
  })
})
