import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { useControls } from 'leva';
import { Color } from 'three';

//https://sbcode.net/react-three-fiber/leva/

export default function ControlPanel(){
    const camera = useThree((state) => state.camera);
    const { scene } = useThree();

    
    const [Param, set] = useControls(() => ({
        bgcolor: "#000000",
        linear: true
      }));


    //const pA = useControls('Camera', options)

    useEffect(()=>{
        scene.background = new Color(Param.bgcolor);
    }, [Param])

  return (
      null
  )
}