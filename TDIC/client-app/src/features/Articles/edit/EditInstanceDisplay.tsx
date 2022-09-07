import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { InstanceDisplay } from '../../../app/models/InstanceDisplay';
import CheckBoxGeneral from '../../../app/common/form/CheckBoxGeneral';


export default observer( function EditInstanceDisplay(){
    
    const {instructionStore} = useStore();
    const {selectedInstruction, updateInstanceDisplay, resetInstanceDisplay} = instructionStore;

    
    const [instanceDisplays, setInstanceDisplays] = useState<InstanceDisplay[]>();

    useEffect(()=>{
    }, []);

    useEffect(()=>{
        if(selectedInstruction){

            const ans = JSON.parse(selectedInstruction.display_instance_sets || "null") as InstanceDisplay[];
            if(ans) {
                //console.log(instanceDisplays);
                setInstanceDisplays(ans);
            } else {
                setInstanceDisplays([]);
            }
        }

    }, [selectedInstruction]);

    const validationSchema = Yup.object({
        title: Yup.string().required(),
    });
    

    
    function handleFormSubmit(instanceparts:InstanceDisplay[]) {
        if(selectedInstruction){
            const object = selectedInstruction;
            object.display_instance_sets = JSON.stringify ( instanceparts );
//            console.log(JSON.stringify ( instanceparts ));
            updateInstanceDisplay(object);
        }
    }

    function handleFormSubmitCreate() {
        if(selectedInstruction){
            resetInstanceDisplay(selectedInstruction.id_article);
        }
    }
    

    if(instructionStore.instructionRegistry.size<1) return null;

    return(
        <div>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={instanceDisplays!} 
                onSubmit={(values) => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th>
                                        No.
                                    </th>
                                    <th>
                                        ID Assy
                                    </th>
                                    <th>
                                        ID Inst
                                    </th>
                                    <th>
                                        isDisplay
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {                                
                                instanceDisplays && instanceDisplays.map((instanceDisplay,index)=>(
                                    <tr key={`[${index}]EditInstanceDisplaytable`}>
                                        <td><div>{index+1}</div></td>
                                        <td><div>{instanceDisplay.id_assy}</div></td>
                                        <td><div>{instanceDisplay.id_inst}</div></td>
                                        <td><CheckBoxGeneral label='' name={`[${index}]isDisplay`}  /></td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                        
                        <button disabled={!isValid || !dirty || isSubmitting} type = 'submit' className='btn btn-primary'>Submit</button>
                    </Form>
                )}

            </Formik>

            <button 
                type = 'submit'
                className={"btn btn-primary"}
                onClick={()=>{handleFormSubmitCreate()}} 
            >
                {"Reset"}
            </button>
        </div>
    )
})