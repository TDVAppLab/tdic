import { Line } from '@react-three/drei'
import { useEffect, useState } from 'react'
import { type ColorRepresentation, Vector3 } from 'three'

import wgs2ecef from '@/components/utils/gis/wgs2ecef'
import { SCALEofECEFtoCanvas } from '@/constants'
import type { Shape } from '@/types/shape'

/**
 * xxxxxxxxxxxxxxxxx
 */

interface PlotmapProps {
  shape: Shape
  color: ColorRepresentation
  lineWidth: number
}

/**
 * 地図を書くコンポーネント
 */
export default function Plotmap({ shape, color, lineWidth }: PlotmapProps) {
  const [lpoints, setLpoints] = useState<Vector3[]>([])

  // 時刻の更新処理
  useEffect(() => {
    UpdateLineObject()
  }, [shape])

  const UpdateLineObject = () => {
    const temp: Vector3[] = []
    //console.log(shape)

    if (shape) {
      for (let i = 0; i < shape.points.length; i++) {
        const scale = SCALEofECEFtoCanvas
        const [ex, ey, ez] = wgs2ecef(
          shape.points[i].lon,
          shape.points[i].lat,
          0,
        )
        const tempPositionGdStart = new Vector3(
          ey * scale,
          ez * scale,
          ex * scale,
        )

        temp.push(tempPositionGdStart)
      }
      //console.log(temp)
      setLpoints(temp)
    }
  }

  // ループの関数化を検討
  const TargetOrbitLines = () => {
    const items: JSX.Element[] = []
    for (let i = 0; i < lpoints.length - 1; i++) {
      const start = lpoints[i]
      const end = lpoints[i + 1]

      if (start && end) {
        items.push(
          <Line
            key={i}
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
