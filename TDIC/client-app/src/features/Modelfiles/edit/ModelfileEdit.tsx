import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import { Formik , Form } from "formik";
import * as Yup from 'yup';
import TextInputGeneral from "../../../app/common/form/TextInputGeneral";
import { Modelfile } from "../../../app/models/ModelFile";
import { Col, Row } from "react-bootstrap";
import ModelfileViewer from "../common/ModelfileViewer";

export default observer( function ModelfileEdit(){
    const history = useHistory();
    const { modelfileStore} = useStore();
    const { selectedModelfile, loadModelfile, updateModelfile, deleteModelfile, loading } = modelfileStore;

    const {id} = useParams<{id: string}>();

    const [modelfile, setModelfile] = useState<Modelfile>({
        id_part: 0,
        part_number: '',
        version: 0,
        type_data: '',
        format_data: '',
        file_name: '',
        file_length: 0,
        itemlink: '',
        license: '',
        author: '',
        memo: '',
        create_datetime: null,
        latest_update_datetime: null,
    });


    const validationSchema = Yup.object({
        part_number: Yup.string().required(),
        version: Yup.number().required(),
        type_data: Yup.string().nullable(),
        format_data: Yup.string().nullable(),        
        file_name: Yup.string().nullable(),
        license: Yup.string().nullable(),
        author: Yup.string().nullable(),
        memo: Yup.string().nullable(),
    });
    

    const validationSchemaDel = Yup.object({
        id_part: Yup.number()
        .min(1, 'The minimum amount is one').required(),
    });

    useEffect(()=>{
        //loadStatuses().then(()=>{
        //    console.log(statusRegistry);
        //});
    }, []);
/*
    useEffect(()=>{
        if(id) loadModelfile(Number(id)).then(modelfile => setModelfile(modelfile!))
    }, [id, loadModelfile]);

*/
    useEffect(()=>{
        if(id) loadModelfile(Number(id));
    }, [id]);


    useEffect(()=>{
        selectedModelfile && setModelfile(selectedModelfile);
    }, [selectedModelfile]);
    

    function handleFormSubmit(modelfile:Modelfile) {
        if(modelfile.id_part ===0 ){
        } else {
            updateModelfile(modelfile);
        }
    }

    
    function handleFormSubmitDelete(modelfile:Modelfile) {
        console.log("called modelfile delete");
        if(modelfile.id_part ===0 ){
        } else {
            deleteModelfile(modelfile);
        }
    }

    if(loading) return <LoadingComponent content="Loading task..." />

    return(
        <div>         
            <h3>Model Edit</h3> 

            <div className="row" id="model_screen" style={{ width: 640, height : 360 }}>
                {
                    <ModelfileViewer id_part={Number(id)}/>
                }
            </div>

            <Formik
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={modelfile} 
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>
                        
                        <Row>
                            <Col xs={4}><label>Type Data</label><input className="form-control" value={modelfile.type_data} disabled /></Col>
                            <Col xs={4}><label>File Name</label><input className="form-control" value={modelfile.file_name} disabled /></Col>
                            <Col xs={4}><label>File Length</label><input className="form-control" value={modelfile.file_length} disabled /></Col>
                        </Row>

                        <Row>
                            <Col xs={4}><TextInputGeneral label='Part Number' name='part_number' placeholder='part_number' /></Col>
                            <Col xs={2}><TextInputGeneral label='Version' name='version' placeholder='version' /></Col>
                            <Col xs={2}><TextInputGeneral label='Format Fata' name='format_data' placeholder='format_data' /></Col>
                        </Row>

                        <Row>
                            <Col xs={10}><TextInputGeneral label='Itemlink' name='itemlink' placeholder='itemlink' /></Col>
                            <Col xs={4}><TextInputGeneral label='License' name='license' placeholder='license' /></Col>
                            <Col xs={4}><TextInputGeneral label='Author' name='author' placeholder='author' /></Col>
                        </Row>
                        
                        <Row>
                            <Col xs={6}><TextInputGeneral label='Memo' name='memo' placeholder='memo' /></Col>
                        </Row>
                        
                              
                        <button disabled={!isValid || !dirty || isSubmitting} 
                            type = 'submit' >Submit</button>
                    </Form>
                )}

            </Formik>

            <Formik
                validationSchema={validationSchemaDel}
                enableReinitialize 
                initialValues={modelfile} 
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
                <Link to="/modelfiles">Return Index</Link> |
                <Link to={`/modelfile/${id}`}>Details</Link>
            </div>
        </div>
    )
})