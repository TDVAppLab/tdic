import { describe, expect, it } from 'vitest'

import { calcEcef2Wgs84 } from './ecef2wgs84'

describe('calcEcef2Wgs84 function', () => {
  it('should correctly convert ECEF coordinates to WGS84 coordinates', () => {
    const ecefx = -3947453.245 // 国土地理院のサイトで出した(139,35,0)のECEF X
    const ecefy = 3431468.754 // 国土地理院のサイトで出した(139,35,0)のECEF Y
    const ecefz = 3637866.909 // 国土地理院のサイトで出した(139,35,0)のECEF Z

    //国土地理院のサイトで出した(-3947453.245,3431468.754,3637866.909) -> WGS84の値
    //https://vldb.gsi.go.jp/sokuchi/surveycalc/surveycalc/transf.html

    const expectedEcefCoords = [139.0, 35.0, 0.0]
    const result = calcEcef2Wgs84(ecefx, ecefy, ecefz)
    //console.log(result)

    //国土地理院の出力結果と緯度経度は小数点8位、高度は3位まで一致するかを確認する
    expect(result.lon).toBeCloseTo(expectedEcefCoords[0], 8)
    expect(result.lat).toBeCloseTo(expectedEcefCoords[1], 8)
    expect(result.alt).toBeCloseTo(expectedEcefCoords[2], 3)
  })
})
