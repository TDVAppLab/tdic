import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { Formik , Form } from "formik";
import * as Yup from 'yup';
import TextInputGeneral from "../../../app/common/form/TextInputGeneral";
import { Col, Row } from "react-bootstrap";
import { WebsiteSetting } from "../../../app/models/WebsiteSetting";
import agent from "../../../app/api/agent";
import TextAreaGeneral from "../../../app/common/form/TextAreaGeneral";

export default function WebsiteSettingForm(){

    
    const {id} = useParams<{id: string}>();

    
    const [websiteSetting, setWebsiteSetting] = useState<WebsiteSetting>({        
        title:  '',
        data:  '',
        memo:  '',
    });

    const [isCreateMode, setIsCreateMode] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(()=>{
        //loadStatuses().then(()=>{
        //    console.log(statusRegistry);
        //});
    }, []);
    
    useEffect(() => {
        //console.log(id);
        if(id){
            setLoading(true);
            agent.WebsiteSettings.details(id).then(sitesetting => {
                sitesetting && setWebsiteSetting(sitesetting);
                setIsCreateMode(false);
                setLoading(false);
            })
        }
    },[id]);

    const validationSchema = Yup.object({
        title: Yup.string().required(),
    });
    

    const validationSchemaDel = Yup.object({
        title: Yup.string().required(),
    });
    
    function handleFormSubmit(object:WebsiteSetting) {
        if(isCreateMode){
            agent.WebsiteSettings.create(object);
        } else {
            agent.WebsiteSettings.update(object);
        }
    }

    
    function handleFormSubmitDelete(object:WebsiteSetting) {
        if(isCreateMode){
        } else {
            console.log("called attach delete");
            agent.WebsiteSettings.delete(object.title);
        }
    }

    

    if(loading) return <LoadingComponent />

    return(
        <div>         
            <h3>Model Edit</h3> 

            <Formik
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={websiteSetting} 
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>
                        
                        
                        <Row>
                            <Col xs={4}><TextInputGeneral label='Title' name='title' placeholder='title' disabled={!isCreateMode} /></Col>
                            <Col xs={12}><TextAreaGeneral label='Data' name='data' placeholder='data'  rows={2} /></Col>
                            <Col xs={12}><TextInputGeneral label='MEMO' name='memo' placeholder='memo' /></Col>
                        </Row>
                        
                              
                        <button disabled={!isValid || !dirty || isSubmitting} 
                            type = 'submit' >Submit</button>
                    </Form>
                )}

            </Formik>

            <Formik
                validationSchema={validationSchemaDel}
                enableReinitialize 
                initialValues={websiteSetting} 
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
                <Link to="/websitesettings">Return Index</Link>
            </div>




        </div>
    )
}