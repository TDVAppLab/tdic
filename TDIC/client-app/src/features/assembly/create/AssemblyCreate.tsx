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

export default observer( function AssemblyCreate(){
    const history = useHistory();

    
    
    const {assemblyStore} = useStore();
    const {loadAssembly, selectedAssembly, updateAssembly, deleteAssembly, loading} = assemblyStore;

    const {id} = useParams<{id: string}>();

    const [assembly, setAssembly] = useState<Assembly>({
        
        id_assy: 0,
        assy_name:  '',

    });


    const validationSchema = Yup.object({
        assy_name: Yup.string().required(),
    });
    

    const validationSchemaDel = Yup.object({
        id_assy: Yup.number()
        .min(1, 'The minimum amount is one').required(),
    });

    useEffect(()=>{
        //loadStatuses().then(()=>{
        //    console.log(statusRegistry);
        //});
    }, []);

    useEffect(()=>{
        if(id) loadAssembly(Number(id)).then(attachmentfile => setAssembly(attachmentfile!))
    }, [id, loadAssembly]);

    
    function handleFormSubmit(assembly:Assembly) {
        if(assembly.id_assy ===0 ){
            let newAssembly = {
                ...assembly
            };
            //console.log(newTask);
//            createTask(newTask);
//            createTask(newActivity).then(() => history.push(`/task/${newTask.Id}`))
        } else {
            updateAssembly(assembly);
            //updateActivity(task).then(() => history.push(`/activities/${task.Id}`))
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

    if(loading) return <LoadingComponent content="Loading task..." />

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
                <Link to="/assemblies">Return Index</Link> |
                <Link to={`/attachmentfile/${id}`}>Details</Link>
            </div>
        </div>
    )
})