import { useLoader } from '@react-three/fiber';
import { Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../app/stores/store';
import { APIURL } from '../../../../app/constants';




interface PartProps {
    id_inst: number;
    id_part: number;
    pos:Vector3;
    scale:number;
}

export default observer( function LoadModelSub({id_inst, id_part, pos, scale}: PartProps){

    const {instanceobjectStore} = useStore();
    const {setAnimationClips, setModelLoading} = instanceobjectStore;
  
    const str_url_partapi = APIURL + `/modelfiles/file/${id_part}`;
    const gltf = useLoader(GLTFLoader, str_url_partapi);
    gltf.scene.position.set(pos.x,pos.y,pos.z);
    gltf.scene.scale.set(scale,scale,scale)
    gltf.scene.name = `[${id_inst}]InstanceModel`;
    setAnimationClips(gltf.animations,id_inst);
    
    setModelLoading(id_inst, false);
  
    return (
        <primitive object={gltf.scene} dispose={null} />
    )
  });