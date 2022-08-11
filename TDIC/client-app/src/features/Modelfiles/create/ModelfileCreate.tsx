import { Form, Formik } from 'formik';
import React, {useState} from 'react';
import agent from '../../../app/api/agent';
import * as Yup from 'yup';
import { ModelfileUploadDtO } from '../../../app/models/ModelFile';
import { Col, Row } from 'react-bootstrap';
import FileInputGeneral from '../../../app/common/form/FileInputGeneral';

function ModelfileCreate() {    
    
    //const [file, setFile] = useState<File>();    
    
    const [modelfile, setModelfile] = useState<ModelfileUploadDtO>({
        id_part: 0,
        part_number: '',
        version: 0,
        file_data: new File([],''),
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
        part_number: Yup.string().nullable(),
    });

    function handleFormSubmit(event: ModelfileUploadDtO) {
        const formData = new FormData();

        if(event.file_data){
            
            formData.append('file', event.file_data);
            //console.log(event.file_data);
            
            agent.Modelfiles.fileupload(formData).then((response) => {});

        }

    }

    return (
        <div className="App">

            <h3>Model File Upload</h3>

            <Formik
                    validationSchema={validationSchema}
                    enableReinitialize 
                    initialValues={modelfile} 
                    onSubmit={values => handleFormSubmit(values)}>
                    {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                        <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>
                            
                            <Row>
                                <Col xs={4}><FileInputGeneral label='' type="file" name='file_data' placeholder='file_data' /></Col>
                            </Row>      
                            
                            <hr />       
                            
                            <button disabled={!isValid || isSubmitting} type = 'submit' className='btn btn-primary'>Upload</button>
                        </Form>
                    )}

                </Formik>

        </div>
    );
}

export default ModelfileCreate;