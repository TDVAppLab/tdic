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

    const {instancepartStore} = useStore();
    const {annimationsRegistry, instancepartRegistry} = instancepartStore;

    const {instructionStore} = useStore();
    const {selectedInstruction, instanceDisplayRegistry} = instructionStore;


    
    useEffect(()=>{

        instancepartRegistry.size>0 && Array.from(instancepartRegistry.values()).map(x=>{
            const temp_instance = scene.children.find(child => child.name == `[${x.id_inst}]InstanceModel`);
            if(temp_instance){
                mixers.set(x.id_inst,new AnimationMixer(temp_instance))
                //console.log("mixers"); 
            }
        });
        
        //console.log(mixers); 


        

        if(annimationsRegistry && isActiondisplayMode){
        
            Array.from(instancepartStore.instancepartRegistry.values()).map(instance=>{

                const mixer = mixers.get(instance.id_inst);

                mixer && 
                annimationsRegistry?.get(instance.id_inst)?.forEach(clip => 
                    {
                        mixer?.clipAction(clip).reset();
                        //mixer?.clipAction(clip)?.clampWhenFinished!=false;
                        //mixer?.clipAction(clip).play(); //console.log(clip); 
                        //mixer?.update(clock.getDelta());
                    })})
        }
        



    }, [instancepartRegistry, annimationsRegistry, selectedInstruction]);

    const mixers = new Map<number, AnimationMixer>();

    let clock = new Clock();

  
    useFrame(state => {
        if(annimationsRegistry && isActiondisplayMode){
        
            Array.from(instancepartStore.instancepartRegistry.values()).map(instance=>{

                const mixer = mixers.get(instance.id_inst);

                //mixer && 
                annimationsRegistry?.get(instance.id_inst)?.forEach(clip => 
                {
                    mixer?.clipAction(clip).play(); 
                    mixer?.update(clock.getDelta());
                })})
        }
        })

  return (
      null
  )
})

