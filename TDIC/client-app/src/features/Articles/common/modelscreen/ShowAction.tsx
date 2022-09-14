import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import React from 'react';
import { OrbitControls } from '@react-three/drei';
import { AnimationMixer } from 'three/src/animation/AnimationMixer';
import { Clock } from 'three';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../app/stores/store';


interface Props {
    isActiondisplayMode : boolean;
  }


export default observer( function ShowAction({isActiondisplayMode}: Props)  {
    const { scene } = useThree();

    const {instancepartStore} = useStore();
    const {annimationsRegistry, setAnimationClips} = instancepartStore;

    const id_inst = 1;

    
    const temp_inst = scene.children.find(child => child.name == `[${id_inst}]InstanceModel`);
  
    const mixer = new AnimationMixer(temp_inst!);

    let clock = new Clock();

  
    useFrame(state => {
        if(annimationsRegistry && isActiondisplayMode){
        
            Array.from(instancepartStore.instancepartRegistry.values()).map(instance=>(

                annimationsRegistry?.get(id_inst)?.forEach(clip => 
                    {
                        mixer.clipAction(clip).play(); console.log("called"); 
                        mixer.update(clock.getDelta());
                    })))
        }
        })

  return (
      null
  )
})

