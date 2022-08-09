import { useLoader } from '@react-three/fiber';
import { Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import React from 'react';








interface PartProps {
    id_part: number;
    pos:Vector3;
    scale:number;
}



const LoadModel  = ({id_part, pos, scale}: PartProps) => {
    return (
        <React.Suspense fallback={null}>
            <LoadModelSub id_part={id_part} pos={pos} scale={scale} />
        </React.Suspense>
    )
}  



const LoadModelSub  = ({id_part, pos, scale}: PartProps) => {

  
    const str_url_partapi = process.env.REACT_APP_API_URL + `/modelfiles/file/${id_part}`;
    const gltf = useLoader(GLTFLoader, str_url_partapi);
    gltf.scene.position.set(pos.x,pos.y,pos.z);
    gltf.scene.scale.set(scale,scale,scale)
    //console.log(id_part);
  
    return (
        <primitive object={gltf.scene} dispose={null} />
    )
  }



  export default LoadModel;