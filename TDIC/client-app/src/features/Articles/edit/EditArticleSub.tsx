
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import TextInputGeneral from '../../../app/common/form/TextInputGeneral';
import TextAreaGeneral from '../../../app/common/form/TextAreaGeneral';
import { Col, Row } from 'react-bootstrap';
import { Article } from '../../../app/models/article';
import CheckBoxGeneral from '../../../app/common/form/CheckBoxGeneral';
import SelectInputGeneral from '../../../app/common/form/SelectInputGeneral';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { toast } from 'react-toastify';


export default observer( function EditArticleSub(){
    const history = useHistory();
    
    const [isDataLoadingFinished, setIsDataLoadingFinished]= useState<boolean>(false);
    
    const {articleStore} = useStore();
    const {selectedArticle, updateArticle, createArticle, deleteArticle, duplicateArticle} = articleStore;

    
    const {mArticleStatusStore} = useStore();
    const {loadStatuses, loading : loadingstatus, getOptionArray : getMArticleStatusOptionArray } = mArticleStatusStore;

    
    //const {assemblyStore} = useStore();
    //const {loadAssemblies, loading: loadingAssembly, getOptionArray : getAssemblyOptionArray } = assemblyStore;


    const [article, setArticle] = useState<Article>({
            
        id_article: 0,
        id_assy: 0,

        title: '',
        short_description: '',
        long_description: '',
        meta_description: '',
        meta_category: '',

        status: 1,

        directional_light_color: 0,
        directional_light_intensity: 0,
        directional_light_px: 0,
        directional_light_py: 0,
        directional_light_pz: 0,

        ambient_light_color: 0,
        ambient_light_intensity: 0,

        gammaOutput: false,

        id_attachment_for_eye_catch: 0,

        bg_color:'#000000',
        bg_c: 0,
        bg_h: 0,
        bg_s: 0,
        bg_l: 0,
        isStarrySky: false,
    });


    const validationSchema = Yup.object({
        title: Yup.string().required(),
    });
    

    const validationSchemaDel = Yup.object({
        id_article: Yup.number().required(),
    });

    useEffect(()=>{
        loadStatuses().then(()=>{
        });
        //loadAssemblies();
    }, []);

    useEffect(()=>{
        selectedArticle && setArticle(selectedArticle);
        loadStatuses();
    }, [selectedArticle]);


    useEffect(() => { 
        setIsDataLoadingFinished(!(loadingstatus));        
    },[loadingstatus])
    

    async function handleFormArticleUpd(object:Article) {
        if(object.id_article ==0 ){
            let newObject = {
                ...object
            }

            const ans_article = await createArticle(newObject);
            ans_article && history.push(`/articleedit/${Number(ans_article.id_article)}`);
            toast.success('new article added');
        } else {
            await updateArticle(object);
            toast.info('article updeted');
        }
    }

    async function handleFormArticleDel(values:Article) {
        
        await deleteArticle(values);
        history.push(`/`);
        toast.info('article deleted');
    }

    async function handleFormArticleDuplicate(values:Article) {
        
        const ans_article = await duplicateArticle(values);
        ans_article && history.push(`/articleedit/${Number(ans_article.id_article)}`); 
        toast.info('article duplicated');
    }

    if(!isDataLoadingFinished) return (<><LoadingComponent /></>);

    return(
        <div>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={article} 
                onSubmit={values => handleFormArticleUpd(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>

                        <Row>
                            <Col xs={3}><SelectInputGeneral label='Status' placeholder='status' name='status' options={getMArticleStatusOptionArray()} /></Col>
                            <Col xs={9}><TextInputGeneral label='Article Title' name='title' placeholder='Article Title' /></Col>
                        </Row>

                        <hr />
                        
                        <Row>
                            <Col ><TextAreaGeneral label='Short Description' placeholder='Description' name='short_description' rows={3}   /></Col>
                        </Row>
                        
                        <Row>
                            <Col ><TextAreaGeneral label='Long Description' placeholder='Description' name='long_description' rows={3}   /></Col>
                        </Row>

                        <hr />

                        <Row>
                            <Col xs={4}><TextInputGeneral type="color" label='Color' name='bg_color' placeholder='Color' /></Col>
                        </Row>
                        
                        <Row>
                            <Col xs={4}><CheckBoxGeneral label='gammaOutput' name='gammaOutput'  /></Col>
                        </Row>
                        
                        
                        <button disabled={!isValid || !dirty || isSubmitting} type = 'submit' className='btn btn-primary'>
                            {isSubmitting ? "Processing" : "submit"}
                        </button>
                    </Form>
                )}

            </Formik>

            { article.id_article != 0 &&
            <Formik
                validationSchema={validationSchemaDel}
                enableReinitialize 
                initialValues={article} 
                onSubmit={values => {handleFormArticleDel(values)}}>
                {({ handleSubmit, isValid, isSubmitting }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>
                        <button disabled={!isValid || isSubmitting} type = 'submit' className='btn btn-danger'>
                            {isSubmitting ? "Processing" : "Delete"}
                        </button>
                    </Form>
                )}
            </Formik>
            }


            { article.id_article != 0 &&
            <Formik
                validationSchema={validationSchemaDel}
                enableReinitialize 
                initialValues={article} 
                onSubmit={values => handleFormArticleDuplicate(values)}>
                {({ handleSubmit, isValid, isSubmitting }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>
                        <button disabled={!isValid || isSubmitting} type = 'submit' className='btn btn-warning'>
                            {isSubmitting ? "Processing" : "Duplicate"}
                        </button>
                    </Form>
                )}
            </Formik>
            }

            

        </div>
    )
})