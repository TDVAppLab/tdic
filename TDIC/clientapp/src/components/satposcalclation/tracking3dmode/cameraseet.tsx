import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'

import {
  SCALEofECEFtoCanvas,
  TargetDefaultPosX,
  TargetDefaultPosY,
  TargetDefaultPosZ,
} from '@/constants'
import useInterval from '@/hooks/useInterval'

/**
 * カメラの位置を表示するコンポーネント
 * 元々はカメラの位置を設定するコンポーネントだったが、その機能は
 * 呼び出し元の初期設定で代用することにした。
 * 現在は動作に機能を与える状態にはなっていないが、カメラ位置表示機能は残っているので、
 * カメラ位置などを知りたい場合、このコンポーネントのコンソール出力機能のコメントアウトを外して
 * 利用すること。
 */
const CameraSet = () => {
  const { camera } = useThree() // useThree フックから camera を取得
  const { scene } = useThree()
  const orbitControls = (scene as any).orbitControls as any

  useEffect(() => {
    //console.log('Camera Position:', camera.position)
    //console.log('Camera Rotation:', camera.rotation)
    /*
    camera.position.set(
      3440000 * SCALEofECEFtoCanvas,
      4970000 * SCALEofECEFtoCanvas,
      -5350000 * SCALEofECEFtoCanvas,
    )
*/
    /*
    if (orbitControls) {
      orbitControls.target.set(
        TargetDefaultPosX,
        TargetDefaultPosY,
        TargetDefaultPosZ,
      )
    }*/
  }, [camera])

  useInterval(() => {
    //    console.log('Camera Position:', camera.position)
    //    console.log('Camera Rotation:', camera.rotation)
  }, 2000)

  return null
}

export default CameraSet
