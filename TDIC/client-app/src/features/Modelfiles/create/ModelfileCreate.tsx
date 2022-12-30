import { Form, Formik } from 'formik';
import React, {useState} from 'react';
import agent from '../../../app/api/agent';
import * as Yup from 'yup';
import { getDefaultValueOfModelfile, Modelfile, ModelfileUploadDtO } from '../../../app/models/ModelFile';
import { Col, Row } from 'react-bootstrap';
import FileInputGeneral from '../../../app/common/form/FileInputGeneral';
import { useNavigate } from 'react-router-dom';
import {v4} from 'uuid';
import { APIURL } from '../../../app/constants';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { PartAnimationClip } from '../../../app/models/PartAnimationClip';




function baseName(str: string)
{
   var base = new String(str).substring(str.lastIndexOf('/') + 1); 
    if(base.lastIndexOf(".") != -1)       
        base = base.substring(0, base.lastIndexOf("."));
   return base;
}




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

            const createDto = getDefaultValueOfModelfile();
            createDto.id_part=v4();
            createDto.part_number=baseName(event.file_data.name);
            createDto.version=0;

            const ans_step1 = await (await agent.Modelfiles.create(createDto)).data;



            if(event.file_data && ans_step1){
            
                formData.append('file', event.file_data);    
                
                const ans_step2 = await (await agent.Modelfiles.uploadmodelfile(ans_step1.id_part, formData)).data;

                const str_url_partapi = APIURL + `/modelfiles/file/${ans_step1.id_part}`

                const glfLoader = new GLTFLoader();

                const PartAnimationClips : PartAnimationClip[] = [];
                

                await glfLoader.loadAsync(str_url_partapi).then(gltf => {
                    
                    gltf.animations.forEach((animation,index)=>{
                        PartAnimationClips.push({no:index, name: animation.name})
                    })
                
                });
        
                if(ans_step1.id_part && PartAnimationClips.length > 0){
                    //console.log(PartAnimationClips);
                    await agent.Modelfiles.updatePartAnimationClip(ans_step1.id_part,PartAnimationClips);        
                }
                
                ans_step2 && navigate(`/modelfileedit/${ans_step2.id_part}`);
    
            }    

        }

    }

    return (
        <div className="App">

            <h3>Model File Upload</h3>

            <Formik
                    validateOnMount={true}
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