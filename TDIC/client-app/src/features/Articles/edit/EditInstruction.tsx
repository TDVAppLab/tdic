
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import { Instruction } from "../../../app/models/instruction";
import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import TextInputGeneral from '../../../app/common/form/TextInputGeneral';
import TextAreaGeneral from '../../../app/common/form/TextAreaGeneral';
import { Col, Row } from 'react-bootstrap';
import SelectInputGeneral from '../../../app/common/form/SelectInputGeneral';
import CheckBoxGeneral from '../../../app/common/form/CheckBoxGeneral';


export default observer( function EditInstruction(){
    const history = useHistory();
    
    const {articleStore} = useStore();
    const {instructionStore} = useStore();
    const {selectedInstruction, updateInstruction, deleteInstruction, createInstruction, loadInstanceActionExecSettingAllArray, id_article: instructionId_article} = instructionStore;

    const {viewStore} = useStore();
    const {viewRegistry, getOptionArray : getViewOptionArray } = viewStore;

    
    const {annotationDisplayStore} = useStore();
    const {loadAnnotationDisplays, setSelectedAnnotationDisplayMap, selectedInstructionId, id_article : annotationDisplayId_article} = annotationDisplayStore;

    const [instruction, setInstruction] = useState<Instruction>({
        id_article: articleStore?.selectedArticle?.id_article!,
        id_instruct: 0,
        id_view: 0,
        title: '',
        short_description: '',
        display_order: 0,
        memo: '',        
        is_automatic_camera_rotate: true,
        display_instance_sets: '',
    });


    const validationSchema = Yup.object({
        id_view: Yup.number().required(),
        title: Yup.string().required(),
        short_description: Yup.string().nullable(),
        display_order: Yup.number().nullable(),
        memo: Yup.string().nullable(),
    });
    

    const validationSchemaDel = Yup.object({
        id_article: Yup.number().required(),
        id_instruct: Yup.number().required(),
    });

    useEffect(()=>{
        selectedInstruction && setInstruction(selectedInstruction);
    }, [selectedInstruction]);

    useEffect(()=>{
    }, [viewRegistry.size]);
    
    function handleFormSubmit(instruction:Instruction) {
        //console.log(instruction);
        
        if(instruction.id_instruct ==0 ){
            let newInstruction = {
                ...instruction
            };
            createInstruction(newInstruction).then(()=>loadAnnotationDisplays(annotationDisplayId_article)).then(()=>setSelectedAnnotationDisplayMap(selectedInstructionId))
                                             .then(()=>loadInstanceActionExecSettingAllArray(instructionId_article))
        } else {
            updateInstruction(instruction);
        }
    }

    
    function handleFormSubmitDelete(instruction:Instruction) {
        
        if(instruction){
            deleteInstruction(instruction);
        } else {
        }
    }

    


    return(
        <div>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={instruction} 
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>

                        <Row>
                            <Col xs={2}><TextInputGeneral label='ID' name='id_instruct' placeholder='Instruction ID' /></Col>
                            <Col xs={3}><TextInputGeneral label='Title' name='title' placeholder='Instruction Title' /></Col>
                            <Col xs={4}><SelectInputGeneral label='View ID' placeholder='id_view' name='id_view' options={getViewOptionArray()} /></Col>
                            <Col xs={3}><TextInputGeneral label='Display Order' name='display_order' placeholder='Display Order' /></Col>
                        </Row>

                        <hr />

                        <Row>
                            <Col ><TextAreaGeneral label='Short Description' placeholder='shortDescription' name='short_description' rows={15}   /></Col>
                        </Row>
                        
                        <Row>
                            <Col ><TextAreaGeneral label='MEMO' placeholder='memo' name='memo' rows={15}   /></Col>
                        </Row>

                        <Row>
                            <Col ><TextAreaGeneral label='Display Instance Sets' placeholder='' name='display_instance_sets' rows={5}   /></Col>
                        </Row>

                        <Row>
                            <Col xs={4}><CheckBoxGeneral label='Auto Camera Rotate' name='is_automatic_camera_rotate'  /></Col>
                        </Row>
                        
                        
                        <button disabled={!isValid || !dirty || isSubmitting} type = 'submit' className='btn btn-primary'>
                            {isSubmitting ? "Processing" : "Submit"}
                        </button>
                    </Form>
                )}

            </Formik>



            <Formik
                validationSchema={validationSchemaDel}
                enableReinitialize 
                initialValues={instruction} 
                onSubmit={values => handleFormSubmitDelete(values)}>
                {({ handleSubmit, isValid, isSubmitting }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>
                        <button disabled={!isValid || isSubmitting} type = 'submit' className='btn btn-danger'>
                            {isSubmitting ? "Processing" : "Delete"}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
})