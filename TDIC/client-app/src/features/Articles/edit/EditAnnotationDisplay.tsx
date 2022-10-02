
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { AnnotationDisplay } from '../../../app/models/AnnotationDisplay';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import { Formik } from 'formik';
import CheckBoxGeneral from '../../../app/common/form/CheckBoxGeneral';



export default observer( function EdiaAnnotationDisplay() {
    
    const history = useHistory();

    const validationSchema = Yup.object({
        title: Yup.string().required(),
    });
  
    const { annotationStore } = useStore();
    const { annotationRegistry, setSelectedAnnotation } = annotationStore;  

    const { annotationDisplayStore} = useStore();
    const { selectedAnnotationDisplayMap, selectedInstructionId, updateAnnotationDisplay } = annotationDisplayStore;

    const [annotationDisplays, setAnnotationDisplays] = useState<AnnotationDisplay[]>([]);
 

    useEffect(()=>{
        selectedAnnotationDisplayMap.size > 0 && setAnnotationDisplays(Array.from(selectedAnnotationDisplayMap.values()));
    }, []);
  

    useEffect(()=>{
        selectedAnnotationDisplayMap.size > 0 && setAnnotationDisplays(Array.from(selectedAnnotationDisplayMap.values()));
    }, [selectedAnnotationDisplayMap, selectedAnnotationDisplayMap.size]);


    
    useEffect(()=> {
        selectedAnnotationDisplayMap.size > 0 && setAnnotationDisplays(Array.from(selectedAnnotationDisplayMap.values()));
    }, [selectedInstructionId])


    return(
        <div>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={annotationDisplays} 
                onSubmit={(values) => updateAnnotationDisplay(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th>
                                        No.
                                    </th>
                                    <th>
                                        ID Annotation
                                    </th>
                                    <th>
                                        Title
                                    </th>
                                    <th>
                                        Description1
                                    </th>
                                    <th>
                                        Display
                                    </th>
                                    <th>
                                        Display Description
                                    </th>
                                    <th>
                                        Edit
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {                                
                                annotationDisplays.map((x,index)=>(
                                    

                                    <tr key={x.id_annotation}>
                                        <td>{x.id_annotation}</td>
                                        <td>{x.id_annotation}</td>
                                        <td>{ annotationRegistry.get(x.id_annotation)?.title }</td>
                                        <td>{ annotationRegistry.get(x.id_annotation)?.description1 }</td>                                        
                                        <td><CheckBoxGeneral label='' name={`[${index}]is_display`}  /></td>
                                        <td><CheckBoxGeneral label='' name={`[${index}]is_display_description`}  /></td>
                                        <td>
                                            <button key={x.id_annotation}
                                                    type = 'button'
                                                    className={"btn btn-outline-primary"}
                                                    onClick={()=>{setSelectedAnnotation(x.id_annotation)}} 
                                                >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>

                                    ))
                            }
                            </tbody>
                        </table>
                        
                        <button disabled={!isValid || !dirty || isSubmitting} type = 'submit' className='btn btn-primary'>
                            {isSubmitting ? "Processing" : "submit"}
                        </button>
                    </Form>
                )}

            </Formik>
        </div>
    )

});



//export default EdiaAnnotationDisplay;