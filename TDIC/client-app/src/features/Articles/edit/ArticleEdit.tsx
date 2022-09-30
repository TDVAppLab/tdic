import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Form, Row, Tab, Tabs } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import DebugDisplay from "../common/DebugDisplay";
import EdiaAnnotationDisplay from "./EditAnnotationDisplay";
import EditAnnotation from "./EditAnnotation";
import EdiaInstruction from "./EditInstruction";
import EditView from "./EditView";
import EditLightList from "./EditLightList";
import EditLight from "./EditLight";
import EditArticleSub from "./EditArticleSub";
import EditViewList from "./EditViewList";
import ModelScreen from "../common/modelscreen/ModelScreen";
import EditEyecatch from "./EditEyecatch";
import DisplayHtmlSubtitles from "../common/modelscreen/DisplayHtmlSubtitles";
import SubtitleSelector from "../common/SubtitleSelector";
import ListupSubtitles from "./ListupSubtitles";
import EditInstanceDisplay from "./EditInstanceDisplay";
import PanelInstruction from "../details/PanelInstruction";
import InstructionSelector from "../details/InstructionSelector";
import EditInstanceobject from "./EditInstanceobject";




export default observer( function ArticleEdit() {

    
    const {id} = useParams<{id:string}>();

    const [isEditmode, setIsEditmode] = useState(false); //編集モードかどうか
    const [isMotiondisplayMode, setIsMotiondisplayMode] = useState(false); //動画撮影モードかどうか
    const [isAutoAnimationExec, setIsAutoAnimationExec] = useState(true); //アニメーション自動実行モードかどうか

    const [isDataLoading, setIsDataLoading]= useState<boolean>(true);

    const {articleStore} = useStore();
    const {selectedArticle : article, loadArticle, loading : isArticleLoading} = articleStore;
    
    const {instructionStore} = useStore();
    const {loadInstructions, selectedInstruction, loading : isInstructionLoading, id_article : instructionId_article} = instructionStore;

    const {instanceobjectStore} = useStore();
    const {instanceobjectRegistry, loadInstanceobjects, loading : isInstanceobjectLoading, id_article : instanceobjectId_article} = instanceobjectStore;
    
    const {viewStore} = useStore();
    const {loadViews, setselectedView, loading : isViewLoading, id_article : viewId_article} = viewStore;
    
    const {annotationStore} = useStore();
    const {loadAnnotations, loading : isAnnotationLoading, id_article : annotationId_article} = annotationStore;
    
    const {annotationDisplayStore} = useStore();
    const {loadAnnotationDisplays, setSelectedAnnotationDisplayMap, selectedAnnotationDisplayMap, loading : isAnnotationDisplayLoading, id_article : annotationDisplayId_article} = annotationDisplayStore;
    
    const {lightStore} = useStore();
    const {loadLights, loading : isLightLoading, id_article : lightId_article} = lightStore;
    
    const {sceneInfoStore} = useStore();
    



    useEffect(() => { 
        if(id) {
            setIsDataLoading(
                article?.id_article != Number(id)
            || instructionId_article != Number(id)
            || viewId_article != Number(id) 
            || instanceobjectId_article != Number(id)
            || lightId_article != Number(id) 
            || annotationId_article != Number(id) 
            || annotationDisplayId_article != Number(id) 
            );
        } else {
            setIsDataLoading(false);
        }

    },[article?.id_article, instructionId_article, viewId_article, instanceobjectId_article, lightId_article, annotationId_article, annotationDisplayId_article])


    useEffect(()=> {
        selectedInstruction && setselectedView(selectedInstruction.id_view);
        selectedInstruction && setSelectedAnnotationDisplayMap(selectedInstruction.id_instruct);

    }, [selectedInstruction])

    useEffect(()=> {

        if((instructionId_article == Number(id)) && (viewId_article == Number(id)))  {
        selectedInstruction && setselectedView(selectedInstruction.id_view);
        }
        
    }, [instructionId_article,viewId_article])

    useEffect(()=> {

        if(id) {
            loadArticle(Number(id));
            loadInstanceobjects(Number(id));
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
                        id && (<div style={{aspectRatio: '16 / 7.5'}} ><ModelScreen  isEditmode={isEditmode} isAutoAnimationExec={isAutoAnimationExec}/></div>)
                    }
                        <DisplayHtmlSubtitles fontSize={'2em'}/>
                        
                        <InstructionSelector />

                        <SubtitleSelector />
                        
                        <div>
                            <input type="checkbox" checked={sceneInfoStore.is_automatic_camera_rotate} onChange={(event: React.ChangeEvent<HTMLInputElement>) => sceneInfoStore.setIsAutomaticCameraRotate(event.target.checked)}/>
                            <label>Camera Auto Moving</label>
                        </div>

                    </Col>
                    <Col  sm={isMotiondisplayMode ? 5 : 6} >
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
                                        <PanelInstruction />
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
                                    instanceobjectRegistry.size > 0 && <EditInstanceobject />
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
                                    <input type="checkbox" defaultChecked={isAutoAnimationExec} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setIsAutoAnimationExec(event.target.checked)}/>
                                    <label>Automatic Animation Exec</label>
                                </div>
                                <DebugDisplay />
                            </Tab>

                        </Tabs>
                    </Col>
                </Row>
        </>


    )
})