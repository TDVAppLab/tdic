import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { useControls } from 'leva';
import { ACESFilmicToneMapping, Color, LinearEncoding, LinearToneMapping, NoToneMapping, PMREMGenerator, sRGBEncoding } from 'three';
import { useStore } from '../../../app/stores/store';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';

//https://sbcode.net/react-three-fiber/leva/





interface Props {
  setIsMExecAnimation: React.Dispatch<React.SetStateAction<boolean>>;
}



export default function ModelFilesEditControlPanel({setIsMExecAnimation}: Props){

    const { scene, gl } = useThree();
    
    const [Param, set] = useControls(() => ({  
        outputEncoding: { options: ["sRGB", "Linear"] },
        environment: { options: ["None", "Neutral"] },
        toneMapping: { options: ["None", "Linear", "ACES Filmic"] },
        exposure: {value: 0.0, min: -10.0, max: 10, step: 0.1},
        bgcolor: "#ffffff",
        isShowHelpers: false,
        isMExecAnimation: false
      }));


    
    useEffect(()=>{
      if(Param.outputEncoding==='sRGB'){
        gl.outputEncoding = sRGBEncoding;
      } else {
        gl.outputEncoding = LinearEncoding;
      }
    }, [Param.outputEncoding])
    
    useEffect(()=>{
      if(Param.environment==='None'){
        scene.environment = null
      } else {
        scene.environment =  new PMREMGenerator(gl).fromScene( new RoomEnvironment() ).texture
      }
    }, [Param.environment])


    useEffect(()=>{
      
      if(Param.toneMapping==='None'){
        gl.toneMapping = NoToneMapping;
      } else if(Param.toneMapping==='Linear'){
        gl.toneMapping = LinearToneMapping;
      } else {
        gl.toneMapping = ACESFilmicToneMapping;
      }
    }, [Param.toneMapping])


    useEffect(()=>{
      gl.toneMappingExposure = Math.pow(2, Param.exposure);
    }, [Param.exposure])


    useEffect(()=>{
      scene.children.filter(x => x.type === "AxesHelper" || x.type === "GridHelper").forEach(element => 
        element.visible = Param.isShowHelpers
      )
    }, [Param.isShowHelpers])

    useEffect(()=>{
      scene.background = new Color(Param.bgcolor);
    }, [Param.bgcolor])

    useEffect(()=>{
      setIsMExecAnimation(Param.isMExecAnimation);
    }, [Param.isMExecAnimation])


  return (
      null
  )
}