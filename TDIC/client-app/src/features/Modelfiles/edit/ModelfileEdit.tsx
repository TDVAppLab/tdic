import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import { Formik , Form } from "formik";
import * as Yup from 'yup';
import TextInputGeneral from "../../../app/common/form/TextInputGeneral";
import { Modelfile } from "../../../app/models/ModelFile";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import ModelfileViewer from "../common/ModelfileViewer";
import TextAreaGeneral from "../../../app/common/form/TextAreaGeneral";
import EditModelfileEyecatch from "./EditModelfileEyecatch";
import { AnimationClip } from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ShowAction from "../common/ShowAction";
import agent from "../../../app/api/agent";
import { PartAnimationClip } from "../../../app/models/PartAnimationClip";

export default observer( function ModelfileEdit(){
    const navigate = useNavigate();
    const { modelfileStore} = useStore();
    const { selectedModelfile, loadModelfile, updateModelfile, deleteModelfile, loading } = modelfileStore;

    const {id} = useParams<{id: string}>();

    const [isMExecAnimation, setIsMExecAnimation] = useState(false);
    const [animations, setAnimations] = useState<AnimationClip[]>([]);
    const [partAnimationClips, setPartAnimationClips] = useState<PartAnimationClip[]>([]);
    const [modelUuid, setModelUuid] = useState("");

    const [modelfile, setModelfile] = useState<Modelfile>({
        id_part: 0,
        part_number: '',
        version: 0,
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
        count_use_instance:0,
        article_references: []
    });


    const validationSchema = Yup.object({
        part_number: Yup.string().required(),
        version: Yup.number().required(),
        type_data: Yup.string().nullable(),
        format_data: Yup.string().nullable(),        
        file_name: Yup.string().nullable(),
        license: Yup.string().nullable(),
        author: Yup.string().nullable(),
        memo: Yup.string().nullable(),
    });
    

    const validationSchemaDel = Yup.object({
        id_part: Yup.number()
        .min(1, 'The minimum amount is one').required(),
    });

    useEffect(()=>{
        //loadStatuses().then(()=>{
        //    console.log(statusRegistry);
        //});
    }, []);
/*
    useEffect(()=>{
        if(id) loadModelfile(Number(id)).then(modelfile => setModelfile(modelfile!))
    }, [id, loadModelfile]);

*/
    useEffect(()=>{
        if(id){            
            loadModelfile(Number(id));
            agent.Modelfiles.getPartAnimationClips(Number(id)).then((response) => {
                    setPartAnimationClips(response);
            });

        }
    }, [id]);


    useEffect(()=>{
        selectedModelfile && setModelfile(selectedModelfile);
    }, [selectedModelfile]);
    

    function handleFormSubmit(modelfile:Modelfile) {
        console.log(modelfile);
        if(modelfile.id_part ===0 ){
        } else {
            updateModelfile(modelfile);
        }
    }


    function handleFormSubmitResetAnimationClipArray() {
        
        const PartAnimationClips : PartAnimationClip[] = [];
        animations.forEach((animation,index)=>{
            PartAnimationClips.push({no:index, name: animation.name})
        })

        if(id){
            console.log(PartAnimationClips);
            agent.Modelfiles.updatePartAnimationClip(Number(id),PartAnimationClips).then((response) => {});

        }
    }

    if(loading) return <LoadingComponent />

    return(
        <div>         
            <h3>Model Edit</h3> 

            
            <Row>
                <Col  sm={6} >
                    <div className="row" style={{ height:"45vh", width:'45vw' }}>                            
                        <Canvas style={{background: 'white'}} camera={{position:[3,3,3]}} >
                            <ambientLight intensity={1.5} />
                            <directionalLight intensity={0.6} position={[0, 2, 2]} />
                            <ModelfileViewer id_part={Number(id)} setTeststring={setAnimations} setModelUuid = {setModelUuid}/>
                            <OrbitControls target={[0, 0, 0]}  makeDefault />
                            <axesHelper args={[2]}/>
                            <gridHelper args={[2]}/>
                            <ShowAction modelUuid={modelUuid} animations = {animations} is_exec_animation={isMExecAnimation}/>
                        </Canvas>                            
                    </div>
                </Col>

                <Col sm={6} >
                    <Tabs defaultActiveKey="modelfile_dataedit" id="modelfile-tab-edit" >
                        <Tab eventKey="modelfile_dataedit" title="Edit">

                            <Formik
                                validationSchema={validationSchema}
                                enableReinitialize 
                                initialValues={modelfile} 
                                onSubmit={values => handleFormSubmit(values)}>
                                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>
                                        
                                        <Row>
                                            <Col xs={4}><label>ID Part</label><input className="form-control" value={modelfile.id_part} disabled /></Col>
                                        </Row>
                                        
                                        <Row>
                                            <Col xs={4}><label>Type Data</label><input className="form-control" value={modelfile.type_data} disabled /></Col>
                                            <Col xs={4}><label>File Name</label><input className="form-control" value={modelfile.file_name} disabled /></Col>
                                            <Col xs={4}><label>File Length</label><input className="form-control" value={modelfile.file_length} disabled /></Col>
                                        </Row>

                                        <Row>
                                            <Col xs={4}><TextInputGeneral label='Part Number' name='part_number' placeholder='part_number' /></Col>
                                            <Col xs={4}><TextInputGeneral label='Version' name='version' placeholder='version' /></Col>
                                            <Col xs={4}><TextInputGeneral label='Format Fata' name='format_data' placeholder='format_data' /></Col>
                                        </Row>

                                        <Row>
                                            <Col xs={12}><TextInputGeneral label='Itemlink' name='itemlink' placeholder='itemlink' /></Col>
                                            <Col xs={6}><TextInputGeneral label='License' name='license' placeholder='license' /></Col>
                                            <Col xs={6}><TextInputGeneral label='Author' name='author' placeholder='author' /></Col>
                                        </Row>
                                        
                                        <Row>
                                            <Col xs={12}><TextAreaGeneral label='Memo' name='memo' placeholder='memo' rows={3} /></Col>
                                        </Row>
                                        <button disabled={!isValid || !dirty || isSubmitting} type = 'submit' className='btn btn-primary' >
                                            { 
                                            //    isSubmitting && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 
                                            }
                                            Submit
                                        </button>
                                    </Form>
                                )}

                            </Formik>

                            <Formik
                                validationSchema={validationSchemaDel}
                                enableReinitialize 
                                initialValues={modelfile} 
                                onSubmit={values => {
                                    deleteModelfile(values).then(()=>{ navigate(`/modelfiles`) }) 
                                }}>
                                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>
                                        <button disabled={!isValid || isSubmitting} className='btn btn-danger'
                                            type = 'submit' >Delete</button>
                                    </Form>
                                )}
                            </Formik>
                            
                            <hr />

                            <div>
                                <Link to="/modelfiles">Return Index</Link> |
                                <Link to={`/modelfile/${id}`}>Details</Link>
                            </div>

                        </Tab>
                        
                        <Tab eventKey="thumbnail" title="Thumbnail" >
                            <EditModelfileEyecatch />
                        </Tab>
                        
                        <Tab eventKey="animation" title="Animation" >
                            <div>
                                <input type="checkbox" defaultChecked={isMExecAnimation} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setIsMExecAnimation(event.target.checked)}/>
                                <label>Display Action</label>
                            </div>


                            <div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Index</th>
                                            <th>No</th>
                                            <th>Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        partAnimationClips.map((x,index)=>(

                                            <tr>
                                                <td>{index}</td>
                                                <td>{x.no}</td>
                                                <td>{x.name}</td>
                                            </tr>
                                        ))
                                    }
                                    
                                    </tbody>
                                </table>
                            </div>

                            <div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Index</th>
                                            <th>Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        animations.map((x,index)=>(

                                            <tr>
                                                <td>{index}</td>
                                                <td>{x.name}</td>
                                            </tr>
                                            ))
                                    }
                                    
                                    </tbody>
                                </table>
                            </div>
                            <button 
                                type = 'submit'
                                className={"btn btn-primary"}
                                onClick={()=>{handleFormSubmitResetAnimationClipArray()}} 
                            >
                                {"Reset Model Action Array"}
                            </button>

                        </Tab>

                        
                        <Tab eventKey="references" title="References" >
                            <div>
                
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>
                                                ID.
                                            </th>
                                            <th>
                                                Article Title
                                            </th>
                                            <th>
                                                Article Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            
                                            selectedModelfile && selectedModelfile.article_references.map(x=>(
                                                <tr key={x.id_article}>
                                                    <td>{x.id_article}</td>
                                                    <td><Link to={`/articleedit/${Number(x.id_article)}`}>{x.title}</Link></td>
                                                    <td>{x.status_name}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </Tab>

                    </Tabs>
                </Col>
            </Row>



        </div>
    )
})