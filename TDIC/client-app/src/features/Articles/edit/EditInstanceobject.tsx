
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import TextInputGeneral from '../../../app/common/form/TextInputGeneral';
import { Instanceobject } from '../../../app/models/Instanceobject';
import EditInstanceobjectCreater from './EditInstanceobjectCreater';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { toast } from 'react-toastify';


export default observer( function EditInstanceobject(){
    
    const {instanceobjectStore} = useStore();
    const {instanceobjectRegistry, updateInstanceobjects, deleteInstanceobject, loading : loadingInstanceobject} = instanceobjectStore;

    //const [instanceobjects, setInstanceobjects] = useState<Instanceobject[]>([]);

    const {modelfileStore} = useStore();
    const {loadModelfiles, ModelfileRegistry, loading : loadingModelfile} = modelfileStore;


    useEffect(()=>{
        //instanceobjectRegistry && setInstanceobjects(Array.from(instanceobjectRegistry.values()));        
        //if(instanceobjectRegistry && !loadingModelfile && !loadingInstanceobject){
        //    setInstanceobjects(Array.from(instanceobjectRegistry.values()));
    //}

    }, [instanceobjectRegistry, loadingModelfile, loadingInstanceobject]);

    const validationSchema = Yup.object({
        title: Yup.string().required(),
    });
    

    useEffect(()=>{
        loadModelfiles(false);
    }, []);

    
    async function handleFormInstanceobjectUpd(values:Instanceobject[]) {
        await updateInstanceobjects(values);        
            //.then(state => instanceobjectRegistry && setInstanceobjects(Array.from(instanceobjectRegistry.values())))
        toast.info('instanceobjects updated');
        
    }

    async function handleFormInstanceobjectDel(values:Instanceobject) {

        await deleteInstanceobject(values);
        toast.info('instanceobject deleted');
    }

    //if(instanceobjects.length<1) return null;
    if(loadingModelfile || loadingInstanceobject) return <LoadingComponent content="Loading ..." />

    return(
        <div>
            <h3>instance objects</h3>
            <EditInstanceobjectCreater />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={Array.from(instanceobjectRegistry.values())} 
                onSubmit={(values) => handleFormInstanceobjectUpd(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th>
                                        No.
                                    </th>
                                    <th>
                                        ID Instance
                                    </th>
                                    <th>
                                        ID Part
                                    </th>
                                    <th>
                                        Part Number
                                    </th>
                                    <th>
                                        X
                                    </th>
                                    <th>
                                        Y
                                    </th>
                                    <th>
                                        Z
                                    </th>
                                    
                                    {/*
                                    <th>
                                        QX
                                    </th>
                                    <th>
                                        QY
                                    </th>
                                    <th>
                                        QZ
                                    </th>
                                    <th>
                                        QW
                                    </th>
                                    */}

                                    <th>
                                        Scale
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {                                
                                Array.from(instanceobjectRegistry.values()).map((x,index)=>(
                                    <tr key={x.id_instance}>
                                        <td><div>{index+1}</div></td>
                                        <td><div>{x.id_instance}</div></td>
                                        <td><div><Link to={`/modelfileedit/${Number(x.id_part)}`}>{x.id_part}</Link></div></td>
                                        <td>{ModelfileRegistry.get(x.id_part)?.part_number}</td>
                                        <td><TextInputGeneral name={`[${index}]pos_x`} placeholder='POS X' /></td>
                                        <td><TextInputGeneral name={`[${index}]pos_y`} placeholder='POS Y' /></td>
                                        <td><TextInputGeneral name={`[${index}]pos_z`} placeholder='POS Z' /></td>

                                    {/*
                                        <td><TextInputGeneral name={`[${index}]quaternion_x`} placeholder='X' /></td>
                                        <td><TextInputGeneral name={`[${index}]quaternion_y`} placeholder='Y' /></td>
                                        <td><TextInputGeneral name={`[${index}]quaternion_z`} placeholder='Z' /></td>
                                        <td><TextInputGeneral name={`[${index}]quaternion_w`} placeholder='W' /></td>

                                    */}
                                        <td><TextInputGeneral name={`[${index}]scale`} placeholder='Scale' /></td>
                                        <td>
                                            <button key={x.id_instance}
                                                    type = 'submit'
                                                    className={"btn btn-danger"}
                                                    onClick={()=>{                                                        
                                                        handleFormInstanceobjectDel({        
                                                            id_article: x.id_article,
                                                            id_instance: x.id_instance,
                                                            id_part: 0,                
                                                            pos_x: 0,
                                                            pos_y: 0,
                                                            pos_z: 0,
                                                            scale: 0,
                                                            quaternion_x: 0,
                                                            quaternion_y: 0,
                                                            quaternion_z: 0,
                                                            quaternion_w: 1,
                                                            uuid: null,
                                                
                                                        });
                                                    }} 
                                                >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                        
                        <button disabled={!isValid || !dirty || isSubmitting} type = 'submit' className='btn btn-primary'>
                            {isSubmitting ? "Processing" : "Submit"}
                        </button>
                    </Form>
                )}

            </Formik>
        </div>
    )
})