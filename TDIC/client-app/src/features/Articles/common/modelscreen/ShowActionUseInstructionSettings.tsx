import { useFrame, useThree } from '@react-three/fiber';
import { AnimationMixer } from 'three/src/animation/AnimationMixer';
import { Clock, LoopOnce } from 'three';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../app/stores/store';
import { useEffect } from 'react';


interface Props {
    isActiondisplayMode : boolean;
  }


export default observer( function ShowActionUseInstructionSettings({isActiondisplayMode}: Props)  {
    const { scene } = useThree();

    const {instancepartStore} = useStore();
    const {annimationsRegistry, instancepartRegistry} = instancepartStore;

    
    const {instructionStore} = useStore();
    const {instanceActionExecSettingRegistry} = instructionStore;

    
    useEffect(()=>{

        Array.from(instancepartRegistry.values()).map(x=>{
            const temp_instance = scene.children.find(child => child.name == `[${x.id_inst}]InstanceModel`);
            if(temp_instance){
                mixers.set(x.id_inst,new AnimationMixer(temp_instance))
            }
        });

    }, [instanceActionExecSettingRegistry, annimationsRegistry]);


    const mixers = new Map<number, AnimationMixer>(); //number = id_inst

    const clock = new Clock();



    useFrame(state => {

        if(mixers.size>0 && annimationsRegistry.size>0 && instanceActionExecSettingRegistry.length>0){
            instanceActionExecSettingRegistry.forEach(instanceActionExecSetting=>{
                if(instanceActionExecSetting.id_inst){
                    const annimations = annimationsRegistry?.get(instanceActionExecSetting?.id_inst!);
                    
                    if(annimations){
                        const annimation = annimations[instanceActionExecSetting.no];
                        const mixer = mixers.get(instanceActionExecSetting.id_inst);

                        if(annimation && mixer){
                            if(instanceActionExecSetting.is_exec) {
                                mixer.clipAction(annimation).setLoop(LoopOnce ,0);
                                mixer.clipAction(annimation).clampWhenFinished=instanceActionExecSetting.is_clamp_when_finished;
                                mixer.clipAction(annimation).play();
                                mixer.update(clock.getDelta());
                            } else {
                                mixer.clipAction(annimation).reset();
                                mixer.clipAction(annimation).play();
                                mixer.update(clock.getDelta());
                            }
                        }
                    }
                }
            })
        }        
    })

    return (
        null
    )
})

