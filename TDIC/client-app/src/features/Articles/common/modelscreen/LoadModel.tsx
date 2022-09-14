import { useLoader } from '@react-three/fiber';
import { Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import React from 'react';
import LoadModelSub from './LoadModelSub';








interface PartProps {
    id_inst: number;
    id_part: number;
    pos:Vector3;
    scale:number;
}



const LoadModel  = ({id_inst, id_part, pos, scale}: PartProps) => {
    return (
        <React.Suspense fallback={null}>
            <LoadModelSub id_inst={id_inst} id_part={id_part} pos={pos} scale={scale} />
        </React.Suspense>
    )
}  





  export default LoadModel;