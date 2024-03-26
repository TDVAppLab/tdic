import type { Satellite } from '@prisma/client'
import { OrbitControls, Svg } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useState } from 'react'
import { type GeodeticLocation } from 'satellite.js'
import { Color } from 'three'

import useInterval from '@/hooks/useInterval'
import type { OrbitalPass } from '@/types/OrbitalPass'

import {
  XonScreen,
  YonScreen,
} from './TargetTrackingVisualizerParts/DimensionConverter'
import OrbitalPathAnnotationPlot from './TargetTrackingVisualizerParts/OrbitalPathAnnotationPlot'
import OrbitalPathPlot from './TargetTrackingVisualizerParts/OrbitalPathPlot'
import OrbitLinePlot from './TargetTrackingVisualizerParts/OrbitLinePlot'
import TargetAnnotationPlot from './TargetTrackingVisualizerParts/TargetAnnotationPlot'
import TargetPlot from './TargetTrackingVisualizerParts/TargetPlot'

/**
 * 読み込む地図画像におけるスケーリング
 * 作りがまだ読み込む背景画像に依存しているので、
 * 変数などを使って今後汎用化していきたい
 */

const WORLDMAP_OFFSET_X = 359.875 //719.75 /2
const WORLDMAP_OFFSET_Y = 330.4509618

const SCALE_X = 114.5517703118973
const SCALE_Y = 114.86
const LEFTSTART_X_RAD = 0.4765181703591559 //左端の原点が何度で始まるかをdegで表示

interface TargetTrackingVisualizerProps {
  tle: Satellite
  observerGd: GeodeticLocation | undefined
  orbitalPass: OrbitalPass | undefined
}

/**
 * 3Dビューア上で
 * 2D地図を読み込み、衛星を重畳することで衛星位置を中心とした各種情報を可視化するコンポーネント。
 * まだ試作的な内容で、サイズ関連の情報も読み込み元となっている画像に依存した数値をベタ打ちしている
 * 状況なので、今後機能拡充とともに汎用化が必要と考えている。
 */
export default function TargetTrackingVisualizer({
  tle,
  observerGd,
  orbitalPass,
}: TargetTrackingVisualizerProps) {
  const [date, SetDate] = useState(new Date())

  useInterval(() => {
    SetDate(new Date())
    //    const date = new Date(startDate.getTime())
  }, 10 * 1000)

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
        position: [0, 0, 300],
        near: 0.01,
        far: 63500000,
      }}
    >
      {
        //ドラッグ・スケーリングを行う機能。
        //回転も可能だが、2Dとして使用するため無効化してある。
      }
      <OrbitControls
        enableDamping={false}
        attach="orbitControls"
        enableRotate={false}
        autoRotate={false}
        autoRotateSpeed={1}
        makeDefault
      />

      <ambientLight intensity={0.5} />

      {
        //TLEに従い衛星の位置情報をプロットする
      }
      <TargetPlot
        tle={tle}
        scale_x={SCALE_X}
        scale_y={SCALE_Y}
        leftstart_x_rad={LEFTSTART_X_RAD}
        XonScreen={XonScreen}
        YonScreen={YonScreen}
      />
      <TargetAnnotationPlot
        tle={tle}
        scale_x={SCALE_X}
        scale_y={SCALE_Y}
        leftstart_x_rad={LEFTSTART_X_RAD}
        XonScreen={XonScreen}
        YonScreen={YonScreen}
      />
      {
        <OrbitLinePlot
          tle={tle}
          scale_x={SCALE_X}
          scale_y={SCALE_Y}
          leftstart_x_rad={LEFTSTART_X_RAD}
          XonScreen={XonScreen}
          YonScreen={YonScreen}
          startDate={date}
          pitch={60}
          numLoop={100}
          color={'white'}
          lineWidth={1}
        />
      }

      {orbitalPass && (
        <OrbitalPathPlot
          tle={tle}
          scale_x={SCALE_X}
          scale_y={SCALE_Y}
          leftstart_x_rad={LEFTSTART_X_RAD}
          XonScreen={XonScreen}
          YonScreen={YonScreen}
          orbitalPass={orbitalPass}
        />
      )}
      {orbitalPass && (
        <OrbitalPathAnnotationPlot
          tle={tle}
          scale_x={SCALE_X}
          scale_y={SCALE_Y}
          leftstart_x_rad={LEFTSTART_X_RAD}
          XonScreen={XonScreen}
          YonScreen={YonScreen}
          orbitalPass={orbitalPass}
        />
      )}

      {
        //SVGの2Dマップを読み込む。
      }
      <Svg
        fillMaterial={{
          wireframe: false,
        }}
        position={[-WORLDMAP_OFFSET_X, WORLDMAP_OFFSET_Y, 0.1]}
        scale={1.0}
        src="/assets/models/World_map_(Mercator_projection)_Pacific-centric.svg"
        strokeMaterial={{
          wireframe: false,
        }}
      />
      {
        // グリッドを機能させたいときは↓を有効化させる
        // メルカトル図法だと、等間隔のグリッドは緯度側で邪魔になるので、確認するとき以外は外してある
        //  <gridHelper args={[719.75 * 2, 36 * 2, "blue", "green"]} rotation={[Math.PI / 2.0, 0, 0]} />
        //<axesHelper position={[0, 0, 0]} args={[1]} />
      }
    </Canvas>
  )
}
