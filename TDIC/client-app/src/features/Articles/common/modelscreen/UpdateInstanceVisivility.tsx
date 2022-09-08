import { useThree } from '@react-three/fiber';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../app/stores/store';
import { InstanceDisplay } from '../../../../app/models/InstanceDisplay';
import { useEffect, useState } from 'react';



export default observer( function UpdateInstanceVisivility()  {
    const { scene } = useThree();
  
    const { instancepartStore } = useStore();

    const {instructionStore} = useStore();
    const {selectedInstruction} = instructionStore;

    const [instanceDisplays, setInstanceDisplays] = useState<InstanceDisplay[]>();

    useEffect(()=>{
        if(selectedInstruction){
            const ans = JSON.parse(selectedInstruction.display_instance_sets || "null") as InstanceDisplay[];
            if(ans) {
                setInstanceDisplays(ans);
            } else {
                setInstanceDisplays([]);
            }
        }
    }, [selectedInstruction]);



    Array.from(instancepartStore.instancepartRegistry.values()).map(inst=> { 
        
        const temp_inst = scene.children.find(child => child.name == `[${inst.id_inst}]InstanceModel`);

        if(temp_inst) {
            const instdisplay = instanceDisplays?.find(x => x.id_inst == inst.id_inst);
            if(instdisplay){
                temp_inst.visible=instdisplay.isDisplay;
            } else {
                temp_inst.visible=true;
            }
        } 
    });
    
    return (null);
});