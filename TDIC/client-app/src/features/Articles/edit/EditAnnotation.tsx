
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import TextInputGeneral from '../../../app/common/form/TextInputGeneral';
import TextAreaGeneral from '../../../app/common/form/TextAreaGeneral';
import { Col, Row } from 'react-bootstrap';
import { Annotation } from '../../../app/models/Annotation';
import { Vector3 } from 'three';


export default observer( function EditAnnotation(){
    const history = useHistory();
    
    const {articleStore} = useStore();
    const {annotationStore} = useStore();
    const {selectedAnnotation, editAnnotationInternal, updateAnnotation, createAnnotation, deleteAnnotation, setSelectedAnnotation} = annotationStore;
    const {sceneInfoStore} = useStore();

    const {annotationDisplayStore} = useStore();
    const {loadAnnotationDisplays, setSelectedAnnotationDisplayMap, deleteAnnotationDisplayArray, selectedInstructionId, selectedAnnotationDisplayMap, loading : isAnnotationDisplayLoading, id_article : annotationDisplayId_article} = annotationDisplayStore;

    const [annotation, setAnnotation] = useState<Annotation>({
        id_article: articleStore?.selectedArticle?.id_article!,
        id_annotation: 0,

        title: '',
        description1: '',
        description2: '',
        
        status: 0,

        pos_x: 0,
        pos_y: 0,
        pos_z: 0,
    });


    const validationSchema = Yup.object({
        title: Yup.string().required(),
    });
    

    const validationSchemaDel = Yup.object({
        id_article: Yup.number().required(),
        id_annotation: Yup.number().required(),
    });

    useEffect(()=>{
        selectedAnnotation && setAnnotation(selectedAnnotation);
    }, [selectedAnnotation]);

    
    function handleFormSubmit(annotation:Annotation) {
        if(annotation.id_annotation ==0 ){
            let newAnnotation = {
                ...annotation
            };
            //console.log(newAnnotation);
            createAnnotation(newAnnotation).then(()=>loadAnnotationDisplays(annotationDisplayId_article)).then(()=>setSelectedAnnotationDisplayMap(selectedInstructionId));
        } else {
            updateAnnotation(annotation);
        }
    }

    

    
    function handleFormSubmitDelete(object:Annotation) {
        if(object){
            deleteAnnotation(object).then(x => deleteAnnotationDisplayArray(object.id_annotation));
        } else {
        }
    }

    
    const handleInputChangeAnnotationPosition=(diff_pos: Vector3) => {
        editAnnotationInternal({
            id_article: annotation.id_article,
            id_annotation: annotation.id_annotation,
    
            title: annotation.title,
            description1: annotation.description1,
            description2: annotation.description2,
            
            status: annotation.status,
    
            pos_x: annotation.pos_x + diff_pos.x,
            pos_y: annotation.pos_y + diff_pos.y,
            pos_z: annotation.pos_z + diff_pos.z,
        });
    }

    const handleSetNewAnnotation = () => {
        editAnnotationInternal({
            id_article: annotation.id_article,
            id_annotation: 0,
    
            title: annotation.title,
            description1: annotation.description1,
            description2: annotation.description2,
            
            status: annotation.status,
    
            pos_x: sceneInfoStore?.orbit_target?.x!,
            pos_y: sceneInfoStore?.orbit_target?.y!,
            pos_z: sceneInfoStore?.orbit_target?.z!,
        });
        setSelectedAnnotation(0);
    }

    

    const handleSetNewAnnotationPosition = () => {
        editAnnotationInternal({
            id_article: annotation.id_article,
            id_annotation: annotation.id_annotation,
    
            title: annotation.title,
            description1: annotation.description1,
            description2: annotation.description2,
            
            status: annotation.status,
    
            pos_x: sceneInfoStore?.orbit_target?.x!,
            pos_y: sceneInfoStore?.orbit_target?.y!,
            pos_z: sceneInfoStore?.orbit_target?.z!,
        });
        setSelectedAnnotation(0);
    }    

    return(
        <div>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={annotation} 
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>

                        <Row>
                            <Col xs={3}><TextInputGeneral label='Annotation ID' name='id_annotation' placeholder='Annotation ID' /></Col>
                            <Col xs={6}><TextInputGeneral label='Annotation Title' name='title' placeholder='Annotation Title' /></Col>
                            <Col xs={3}><TextInputGeneral label='Status' name='status' placeholder='Status' /></Col>
                        </Row>

                        <hr />

                        <Row>
                            <Col ><TextAreaGeneral label='Description1' placeholder='Description1' name='description1' rows={1}   /></Col>
                            <Col ><TextAreaGeneral label='Description2' placeholder='Description2' name='description2' rows={1}   /></Col>
                        </Row>


                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Axis</th>
                                    <th>POS</th>
                                    <th>OP</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>X</td>
                                    <td><TextInputGeneral label='' name='pos_x' placeholder='POS X' /></td>
                                    <td>
                                        <button type = 'button' className={"btn btn-outline-danger btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(-1,0,0))}} >-1 </button>
                                        <button type = 'button' className={"btn btn-outline-danger btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(-0.1,0,0))}} >-0.1</button>
                                        <button type = 'button' className={"btn btn-outline-danger btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(-0.01,0,0))}} >-0.01</button>
                                        <button type = 'button' className={"btn btn-outline-danger btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(0.01,0,0))}} >+0.01</button>
                                        <button type = 'button' className={"btn btn-outline-danger btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(0.1,0,0))}} >+0.1</button>
                                        <button type = 'button' className={"btn btn-outline-danger btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(1,0,0))}} >+1 </button>
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td>Y</td>
                                    <td><TextInputGeneral label='' name='pos_y' placeholder='POS Y' /></td>
                                    <td>
                                        <button type = 'button' className={"btn btn-outline-success btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(0,-1,0))}} >-1 </button>
                                        <button type = 'button' className={"btn btn-outline-success btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(0,-0.1,0))}} >-0.1</button>
                                        <button type = 'button' className={"btn btn-outline-success btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(0,-0.01,0))}} >-0.01</button>
                                        <button type = 'button' className={"btn btn-outline-success btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(0,0.01,0))}} >+0.01</button>
                                        <button type = 'button' className={"btn btn-outline-success btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(0,0.1,0))}} >+0.1</button>
                                        <button type = 'button' className={"btn btn-outline-success btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(0,1,0))}} >+1 </button>
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td>Z</td>
                                    <td><TextInputGeneral label='' name='pos_z' placeholder='POS Z' /></td>
                                    <td>
                                        <button type = 'button' className={"btn btn-outline-primary btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(0,0,-1))}} >-1 </button>
                                        <button type = 'button' className={"btn btn-outline-primary btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(0,0,-0.1))}} >-0.1</button>
                                        <button type = 'button' className={"btn btn-outline-primary btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(0,0,-0.01))}} >-0.01</button>
                                        <button type = 'button' className={"btn btn-outline-primary btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(0,0,0.01))}} >+0.01</button>
                                        <button type = 'button' className={"btn btn-outline-primary btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(0,0,0.1))}} >+0.1</button>
                                        <button type = 'button' className={"btn btn-outline-primary btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(0,0,1))}} >+1 </button>
                                    </td>
                                </tr>


                            </tbody>
                        </table>
                        
                        <button disabled={!isValid || !dirty || isSubmitting} type = 'submit' className='btn btn-primary'>
                            {isSubmitting ? "Processing" : "Submit"}
                        </button>
                    </Form>
                )}

            </Formik>
            

            <Formik
                validationSchema={validationSchemaDel}
                enableReinitialize 
                initialValues={annotation} 
                onSubmit={values => handleFormSubmitDelete(values)}>
                {({ handleSubmit, isValid, isSubmitting }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>
                        <button disabled={!isValid || isSubmitting} type = 'submit' className='btn btn-danger'>
                            {isSubmitting ? "Processing" : "Delete"}
                        </button>
                    </Form>
                )}
            </Formik>


            
            <button
                type = 'submit'
                className={"btn btn-outline-primary"}
                onClick={()=>{handleSetNewAnnotation()}} 
            >
                Entry New Annotation with Current Orbit
            </button>
            
            <br />

            <button
                type = 'submit'
                className={"btn btn-outline-primary"}
                onClick={()=>{handleSetNewAnnotationPosition()}} 
            >
                Set Annotation Position with Current Orbit
            </button>
        </div>
    )
})