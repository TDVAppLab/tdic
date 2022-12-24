import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { useControls } from 'leva';
import { Color } from 'three';
import { useStore } from '../../../app/stores/store';

//https://sbcode.net/react-three-fiber/leva/





interface Props {
  setIsMExecAnimation: React.Dispatch<React.SetStateAction<boolean>>;
}



export default function ModelFilesEditControlPanel({setIsMExecAnimation}: Props){

    const { scene } = useThree();

    const { modelFileEditorStore } = useStore();
    
    const [Param, set] = useControls(() => ({
        linear: modelFileEditorStore.liner,
        bgcolor: modelFileEditorStore.bgcolor,
        isShowHelpers: false,
        isMExecAnimation: false
      }));



    useEffect(()=>{
      scene.children.filter(x => x.type === "AxesHelper" || x.type === "GridHelper").forEach(element => 
        element.visible = Param.isShowHelpers
      )
    }, [Param.isShowHelpers])
    
    useEffect(()=>{
      modelFileEditorStore.setLiner(Param.linear);
    }, [Param.linear])

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