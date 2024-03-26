import { OrbitControls, Sphere } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { Color, Vector3 } from 'three'

import wgs2ecef from '@/components/utils/gis/wgs2ecef'
import {
  CameraDefaultPosX,
  CameraDefaultPosY,
  CameraDefaultPosZ,
  RadiusEarthOnCanvas,
  REFRESH_INTERVAL,
  SCALEofECEFtoCanvas,
  TargetDefaultPosX,
  TargetDefaultPosY,
  TargetDefaultPosZ,
} from '@/constants'
import type { Shape } from '@/types/shape'

import CameraSet from './cameraseet'
import Plotmap from './plotmap'

/**
 * 飛行経路を可視化するためのコンポーネント
 */

interface FlightdisplayProps {
  shapes: Shape[]
  baseUserLocation: { lat: number; lon: number }
}

export default function TdDisplay(props: FlightdisplayProps) {
  const { shapes, baseUserLocation } = props

  const [camPos, setCamPos] = useState({
    x: CameraDefaultPosX,
    y: CameraDefaultPosY,
    z: CameraDefaultPosZ,
  })

  const [camTargetPos, setCamTargetPos] = useState({
    x: TargetDefaultPosX,
    y: TargetDefaultPosY,
    z: TargetDefaultPosZ,
  })

  const [cameraUpperDirection, setCameraUpperDirection] = useState<Vector3>(
    new Vector3(
      TargetDefaultPosX,
      TargetDefaultPosY,
      TargetDefaultPosZ,
    ).normalize(),
  )

  useEffect(() => {
    const tempCam = wgs2ecef(
      baseUserLocation.lon,
      baseUserLocation.lat,
      1000000,
    )

    const tempCamTarget = wgs2ecef(
      baseUserLocation.lon,
      baseUserLocation.lat,
      100000,
    )

    setCamPos({
      x: tempCam[1] * SCALEofECEFtoCanvas,
      y: tempCam[2] * SCALEofECEFtoCanvas,
      z: tempCam[0] * SCALEofECEFtoCanvas,
    })

    setCamTargetPos({
      x: tempCamTarget[1] * SCALEofECEFtoCanvas,
      y: tempCamTarget[2] * SCALEofECEFtoCanvas,
      z: tempCamTarget[0] * SCALEofECEFtoCanvas,
    })

    setCameraUpperDirection(
      new Vector3(
        tempCamTarget[1],
        tempCamTarget[2],
        tempCamTarget[0],
      ).normalize(),
    )
  }, [baseUserLocation.lat, baseUserLocation.lon])

  return (
    //React Three FiberのCANVASを生成する
    <Canvas
      gl={{
        antialias: true,
      }}
      onCreated={({ gl, scene }) => {
        scene.background = new Color('#111111')
      }}
      camera={{
        fov: 45,
        position: [camPos.x, camPos.y, camPos.z],
        near: 0.01,
        far: RadiusEarthOnCanvas * 100,
        up: [
          cameraUpperDirection.x,
          cameraUpperDirection.y,
          cameraUpperDirection.z,
        ],
      }}
    >
      {
        //ドラッグ・スケーリングを行う機能。
      }
      <OrbitControls
        enableDamping={false}
        attach="orbitControls"
        enableRotate={true}
        autoRotate={false}
        autoRotateSpeed={1}
        target={[camTargetPos.x, camTargetPos.y, camTargetPos.z]}
        makeDefault
      />
      <CameraSet />

      <ambientLight intensity={0.5} />
      <Plotmap shape={shapes[0]} color={'white'} lineWidth={1} />

      <Sphere position={[0, 0, 0]} args={[RadiusEarthOnCanvas * 0.995, 32, 32]}>
        <meshStandardMaterial color="gray" />
      </Sphere>
      {/*
        ターゲットの軌道を表示するためのコンポーネント
      <TargetPlot prop1={''} ref={refnowpos} />
      <TargetPathPlot prop1={''} ref={reftargetpath} />
        
        */}

      {shapes.map((shape, index) => (
        <Plotmap key={index} shape={shape} color={'white'} lineWidth={1} />
      ))}

      {
        // axesHelperを機能させたいときは↓を有効化させる
        //<axesHelper position={[0, 0, 0]} args={[1]} />
      }
    </Canvas>
  )
}
