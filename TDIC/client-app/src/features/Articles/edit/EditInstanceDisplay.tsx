import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import { useEffect } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { InstanceDisplay } from '../../../app/models/InstanceDisplay';
import CheckBoxGeneral from '../../../app/common/form/CheckBoxGeneral';
import agent from '../../../app/api/agent';
import TextInputGeneral from '../../../app/common/form/TextInputGeneral';


export default observer( function EditInstanceDisplay(){
    
    const {instructionStore} = useStore();
    const {selectedInstruction, instanceDisplayRegistry, instanceActionExecSettingRegistry, updateInstanceDisplay, resetInstanceDisplay} = instructionStore;


    const validationSchema = Yup.object({
        title: Yup.string().required(),
    });

    const validationSchemaUpdateInstanceActionClips = Yup.object({
        id_assy: Yup.number().required(),
    });
    

    
    function handleFormSubmit(instanceparts:InstanceDisplay[]) {
        if(selectedInstruction){
            const object = selectedInstruction;
            object.display_instance_sets = JSON.stringify ( instanceparts );
            updateInstanceDisplay(object);
        }
    }

    if(instructionStore.instructionRegistry.size<1) return null;

    return(
        <div>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={Array.from(instanceDisplayRegistry.values())!} 
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
                                instanceDisplayRegistry && Array.from(instanceDisplayRegistry.values()).map((instanceDisplay,index)=> (
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
                className={"btn btn-danger"}
                onClick={()=>{selectedInstruction && resetInstanceDisplay(selectedInstruction.id_article)}} 
            >
                {"Reset Instance Display Object"}
            </button>


            <Formik
                validationSchema={validationSchemaUpdateInstanceActionClips}
                enableReinitialize 
                initialValues={instanceActionExecSettingRegistry!} 
                onSubmit={(values) => 
                    selectedInstruction && instructionStore.updateInstanceActionClips(selectedInstruction.id_article,selectedInstruction.id_instruct,values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th>
                                        No.
                                    </th>
                                    <th>
                                        id_instruct
                                    </th>
                                    <th>
                                        ID Assy
                                    </th>
                                    <th>
                                        ID Inst
                                    </th>
                                    <th>
                                        ID Part
                                    </th>
                                    <th>
                                        Internal No
                                    </th>
                                    <th>
                                        Name
                                    </th>
                                    <th>
                                        Exec
                                    </th>
                                    <th>
                                        Loop
                                    </th>
                                    <th>
                                        Clamp Finished
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                instanceActionExecSettingRegistry.map((instanceActionExecSetting,index)=> (
                                    <tr key={index}>
                                        <td><div>{index+1}</div></td>
                                        <td><div>{instanceActionExecSetting.id_instruct}</div></td>
                                        <td><div>{instanceActionExecSetting.id_assy}</div></td>
                                        <td><div>{instanceActionExecSetting.id_inst}</div></td>
                                        <td><div>{instanceActionExecSetting.id_part}</div></td>
                                        <td><div>{instanceActionExecSetting.no}</div></td>
                                        <td><div>{instanceActionExecSetting.name}</div></td>
                                        <td><CheckBoxGeneral label='' name={`[${index}]is_exec`}  /></td>
                                        <td><TextInputGeneral name={`[${index}]num_loop`} placeholder='num_loop' /></td>
                                        <td><CheckBoxGeneral label='' name={`[${index}]is_clamp_when_finished`}  /></td>
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
                className={"btn btn-danger"}
                onClick={()=>{                    
                        if(selectedInstruction){
                            agent.Instructions.resetInstanceActionClips(selectedInstruction.id_article);
                        }
                    }
                }
            >
                {"ResetInstanceActionClips"}
            </button>
        </div>
    )
})