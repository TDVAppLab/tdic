import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Form, Row, Tab, Tabs } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import DebugDisplay from "../common/DebugDisplay";
import PanelInstruction from "../details/PanelInstruction";
import EdiaAnnotationDisplay from "./EditAnnotationDisplay";
import EditAnnotation from "./EditAnnotation";
import EdiaInstruction from "./EditInstruction";
import EditView from "./EditView";
import EditLightList from "./EditLightList";
import EditLight from "./EditLight";
import EditInstancepart from "./EditInstancepart";
import EditArticleSub from "./EditArticleSub";
import EditViewList from "./EditViewList";
import ModelScreen from "../common/modelscreen/ModelScreen";
import EditEyecatch from "./EditEyecatch";
import DisplayHtmlSubtitles from "../common/modelscreen/DisplayHtmlSubtitles";
import SubtitleSelector from "../common/SubtitleSelector";
import ListupSubtitles from "./ListupSubtitles";
import EditInstanceDisplay from "./EditInstanceDisplay";




export default observer( function ArticleEdit() {

    
    const {id} = useParams<{id:string}>();

    const [descriptionAreaHeight, setDescriptionAreaHeight] = useState(0);

    const [isEditmode, setIsEditmode] = useState(false);
    const [isMotiondisplayMode, setIsMotiondisplayMode] = useState(false);
    const [isActiondisplayMode, setIsActiondisplayMode] = useState(false);

    const [isDataLoading, setIsDataLoading]= useState<boolean>(true);

    const {articleStore} = useStore();
    const {selectedArticle : article, loadArticle, loading : isArticleLoading} = articleStore;
    
    const {instructionStore} = useStore();
    const {loadInstructions, selectedInstruction, setSelectedInstruction, instructionRegistry, loading : isInstructionLoading} = instructionStore;


    const {instancepartStore} = useStore();
    const {loadInstanceparts, instancepartRegistry, loading : isInstancepartLoading} = instancepartStore;
    
    const {viewStore} = useStore();
    const {loadViews, setselectedView, loading : isViewLoading} = viewStore;
    
    const {annotationStore} = useStore();
    const {loadAnnotations, loading : isAnnotationLoading} = annotationStore;
    
    const {annotationDisplayStore} = useStore();
    const {loadAnnotationDisplays, setSelectedAnnotationDisplayMap, selectedAnnotationDisplayMap, loading : isAnnotationDisplayLoading} = annotationDisplayStore;
    
    const {lightStore} = useStore();
    const {loadLights, loading : isLightLoading} = lightStore;
    
    const {sceneInfoStore} = useStore();
    

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(ref.current){
            //console.log("clientHeight : hight", document.documentElement.clientHeight );
            //console.log("current hight", ref.current.getBoundingClientRect().top);
            //console.log("size", document.documentElement.clientHeight - ref.current.getBoundingClientRect().top);
            setDescriptionAreaHeight(document.documentElement.clientHeight - ref.current.getBoundingClientRect().top);
        }
      });



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
            loadArticle(Number(id)).then(x=>{x && loadInstanceparts(x.id_assy)});
            loadInstructions(Number(id));
            loadViews(Number(id));
            loadAnnotations(Number(id));
            loadLights(Number(id));
            loadAnnotationDisplays(Number(id));
        } else {
        }

    }, [id])


    if(isDataLoading) return (<><LoadingComponent /><DebugDisplay /></>);
    

    return (
        <>
            {id && <h2>{article?.title}</h2> }

                <Row>
                    <Col style={{ 
                        width: isMotiondisplayMode ? 1280 : undefined
                        }} sm={6} >
                    {
                        id && (<div style={{aspectRatio: '16 / 7.5'}} ><ModelScreen  isEditmode={isEditmode} isActiondisplayMode={isActiondisplayMode}/></div>)
                    }
                        <DisplayHtmlSubtitles fontSize={'2em'}/>
                        <div>
                            { instructionRegistry.size>0 &&
                                Array.from(instructionRegistry.values()).map(x=>(
                                    <button key={x.id_instruct}
                                        type = 'submit'
                                        className={x.id_instruct==selectedInstruction?.id_instruct ? "btn btn-primary" : "btn btn-outline-primary"}
                                        onClick={()=>{setSelectedInstruction(x.id_instruct)}} 
                                    >
                                        {x.title}
                                    </button>
                                ))
                            }
                        </div>

                        <SubtitleSelector />
                        
                        <div>
                            <input type="checkbox" checked={sceneInfoStore.is_automatic_camera_rotate} onChange={(event: React.ChangeEvent<HTMLInputElement>) => sceneInfoStore.setIsAutomaticCameraRotate(event.target.checked)}/>
                            <label>Camera Auto Moving</label>
                        </div>

                    </Col>
                    <Col  sm={6} >
                        <Tabs defaultActiveKey="instruction" id="article-editor-main-tab" className="mb-3">

                            <Tab eventKey="instruction" title="Instruction">
                                <Tabs defaultActiveKey="edit_instruction" id="instruction-editor-sub-tab" className="mb-3">
                                    <Tab eventKey="edit_instruction" title="Edit Instruction">
                                        <EdiaInstruction />
                                    </Tab>
                                    <Tab eventKey="edit_instance_display" title="Edit Instance Display">
                                        <EditInstanceDisplay />
                                    </Tab>
                                    <Tab eventKey="show_instruction" title="Show Instruction">
                                        <div ref={ref} className="overflow-auto" style={{'height':`${descriptionAreaHeight}px`}}>
                                            {
                                                selectedInstruction && <PanelInstruction instruction={selectedInstruction} />
                                            }
                                        </div>
                                    </Tab>
                                    <Tab eventKey="show_subtitles" title="Show Subtitles">
                                        <ListupSubtitles />
                                    </Tab>
                                </Tabs>
                            </Tab>

                            <Tab eventKey="view" title="View">
                                {id && <EditView /> }
                                <hr />
                                {id && <EditViewList /> }
                            </Tab>

                            <Tab eventKey="annotation" title="Annotation" >
                                {id && <EditAnnotation /> }
                                {
                                    selectedAnnotationDisplayMap.size > 0 && <EdiaAnnotationDisplay />
                                }
                            </Tab>

                            <Tab eventKey="light" title="Light" >
                                {id && <EditLight /> }
                                <hr />
                                {id && <EditLightList /> }
                            </Tab>

                            <Tab eventKey="instance" title="Instance" >
                                {
                                    instancepartRegistry.size > 0 && <EditInstancepart />
                                }
                            </Tab>

                            <Tab eventKey="articleBase" title="Article Base" >
                                <EditArticleSub /> 
                            </Tab>

                            <Tab eventKey="thumbnail" title="Thumbnail" >
                                <EditEyecatch />
                            </Tab>

                            <Tab eventKey="materials" title="Materials" >
                                <p>abxxxxxx</p>
                            </Tab>

                            <Tab eventKey="info" title="info" >
                                <Link to={`/article/${Number(article?.id_article)}`}>Details</Link> 
                                <hr />
                                <div>
                                    <input type="checkbox" defaultChecked={isEditmode} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setIsEditmode(event.target.checked)}/>
                                    <label>Edit Mode</label>
                                </div>
                                <div>
                                    <input type="checkbox" defaultChecked={isMotiondisplayMode} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setIsMotiondisplayMode(event.target.checked)}/>
                                    <label>Display Mode</label>
                                </div>
                                <div>
                                    <input type="checkbox" defaultChecked={isActiondisplayMode} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setIsActiondisplayMode(event.target.checked)}/>
                                    <label>Show Action</label>
                                </div>
                                <p>Hight : {descriptionAreaHeight}</p>
                                <DebugDisplay />
                            </Tab>

                        </Tabs>
                    </Col>
                </Row>
        </>


    )
})