import type { Satellite } from '@prisma/client'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

import { getTargetGeodeticLocation } from '@/utils/satcalc/getTargetGeodeticLocation'

interface TargetPlotProps {
  tle: Satellite
  scale_x: number
  scale_y: number
  leftstart_x_rad: number
  XonScreen(longitude: number, scale_x: number, leftstart_x_rad: number): number
  YonScreen(latitude: number, scale_y: number): number
}

/**
 * 指定位置に衛星を球でプロットするコンポーネント。
 * フレームレートと同じ時間間隔で、衛星位置をTLEを元に再計算し、
 * 表示する。
 */
export default function TargetPlot({
  tle,
  scale_x,
  scale_y,
  leftstart_x_rad,
  XonScreen,
  YonScreen,
}: TargetPlotProps) {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    // 現在時刻の衛星の位置を計算
    const now = new Date()
    const positionGd = getTargetGeodeticLocation(now, tle)

    ref.current.position.x = XonScreen(
      positionGd.longitude,
      scale_x,
      leftstart_x_rad,
    )
    ref.current.position.y = YonScreen(positionGd.latitude, scale_y)

    ref.current.position.z = 0.1
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshStandardMaterial color="red" />
    </mesh>
  )
}
