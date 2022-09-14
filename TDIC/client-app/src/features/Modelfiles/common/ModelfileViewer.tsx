import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import React, { useEffect } from 'react';
import { AnimationClip } from 'three';


interface Props {
  id_part: number;
  setTeststring: React.Dispatch<React.SetStateAction<AnimationClip[]>>;
  setModelUuid: React.Dispatch<React.SetStateAction<string>>;
}

const UseModel  = ({id_part, setTeststring, setModelUuid}: Props) => {
  return (
      <React.Suspense fallback={null}>
          <LoadModel id_part={id_part} setTeststring={setTeststring}  setModelUuid = {setModelUuid}/>
      </React.Suspense>
  )
}


const LoadModel  = ({id_part, setTeststring, setModelUuid}: Props) => {

  const str_url_partapi = process.env.REACT_APP_API_URL + `/modelfiles/file/${id_part}`
  const gltf = useLoader(GLTFLoader, str_url_partapi);


  useEffect(() => {
    setTeststring(gltf.animations);
    setModelUuid(gltf.scene.uuid);
    }, [id_part]);

  return (
      <primitive object={gltf.scene} dispose={null} />
  )
}


export default function ModelfileViewer({id_part, setTeststring, setModelUuid}: Props){

  return (
    <UseModel id_part={id_part} setTeststring={setTeststring} setModelUuid = {setModelUuid}/> 
  );
};