import { useThree } from '@react-three/fiber';
import { useEffect, useMemo } from 'react';
import { useControls } from 'leva';

//https://sbcode.net/react-three-fiber/leva/

export default function ControlPanel(){
    const camera = useThree((state) => state.camera);

    
    const options = useMemo(() => {
        return {
        x: { value: 0, min: 0, max: 500 },
        y: { value: 0, min: 0, max: 500 },
        z: { value: 0, min: 0, max: 500 },
        }
    }, [])


    const pA = useControls('Camera', options)

    useEffect(()=>{
        camera.position.set(pA.x,pA.y,pA.z);
    }, [pA])

  return (
      null
  )
}