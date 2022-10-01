import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { Formik , Form } from "formik";
import * as Yup from 'yup';
import TextInputGeneral from "../../../app/common/form/TextInputGeneral";
import { Instanceobject } from '../../../app/models/Instanceobject';
import SelectInputGeneral from "../../../app/common/form/SelectInputGeneral";
import LoadingComponent from "../../../app/layout/LoadingComponents";

export default observer( function EditInstanceobjectCreater(){
    const {articleStore} = useStore();
    const {selectedArticle} = articleStore;

    const {instanceobjectStore} = useStore();
    const {createInstanceobject} = instanceobjectStore;

    const {modelfileStore} = useStore();
    const {loadModelfiles, loading : loadingModelfile, getOptionArray} = modelfileStore;

    const [instanceobject, setInstancepart] = useState<Instanceobject>({
        
        id_article: 0,
        id_instance: 0,
        id_part: 0,
        
        pos_x: 0,
        pos_y: 0,
        pos_z: 0,
        scale: 1,

    });
    

    const validationSchemaInstanceEdit = Yup.object({
        id_article: Yup.number()
        .min(1, 'The minimum amount is one').required(),
    });
    

    useEffect(()=>{
        if(selectedArticle?.id_article){
                setInstancepart({        
                    id_article: selectedArticle.id_article,
                    id_instance: 0,
                    id_part: 0,                
                    pos_x: 0,
                    pos_y: 0,
                    pos_z: 0,
                    scale: 1,
        
                });            
            loadModelfiles(false);
        }
    }, [selectedArticle?.id_article]);

    useEffect(()=>{
        loadModelfiles(false);
    }, []);

    if(loadingModelfile) return <LoadingComponent content="Loading ..." />

    return(
        <div>         
            <h3>Model Edit</h3> 



            <div>
            {<Formik
                    validationSchema={validationSchemaInstanceEdit}
                    enableReinitialize 
                    initialValues={instanceobject} 
                    onSubmit={(values) => createInstanceobject(values)}>
                    {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                        <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>

                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>
                                            ID Article
                                        </th>
                                        <th>
                                            ID Inst
                                        </th>
                                        <th>
                                            Part
                                        </th>
                                        <th>
                                            POS X
                                        </th>
                                        <th>
                                            POS Y
                                        </th>
                                        <th>
                                            POS Z
                                        </th>
                                        <th>
                                            Scale
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>                   
                                    <tr key={instanceobject.id_instance}>
                                        <td><div>{instanceobject.id_article}</div></td>
                                        <td><div>{instanceobject.id_instance}</div></td>
                                        <td><SelectInputGeneral placeholder='Part Number' name='id_part' options={getOptionArray()} /></td>
                                        <td><TextInputGeneral name={`pos_x`} placeholder='POS X' /></td>
                                        <td><TextInputGeneral name={`pos_y`} placeholder='POS Y' /></td>
                                        <td><TextInputGeneral name={`pos_z`} placeholder='POS Z' /></td>
                                        <td><TextInputGeneral name={`scale`} placeholder='Scale' /></td>
                                    </tr>
                                </tbody>
                            </table>
                            
                            <button disabled={!isValid || !dirty || isSubmitting} type = 'submit' className='btn btn-primary'>
                                {isSubmitting ? "Processing" : "Submit"}
                            </button>
                        </Form>
                    )}

                </Formik> }
            </div>

        </div>
    )
})