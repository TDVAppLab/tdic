import type { Satellite } from '@prisma/client'
import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { type GeodeticLocation } from 'satellite.js'
import { Vector3 } from 'three'

import { getTargetGeodeticLocation } from '@/utils/satcalc/getTargetGeodeticLocation'

import styles from './annotationstyles.module.css'

interface TargetAnnotationPlotProps {
  tle: Satellite
  scale_x: number
  scale_y: number
  leftstart_x_rad: number
  XonScreen(longitude: number, scale_x: number, leftstart_x_rad: number): number
  YonScreen(latitude: number, scale_y: number): number
}

/**
 * 衛星位置に重畳して、各種情報を表示するコンポーネント
 */
export default function TargetAnnotationPlot({
  tle,
  scale_x,
  scale_y,
  leftstart_x_rad,
  XonScreen,
  YonScreen,
}: TargetAnnotationPlotProps) {
  const ref = useRef<THREE.Mesh>(null!)
  const [targetGeoloc, setTargetGeoloc] = useState<GeodeticLocation>()

  const isDisplayDescription = true

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

    setTargetGeoloc(positionGd)
  })

  return (
    <mesh ref={ref}>
      <Html
        className={`${styles['model-annotation']}`}
        position={new Vector3(2.5, 2.5, 0.0)}
      >
        <div>
          <h5 className={`${styles['model-annotation-title']}`}>
            ID：{tle.noradCatalogNumber}【{tle.tleObjectName}】
          </h5>
          {isDisplayDescription && targetGeoloc && (
            <p className={`${styles['model-annotation-displaytext']}`}>
              緯度[deg]：{((targetGeoloc.latitude * 180) / Math.PI).toFixed(2)}
              <br />
              経度[deg]：{((targetGeoloc.longitude * 180) / Math.PI).toFixed(2)}
              <br />
              高度[km]：{targetGeoloc.height.toFixed(1)}
            </p>
          )}
        </div>
      </Html>
    </mesh>
  )
}
