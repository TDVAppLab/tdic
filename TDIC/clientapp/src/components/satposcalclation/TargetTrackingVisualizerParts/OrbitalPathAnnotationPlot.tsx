import type { Satellite } from '@prisma/client'
import { Html } from '@react-three/drei'
import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'
import { type GeodeticLocation } from 'satellite.js'
import { Vector3 } from 'three'

import type { OrbitalPass } from '@/types/OrbitalPass'
import { getTargetGeodeticLocation } from '@/utils/satcalc/getTargetGeodeticLocation'

import styles from './annotationstyles.module.css'

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
 * AOSとLOSの注釈をプロットするコンポーネント
 */
export default function OrbitalPathAnnotationPlot({
  tle,
  scale_x,
  scale_y,
  leftstart_x_rad,
  XonScreen,
  YonScreen,
  orbitalPass,
}: OrbitalPathPlotProps) {
  const [aosGeoloc, setAosGeoloc] = useState<GeodeticLocation>()
  const [losGeoloc, setLosGeoloc] = useState<GeodeticLocation>()
  const [maxelGeoloc, setMaxelGeoloc] = useState<GeodeticLocation>()

  const refAos = useRef<THREE.Mesh>(null!)
  const refLos = useRef<THREE.Mesh>(null!)
  const refMaxel = useRef<THREE.Mesh>(null!)

  //詳細情報を出力するフラグ
  //※今は機能ないが、これをON/OFF切り替えるUIを用意すれば動的切り替え可能になる
  const isDisplayDescription = true

  // 時刻の更新処理
  useEffect(() => {
    const positionGdAos = getTargetGeodeticLocation(orbitalPass.aos, tle)

    refAos.current.position.x = XonScreen(
      positionGdAos.longitude,
      scale_x,
      leftstart_x_rad,
    )
    refAos.current.position.y = YonScreen(positionGdAos.latitude, scale_y)
    refAos.current.position.z = 0.1
    setAosGeoloc(positionGdAos)

    const positionGdLos = getTargetGeodeticLocation(orbitalPass.los, tle)

    refLos.current.position.x = XonScreen(
      positionGdLos.longitude,
      scale_x,
      leftstart_x_rad,
    )
    refLos.current.position.y = YonScreen(positionGdLos.latitude, scale_y)
    refLos.current.position.z = 0.1
    setLosGeoloc(positionGdLos)

    const positionGdMaxel = getTargetGeodeticLocation(orbitalPass.maxel, tle)

    refMaxel.current.position.x = XonScreen(
      positionGdMaxel.longitude,
      scale_x,
      leftstart_x_rad,
    )
    refMaxel.current.position.y = YonScreen(positionGdMaxel.latitude, scale_y)
    refMaxel.current.position.z = 0.1
    setMaxelGeoloc(positionGdMaxel)
  }, [tle, scale_x, scale_y, leftstart_x_rad, orbitalPass])

  return (
    <>
      <mesh ref={refAos}>
        <Html
          className={`${styles['model-annotation']}`}
          position={new Vector3(2.5, 2.5, 0.0)}
        >
          <h5 className={`${styles['model-annotation-title']}`}>
            AOS：{getTimeLocal(orbitalPass.aos)}
          </h5>
          {isDisplayDescription && aosGeoloc && (
            <DrawElements03
              longitude={aosGeoloc.longitude}
              latitude={aosGeoloc.latitude}
              azimuth={orbitalPass.aos_target_azimuth}
              elevation={null}
            />
          )}
        </Html>
      </mesh>
      <mesh ref={refLos}>
        <Html
          className={`${styles['model-annotation']}`}
          position={new Vector3(2.5, 2.5, 0.0)}
        >
          <h5 className={`${styles['model-annotation-title']}`}>
            LOS：{getTimeLocal(orbitalPass.los)}
          </h5>
          {isDisplayDescription && losGeoloc && (
            <DrawElements03
              longitude={losGeoloc.longitude}
              latitude={losGeoloc.latitude}
              azimuth={orbitalPass.los_target_azimuth}
              elevation={null}
            />
          )}
        </Html>
      </mesh>

      <mesh ref={refMaxel}>
        <Html
          className={`${styles['model-annotation']}`}
          position={new Vector3(2.5, 2.5, 0.0)}
        >
          <h5 className={`${styles['model-annotation-title']}`}>
            MAX El：{getTimeLocal(orbitalPass.maxel)}
          </h5>
          {isDisplayDescription && maxelGeoloc && (
            <DrawElements03
              longitude={maxelGeoloc.longitude}
              latitude={maxelGeoloc.latitude}
              azimuth={orbitalPass.maxel_target_azimuth}
              elevation={orbitalPass.maxel_target_elevation}
            />
          )}
        </Html>
      </mesh>
    </>
  )
}

function getMonthDayTimeLocal(date: Date): string {
  return dayjs(date).format('MM/DD HH:mm:ss')
}

function getTimeLocal(date: Date): string {
  return dayjs(date).format('HH:mm:ss')
}

function RedtoDeg(rad: number): number {
  return (rad * 180) / Math.PI
}

interface DrawElementsProps {
  longitude: number
  latitude: number
  azimuth: number
  elevation: number | null
}

// フル表記Ver
const DrawElements02 = ({
  longitude,
  latitude,
  azimuth,
  elevation,
}: DrawElementsProps) => {
  return (
    <p className={`${styles['model-annotation-displaytext']}`}>
      緯度[deg]：{RedtoDeg(latitude).toFixed(2)}
      <br />
      経度[deg]：{RedtoDeg(longitude).toFixed(2)}
      <br />
      方位角[deg]：
      {RedtoDeg(azimuth).toFixed(2)}
      {elevation && (
        <>
          <br />
          仰角[deg]：
          {RedtoDeg(elevation).toFixed(2)}
        </>
      )}
    </p>
  )
}

// 省略表記Ver
const DrawElements03 = ({
  longitude,
  latitude,
  azimuth,
  elevation,
}: DrawElementsProps) => {
  return (
    <p className={`${styles['model-annotation-displaytext']}`}>
      {RedtoDeg(longitude).toFixed(2)}　{RedtoDeg(latitude).toFixed(2)}
      <br />
      {RedtoDeg(azimuth).toFixed(2)}
      {elevation && `　${RedtoDeg(elevation).toFixed(2)}`}
    </p>
  )
}
