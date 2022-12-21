import { useThree } from '@react-three/fiber';
import { useEffect, useMemo } from 'react';
import { folder, useControls } from 'leva';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../app/stores/store';
import { Color, Quaternion, Vector3 } from 'three';

//https://sbcode.net/react-three-fiber/leva/


export default observer( function ControlPanelofCanvasBasic(){

    const { gl} = useThree();
//    let { linear} = useThree();
    const camera = useThree((state) => state.camera);
    const { scene } = useThree();

    
    const { articleStore } = useStore();
    const { selectedArticle, setBgcolor, setLinear } = articleStore;

    const [Param, set] = useControls(() => ({
        bgcolor: "#000000",
        linear: true
      }));

    useEffect(()=>{
        if(selectedArticle){
            set({
                bgcolor: selectedArticle.bg_color,
                linear: selectedArticle.gammaOutput,
              })
        }
    }, [selectedArticle?.id_article])
      
    useEffect(()=>{
        console.log("called change param")
        setBgcolor(Param.bgcolor)
        scene.background = new Color(Param.bgcolor);
        setLinear(Param.linear);
    }, [Param])

  return (
      null
  )
})