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

    const {instanceobjectStore} = useStore();
    const {annimationsRegistry, instanceobjectRegistry, getIsAllModelLoading} = instanceobjectStore;

    
    const {instructionStore} = useStore();
    const {instanceActionExecSettingRegistry} = instructionStore;
    

    
    useEffect(()=>{

        instanceobjectRegistry.size>0 && Array.from(instanceobjectRegistry.values()).map(x=>{
            const temp_instance = scene.children.find(child => child.name == `[${x.id_instance}]InstanceModel`);
            if(temp_instance){
                mixers.set(x.id_instance,new AnimationMixer(temp_instance))
            }
        });

        if(!getIsAllModelLoading() && mixers.size>0 && annimationsRegistry.size>0 && instanceActionExecSettingRegistry.length>0){
            instanceActionExecSettingRegistry.forEach(instanceActionExecSetting=>{
                if(instanceActionExecSetting.id_instance){
                    const annimations = annimationsRegistry?.get(instanceActionExecSetting?.id_instance!);
                    
                    if(annimations){
                        const annimation = annimations[instanceActionExecSetting.no];
                        const mixer = mixers.get(instanceActionExecSetting.id_instance);

                        if(annimation && mixer){
                            //mixer.stopAllAction();
                            //mixer.update(0.1);
                            if(instanceActionExecSetting.is_exec) {
                                mixer.clipAction(annimation).setLoop(LoopOnce ,0);
                                mixer.clipAction(annimation).clampWhenFinished=instanceActionExecSetting.is_clamp_when_finished;
                                mixer.clipAction(annimation).play();
                                //mixer.update(clock.getDelta());
                            } else {
                                //mixer.clipAction(annimation).reset();
                                //mixer.clipAction(annimation).play();
                                //mixer.update(0.1);
                                //mixer.clipAction(annimation).stop();
                            }
                            //mixer.update(0.1);
                        }
                    }
                }
            })




        }


    }, [instanceActionExecSettingRegistry, annimationsRegistry]);
    


    const mixers = new Map<number, AnimationMixer>(); //number = id_inst

    const clock = new Clock();


    useFrame(state => {
        

        if(!getIsAllModelLoading() && mixers.size>0 && annimationsRegistry.size>0 && instanceActionExecSettingRegistry.length>0){
            instanceActionExecSettingRegistry.forEach(instanceActionExecSetting=>{
                if(instanceActionExecSetting.id_instance){
                    const annimations = annimationsRegistry?.get(instanceActionExecSetting?.id_instance!);
                    
                    if(annimations){
                        const annimation = annimations[instanceActionExecSetting.no];
                        const mixer = mixers.get(instanceActionExecSetting.id_instance);

                        if(annimation && mixer){
                            

                            

                            if(instanceActionExecSetting.is_exec) {
                                //mixer.clipAction(annimation).setLoop(LoopOnce ,0);
                                //mixer.clipAction(annimation).clampWhenFinished=instanceActionExecSetting.is_clamp_when_finished;
                                //mixer.clipAction(annimation).play();
                                //mixer.update(clock.getDelta());
                            } else {
                                mixer.clipAction(annimation).reset();
                                mixer.clipAction(annimation).play();
                                //mixer.update(clock.getDelta());
                            }
                            mixer.update(clock.getDelta());
                            
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

