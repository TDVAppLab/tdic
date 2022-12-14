import { Form, Formik } from 'formik';
import React, {useState} from 'react';
import agent from '../../../app/api/agent';
import * as Yup from 'yup';
import { ModelfileUploadDtO } from '../../../app/models/ModelFile';
import { Col, Row } from 'react-bootstrap';
import FileInputGeneral from '../../../app/common/form/FileInputGeneral';
import { useNavigate } from 'react-router-dom';

function ModelfileCreate() {  
    const navigate = useNavigate();
    
    const [modelfile, setModelfile] = useState<ModelfileUploadDtO>({
        id_part: "",
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
/*
    const SUPPORTED_FORMATS = [
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/png"
      ];*/

    const validationSchema = Yup.object({
        file_data: Yup.mixed().required('A file is required')
        /*.test(
          "fileSize",
          "File too large",
          value => 100 <= value.size
        )*/
        .test(
          "name",
          "File not Selected",
          value => value.name !== ""
        )
/*        .test(
          "fileFormat",
          "Unsupported Format",
          value => value && SUPPORTED_FORMATS.includes(value.type)
        )*/
    });

    async function handleFormSubmit(event: ModelfileUploadDtO) {

        const formData = new FormData();
        console.log(event);

        if(event.file_data){
            
            formData.append('file', event.file_data);

            
            const ans = await (await agent.Modelfiles.fileupload(formData)).data;
            
            ans && navigate(`/modelfileedit/${ans.id_part}`);

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