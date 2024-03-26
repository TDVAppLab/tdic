import type { Satellite } from '@prisma/client'
import { Ring } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'

import type { OrbitalPass } from '@/types/OrbitalPass'
import { getTargetGeodeticLocation } from '@/utils/satcalc/getTargetGeodeticLocation'

import OrbitLinePlot from './OrbitLinePlot'

interface OrbitalPathPlotProps {
  tle: Satellite
  scale_x: number
  scale_y: number
  leftstart_x_rad: number
  XonScreen(longitude: number, scale_x: number, leftstart_x_rad: number): number
  YonScreen(latitude: number, scale_y: number): number
  orbitalPass: OrbitalPass
}

/**
 * 軌道パスをプロットするコンポーネント
 */
export default function OrbitalPathPlot({
  tle,
  scale_x,
  scale_y,
  leftstart_x_rad,
  XonScreen,
  YonScreen,
  orbitalPass,
}: OrbitalPathPlotProps) {
  const refAos = useRef<THREE.Mesh>(null!)
  const refLos = useRef<THREE.Mesh>(null!)
  const refMaxel = useRef<THREE.Mesh>(null!)

  const [innerLadAos, setInnerLadAos] = useState(0.8)
  const [innerLadLos, setInnerLadLos] = useState(0.8)
  const [innerLadMaxel, setInnerLadMaxel] = useState(0.8)

  // 時刻の更新処理
  useEffect(() => {
    const positionGdAos = getTargetGeodeticLocation(orbitalPass.aos, tle)

    refAos.current.position.x = XonScreen(
      positionGdAos.longitude,
      scale_x,
      leftstart_x_rad,
    )
    refAos.current.position.y = YonScreen(positionGdAos.latitude, scale_y)
    refAos.current.position.z = 0.5

    const positionGdLos = getTargetGeodeticLocation(orbitalPass.los, tle)

    refLos.current.position.x = XonScreen(
      positionGdLos.longitude,
      scale_x,
      leftstart_x_rad,
    )
    refLos.current.position.y = YonScreen(positionGdLos.latitude, scale_y)
    refLos.current.position.z = 0.5

    const positionGdMaxel = getTargetGeodeticLocation(orbitalPass.maxel, tle)

    refMaxel.current.position.x = XonScreen(
      positionGdMaxel.longitude,
      scale_x,
      leftstart_x_rad,
    )
    refMaxel.current.position.y = YonScreen(positionGdMaxel.latitude, scale_y)
    refMaxel.current.position.z = 0.5
  }, [tle, scale_x, scale_y, leftstart_x_rad, orbitalPass])

  useFrame((state) => {
    // 1フレームごとに時間を確認し、過ぎたら変更する
    const now = new Date()

    if (orbitalPass.aos < now) {
      setInnerLadAos(0.0)
    } else {
      setInnerLadAos(0.8)
    }

    if (orbitalPass.los < now) {
      setInnerLadLos(0.0)
    } else {
      setInnerLadLos(0.8)
    }

    if (orbitalPass.maxel < now) {
      setInnerLadMaxel(0.0)
    } else {
      setInnerLadMaxel(0.8)
    }
  })

  return (
    <>
      <mesh ref={refAos}>
        <Ring args={[innerLadAos, 1.2]}>
          <meshStandardMaterial color="blue" />
        </Ring>
      </mesh>
      <mesh ref={refMaxel}>
        <Ring args={[innerLadMaxel, 1.2]}>
          <meshStandardMaterial color="blue" />
        </Ring>
      </mesh>
      <mesh ref={refLos}>
        <Ring args={[innerLadLos, 1.2]}>
          <meshStandardMaterial color="blue" />
        </Ring>
      </mesh>
      <OrbitLinePlot
        tle={tle}
        scale_x={scale_x}
        scale_y={scale_y}
        leftstart_x_rad={leftstart_x_rad}
        XonScreen={XonScreen}
        YonScreen={YonScreen}
        startDate={orbitalPass.aos}
        pitch={60}
        numLoop={Math.round(
          (120 * 1000 + orbitalPass.los.getTime() - orbitalPass.aos.getTime()) /
            (1000 * 60),
        )}
        color={'blue'}
        lineWidth={2}
      />
    </>
  )
}
