import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import React, { useEffect } from 'react';
import { OrbitControls } from '@react-three/drei';
import { AnimationMixer } from 'three/src/animation/AnimationMixer';
import { Clock, LoopOnce, LoopRepeat } from 'three';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../app/stores/store';


interface Props {
    isActiondisplayMode : boolean;
  }


export default observer( function ShowActionofSettedModel({isActiondisplayMode}: Props)  {
    const { scene } = useThree();

    const {instanceobjectStore} = useStore();
    const {annimationsRegistry, instanceobjectRegistry} = instanceobjectStore;

    const {instructionStore} = useStore();
    const {selectedInstruction, instanceDisplayRegistry} = instructionStore;


    
    const mixers = new Map<number, AnimationMixer>();

    let clock = new Clock();
    
    useEffect(()=>{

        mixers.clear();

        
        instanceobjectRegistry.forEach(instanceobject=>{
            const temp_instance = scene.children.find(child => child.name == `[${instanceobject.id_instance}]InstanceModel`);
            if(temp_instance){
                mixers.set(instanceobject.id_instance,new AnimationMixer(temp_instance))
                //console.log("mixers"); 
            }
        });


        //console.log(mixers); 


        

        if(annimationsRegistry){

            mixers.forEach((mixer,i)=>{

                annimationsRegistry?.get(i)?.forEach(clip => 
                {
                    const action = mixer.clipAction(clip);
                    action.reset();
                    action.play();
                })
            })

        }        

    }, [instanceobjectRegistry, annimationsRegistry, selectedInstruction]);



  
    useFrame(state => {
        //if(isActiondisplayMode){

            mixers.forEach(mixer => {if(mixer){
                mixer.update(clock.getDelta());
                //console.log("loop-d"); 

            }
        //}
        })
    })

  return (
      null
  )
})

