import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import PanelInstruction from "./PanelInstruction";


import DebugDisplay from "../common/DebugDisplay";
import GoogleAd from "../../../app/common/utils/GoogleAd";
import ModelScreen from "../common/modelscreen/ModelScreen";




export default observer( function ArticleDetails() {

    
    const {id} = useParams<{id:string}>();

    const [descriptionAreaHeight, setDescriptionAreaHeight] = useState(0);
    
    const {userStore: {user}} = useStore();

    const {articleStore} = useStore();
    const {selectedArticle : article, loadArticle, loading : isArticleLoading} = articleStore;
    
    const {instructionStore} = useStore();
    const {loadInstructions, selectedInstruction, setSelectedInstruction, instructionRegistry, loading : isInstructionLoading} = instructionStore;


    const {instancepartStore} = useStore();
    const {loadInstanceparts, loading : isInstancepartLoading} = instancepartStore;
    
    const {viewStore} = useStore();
    const {loadViews, setselectedView, loading : isViewLoading} = viewStore;
    
    const {annotationStore} = useStore();
    const {loadAnnotations, loading : isAnnotationLoading} = annotationStore;
    
    const {annotationDisplayStore} = useStore();
    const {loadAnnotationDisplays, setSelectedAnnotationDisplayMap, loading : isAnnotationDisplayLoading} = annotationDisplayStore;
    
    const {lightStore} = useStore();
    const {loadLights, loading : isLightLoading} = lightStore;
    
    const {sceneInfoStore} = useStore();
//    const {loadLights, loading : isLightLoading} = lightStore;

        
    const [isDataLoading, setIsDataLoading]= useState<boolean>(true);
    
    
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        
        if(ref.current){
            setDescriptionAreaHeight(document.documentElement.clientHeight - ref.current.getBoundingClientRect().top);
        }
    })

    useEffect(() => {

        setIsDataLoading(
               isArticleLoading 
            || isInstructionLoading
            || isViewLoading 
            || isInstancepartLoading 
            || isLightLoading 
            || isAnnotationLoading 
            || isAnnotationDisplayLoading
            );
        
    },[isArticleLoading, isInstructionLoading, isViewLoading, isInstancepartLoading, isLightLoading, isAnnotationLoading, isAnnotationDisplayLoading])


    useEffect(()=> {
        selectedInstruction && setselectedView(selectedInstruction.id_view);
        selectedInstruction && setSelectedAnnotationDisplayMap(selectedInstruction.id_instruct);

    }, [selectedInstruction])

    useEffect(()=> {

        if(!isInstructionLoading && !isViewLoading)  {
        selectedInstruction && setselectedView(selectedInstruction.id_view);
        }
        
    }, [isInstructionLoading,isViewLoading])
    

    useEffect(()=> {

        if(id) {
            loadArticle(Number(id)).then(x=>{x && loadInstanceparts(x?.id_assy)});
            loadInstructions(Number(id));
            loadViews(Number(id));
            loadAnnotations(Number(id));
            loadLights(Number(id));
            loadAnnotationDisplays(Number(id));
        }

    }, [id])



    if(isDataLoading) return (<LoadingComponent />);
    

    const handleInputChangeInstruction=(id_instruct: number) => {
        setSelectedInstruction(id_instruct);
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        sceneInfoStore.setIsAutomaticCameraRotate(event.target.checked);
    }

    return (
        <>
            <h2>{
            article?.title
            }</h2>

                <Row>
                    <Col sm={8}>
                    {
                        id && (<div style={{height: '64vh', width: '64vw'}} ><ModelScreen  isEditmode={false} /></div>)
                        //<ModelScreen height="64vh" width='64vw' isEditmode={false} />
                    }
                        <div>
                            {
                                Array.from(instructionRegistry.values()).map(x=>(
                                    <button key={x.id_instruct}
                                        type = 'submit'
                                        className={x.id_instruct==selectedInstruction?.id_instruct ? "btn btn-primary" : "btn btn-outline-primary"}
                                        onClick={()=>{handleInputChangeInstruction(x.id_instruct)}} 
                                    >
                                        {x.title}
                                    </button>
                                ))
                            }
                        </div>
                        <div>
                            <input type="checkbox" defaultChecked={sceneInfoStore.is_automatic_camera_rotate} onChange={handleChange}/>
                            <label>Camera Auto Moving</label>
                        </div>
                        <GoogleAd pid={process.env.REACT_APP_GOOGLE_ADSENSE_PUBLISHER_ID!} uid={process.env.REACT_APP_GOOGLE_ADSENSE_UNIT_ID!} />
                    </Col>
                    <Col   sm={4}>
                        <Tabs defaultActiveKey="instruction" id="uncontrolled-tab-example" className="mb-3">
                            <Tab eventKey="instruction" title="Instruction">
                                <div ref={ref} className="overflow-auto" style={{'height':`${descriptionAreaHeight}px`}}>
                                    {
                                        selectedInstruction && <PanelInstruction instruction={selectedInstruction} />
                                    }
                                </div>
                            </Tab>
                            <Tab eventKey="profile" title="Material">
                            </Tab>
                            {
                                user &&
                                <Tab eventKey="edit" title="Edit">
                                    <Link to={`/articleedit/${Number(article?.id_article)}`}>Edit</Link> 
                                    <hr />
                                    <p>{descriptionAreaHeight}</p>
                                    <hr />
                                    <DebugDisplay />
                                </Tab>
                            }
                        </Tabs>
                    </Col>
                </Row>
        </>


    )
})