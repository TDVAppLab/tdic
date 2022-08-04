import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import { Formik , Form } from "formik";
import * as Yup from 'yup';
import TextInputGeneral from "../../../app/common/form/TextInputGeneral";
import { Col, Row } from "react-bootstrap";
import { Assembly } from "../../../app/models/Assembly";
import { Instancepart } from "../../../app/models/Instancepart";
import SelectInputGeneral from "../../../app/common/form/SelectInputGeneral";

export default observer( function AssemblyCreate(){
    const history = useHistory();

    
    
    const {assemblyStore} = useStore();
    const {loadAssembly, selectedAssembly, createAssembly, updateAssembly, deleteAssembly, loading : loadingAssembly} = assemblyStore;
    
    const {instancepartStore} = useStore();
    const {createInstancepart, loading : loadingInstance} = instancepartStore;

    const {modelfileStore} = useStore();
    const {loadModelfiles, loading : loadingModelfile, getOptionArray} = modelfileStore;

    const {id} = useParams<{id: string}>();

    const [assembly, setAssembly] = useState<Assembly>({
        
        id_assy: 0,
        assy_name:  '',

    });

    const [instancepart, setInstancepart] = useState<Instancepart>({
        
        id_assy: 0,
        id_inst: 0,
        id_part: 0,
        
        pos_x: 0,
        pos_y: 0,
        pos_z: 0,
        scale: 0,

    });


    const validationSchema = Yup.object({
        assy_name: Yup.string().required(),
    });
    

    const validationSchemaDel = Yup.object({
        id_assy: Yup.number()
        .min(1, 'The minimum amount is one').required(),
    });
    

    const validationSchemaInstanceEdit = Yup.object({
        id_assy: Yup.number()
        .min(1, 'The minimum amount is one').required(),
    });

    useEffect(()=>{
        //loadStatuses().then(()=>{
        //    console.log(statusRegistry);
        //});
    }, []);

    useEffect(()=>{
        if(id){ 
            loadAssembly(Number(id)).then(attachmentfile => {
                setAssembly(attachmentfile!);
                setInstancepart({        
                    id_assy: attachmentfile?.id_assy!,
                    id_inst: 0,
                    id_part: 0,                
                    pos_x: 0,
                    pos_y: 0,
                    pos_z: 0,
                    scale: 0,
        
                });
            });
            loadModelfiles();
        }
    }, [id, loadAssembly]);

    
    function handleFormSubmit(assembly:Assembly) {
        if(assembly.id_assy ===0 ){
            let newAssembly = {
                ...assembly
            };
            createAssembly(newAssembly);
        } else {
            updateAssembly(assembly);
        }
    }

    
    function handleFormSubmitDelete(assembly:Assembly) {
        console.log("called Assembly delete");
        if(assembly.id_assy ===0 ){
        } else {
            console.log("called attach delete");
            deleteAssembly(assembly);
        }
    }

    
    function handleFormSubmitInstanceEdit(object:Instancepart) {
        if(object.id_inst ===0 ){
            createInstancepart(object);
        } else {
            //updateAssembly(assembly);
        }
    }

    if(loadingAssembly || loadingModelfile) return <LoadingComponent content="Loading task..." />

    return(
        <div>         
            <h3>Model Edit</h3> 

            <Formik
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={assembly} 
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>
                        
                        <Row>
                            <Col xs={2}><label>ID Assy</label><input className="form-control" value={assembly.id_assy} disabled /></Col>
                        </Row>
                        
                        <Row>
                            <Col xs={4}><TextInputGeneral label='Assy Name' name='assy_name' placeholder='assy_name' /></Col>
                        </Row>
                        
                              
                        <button disabled={!isValid || !dirty || isSubmitting} 
                            type = 'submit' >Submit</button>
                    </Form>
                )}

            </Formik>

            <Formik
                validationSchema={validationSchemaDel}
                enableReinitialize 
                initialValues={assembly} 
                onSubmit={values => handleFormSubmitDelete(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>
                        <button disabled={!isValid || isSubmitting} 
                            type = 'submit' >Delete</button>
                    </Form>
                )}
            </Formik>

            <hr />

            <div>
            {assembly.id_assy != 0 && <Formik
                    validationSchema={validationSchemaInstanceEdit}
                    enableReinitialize 
                    initialValues={instancepart} 
                    onSubmit={(values) => handleFormSubmitInstanceEdit(values)}>
                    {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                        <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>

                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>
                                            ID Assy
                                        </th>
                                        <th>
                                            ID Inst
                                        </th>
                                        <th>
                                            Part
                                        </th>
                                        <th>
                                            POS X
                                        </th>
                                        <th>
                                            POS Y
                                        </th>
                                        <th>
                                            POS Z
                                        </th>
                                        <th>
                                            Scale
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>                   
                                    <tr key={instancepart.id_inst}>
                                        <td><div>{instancepart.id_assy}</div></td>
                                        <td><div>{instancepart.id_inst}</div></td>
                                        <td><SelectInputGeneral placeholder='Part Number' name='id_part' options={getOptionArray()} /></td>
                                        <td><TextInputGeneral name={`pos_x`} placeholder='POS X' /></td>
                                        <td><TextInputGeneral name={`pos_y`} placeholder='POS Y' /></td>
                                        <td><TextInputGeneral name={`pos_z`} placeholder='POS Z' /></td>
                                        <td><TextInputGeneral name={`scale`} placeholder='Scale' /></td>
                                    </tr>
                                </tbody>
                            </table>
                            
                            <button disabled={!isValid || !dirty || isSubmitting} type = 'submit' className='btn btn-primary'>Submit</button>
                        </Form>
                    )}

                </Formik> }
            </div>

            
            <hr />

            <div>
                <Link to="/assemblies">Return Index</Link> |
                <Link to={`/attachmentfile/${id}`}>Details</Link>
            </div>




        </div>
    )
})