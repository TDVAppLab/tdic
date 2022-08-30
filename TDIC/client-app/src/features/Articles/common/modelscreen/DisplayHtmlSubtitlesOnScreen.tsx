import { Vector3 } from 'three';
import { Html } from "@react-three/drei"
import "./stylesSubtitles.css"
import { Annotation } from '../../../../app/models/Annotation';
import { AnnotationDisplay } from '../../../../app/models/AnnotationDisplay';
import { observer } from 'mobx-react-lite';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import { HtmlProps } from '@react-three/drei/web/Html';
import { useStore } from '../../../../app/stores/store';

/*
interface Props {
    annotationMap : Map<number, Annotation>;
    annotationDisplayMap : Map<number, AnnotationDisplay>;
    selectedAnnotationId : number | undefined;
}

*/

export default observer( function DisplayHtmlSubtitlesOnScreen() {
    
    const ref = useRef<THREE.Mesh>(null!);
    const camera = useThree((state) => state.camera);
    const { scene } = useThree();
    const orbitControls = ((scene as any).orbitControls as any);  
  

    const [messages, setMessages] = useState<string[]>([]);
    
    const {instructionStore} = useStore();
    const {selectedInstruction, selectedSubtitles, selectedSubtitleIndex} = instructionStore;

    useEffect(()=>{
    }, [selectedInstruction, selectedSubtitleIndex]);


    const cameraworldvector =new Vector3(0,0,0);
    let pos =new Vector3(0,0,0);
    
    useFrame((state) => {
        
        camera.getWorldDirection(cameraworldvector);     
        pos.set(camera.position.x, camera.position.y, camera.position.z);

        ref.current.position.set(
            pos.x + cameraworldvector.x*10, 
            pos.y + cameraworldvector.y*10,// + 4.5*cameraworldvector.y, 
            pos.z + cameraworldvector.z*10
            );

    });
  
  
  return (
        <>
        <mesh ref={ref}>
            <Html
              className={ `html-subtitle-onscreen` }
            >
              <div
              >
                <p>{selectedSubtitles[selectedSubtitleIndex]}</p>
              </div>
            </Html>
        </mesh>
        </>
    )
})
