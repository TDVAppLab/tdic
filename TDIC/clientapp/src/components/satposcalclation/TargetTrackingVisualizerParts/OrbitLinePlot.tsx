import type { Satellite } from '@prisma/client'
import { Line } from '@react-three/drei'
import { useEffect, useState } from 'react'
import { type ColorRepresentation, Vector3 } from 'three'

import { getTargetGeodeticLocation } from '@/utils/satcalc/getTargetGeodeticLocation'

/**
 * 汎用的に線を引けるようにする
 * →開始時間
 * ピッチ
 * ループ回数
 */

interface OrbitLinePlotProps {
  tle: Satellite
  scale_x: number
  scale_y: number
  leftstart_x_rad: number
  XonScreen(longitude: number, scale_x: number, leftstart_x_rad: number): number
  YonScreen(latitude: number, scale_y: number): number
  startDate: Date
  pitch: number
  numLoop: number
  color: ColorRepresentation
  lineWidth: number
}

/**
 * ターゲットの軌道を線で地図上にプロットするコンポーネント
 */
export default function OrbitLinePlot({
  tle,
  scale_x,
  scale_y,
  leftstart_x_rad,
  XonScreen,
  YonScreen,
  startDate,
  pitch,
  numLoop,
  color,
  lineWidth,
}: OrbitLinePlotProps) {
  const [lpoints, setLpoints] = useState<Vector3[]>([])

  // 時刻の更新処理
  useEffect(() => {
    UpdateLineObject()
  }, [tle, startDate])

  const UpdateLineObject = () => {
    const temp: Vector3[] = []
    const date = new Date(startDate.getTime())

    date.setSeconds(date.getSeconds() - 2 * pitch) // 1ピッチ手前からスタート

    for (let i = 0; i < numLoop; i++) {
      date.setSeconds(date.getSeconds() + pitch) // 1ピッチ秒を加算
      const positionGd = getTargetGeodeticLocation(date, tle)

      const tempPositionGdStart = new Vector3(
        XonScreen(positionGd.longitude, scale_x, leftstart_x_rad),
        YonScreen(positionGd.latitude, scale_y),
        0.2,
      )
      temp.push(tempPositionGdStart)
    }
    setLpoints(temp)
  }

  // ループの関数化を検討
  const TargetOrbitLines = () => {
    const items: JSX.Element[] = []
    for (let i = 0; i < lpoints.length - 1; i++) {
      const start = lpoints[i]
      const end = lpoints[i + 1]

      if (start && end && start.x < end.x) {
        items.push(
          <Line
            points={[start, end]}
            color={color} // Default
            lineWidth={lineWidth} // In pixels (default)
            dashed={false} // Default
          />,
        )
      }
    }
    return items
  }

  return <group>{TargetOrbitLines()}</group>
}
