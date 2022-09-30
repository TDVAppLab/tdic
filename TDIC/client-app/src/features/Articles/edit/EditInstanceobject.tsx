
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import TextInputGeneral from '../../../app/common/form/TextInputGeneral';
import { Instanceobject } from '../../../app/models/Instanceobject';


export default observer( function EditInstanceobject(){
    const history = useHistory();
    
    const {instanceobjectStore} = useStore();
    const {instanceobjectRegistry, updateInstanceobjects} = instanceobjectStore;

    const [instanceobjects, setInstanceobjects] = useState<Instanceobject[]>([]);

    const {modelfileStore} = useStore();
    const {ModelfileRegistry} = modelfileStore;


    useEffect(()=>{
        instanceobjectRegistry && setInstanceobjects(Array.from(instanceobjectRegistry.values()));
    }, [instanceobjectRegistry]);

    const validationSchema = Yup.object({
        title: Yup.string().required(),
    });
    

    if(instanceobjects.length<1) return null;

    return(
        <div>
            <h3>instance objects</h3>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={instanceobjects} 
                onSubmit={(values) => 
                    updateInstanceobjects(values)
                        .then(state => instanceobjectRegistry && setInstanceobjects(Array.from(instanceobjectRegistry.values())))
                }>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th>
                                        No.
                                    </th>
                                    <th>
                                        ID Inst
                                    </th>
                                    <th>
                                        Part Number
                                    </th>
                                    <th>
                                        X
                                    </th>
                                    <th>
                                        Y
                                    </th>
                                    <th>
                                        Z
                                    </th>
                                    <th>
                                        Scale
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {                                
                                instanceobjects.map((x,index)=>(
                                    <tr key={x.id_instance}>
                                        <td><div>{index+1}</div></td>
                                        <td><div>{x.id_instance}</div></td>
                                        <td>{ModelfileRegistry.get(x.id_part)?.part_number}</td>
                                        <td><TextInputGeneral name={`[${index}]pos_x`} placeholder='POS X' /></td>
                                        <td><TextInputGeneral name={`[${index}]pos_y`} placeholder='POS Y' /></td>
                                        <td><TextInputGeneral name={`[${index}]pos_z`} placeholder='POS Z' /></td>
                                        <td><TextInputGeneral name={`[${index}]scale`} placeholder='Scale' /></td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                        
                        <button disabled={!isValid || !dirty || isSubmitting} type = 'submit' className='btn btn-primary'>
                            {isSubmitting ? "Processing" : "Submit"}
                        </button>
                    </Form>
                )}

            </Formik>
        </div>
    )
})