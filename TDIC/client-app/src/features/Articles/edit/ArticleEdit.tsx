import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
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
import DisplayHtmlSubtitles from "../common/modelscreen/Subtitles/DisplayHtmlSubtitles";
import SubtitleSelector from "../common/SubtitleSelector";
import ListupSubtitles from "./ListupSubtitles";
import EditInstanceDisplay from "./EditInstanceDisplay";
import PanelInstruction from "../details/PanelInstruction";
import InstructionSelector from "../details/InstructionSelector";
import EditInstanceobject from "./EditInstanceobject";
import MaterialDisplay from "../common/MaterialDisplay";
import "./ArticleEditorStyles.css"




export default observer( function ArticleEdit() {

    
    const {id} = useParams<{id:string}>();

    const [isEditmode, setIsEditmode] = useState(true); //編集モードかどうか
    const [isMotiondisplayMode, setIsMotiondisplayMode] = useState(false); //動画撮影モードかどうか
    const [isAutoAnimationExec, setIsAutoAnimationExec] = useState(false); //アニメーション自動実行モードかどうか
    const [isSubtitleMode, setIsSubtitleMode] = useState(false); //動画撮影モードかどうか

    const [isDataLoading, setIsDataLoading]= useState<boolean>(true);

    const {articleStore} = useStore();
    const {selectedArticle : article, loadArticle} = articleStore;
    
    const {instructionStore} = useStore();
    const {loadInstructions, selectedInstruction, id_article : instructionId_article} = instructionStore;

    const {instanceobjectStore} = useStore();
    const {loadInstanceobjects, id_article : instanceobjectId_article} = instanceobjectStore;
    
    const {viewStore} = useStore();
    const {loadViews, setselectedView, id_article : viewId_article} = viewStore;
    
    const {annotationStore} = useStore();
    const {loadAnnotations, id_article : annotationId_article} = annotationStore;
    
    const {annotationDisplayStore} = useStore();
    const {loadAnnotationDisplays, setSelectedAnnotationDisplayMap, selectedAnnotationDisplayMap, id_article : annotationDisplayId_article} = annotationDisplayStore;
    
    const {lightStore} = useStore();
    const {loadLights, id_article : lightId_article} = lightStore;
    
    const {sceneInfoStore} = useStore();
    



    useEffect(() => { 
        if(id) {
            setIsDataLoading(
                article?.id_article !== id
            || instructionId_article !== id
            || viewId_article !== id
            || instanceobjectId_article !== id
            || lightId_article !== id
            || annotationId_article !== id
            || annotationDisplayId_article !== id
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

        if((instructionId_article === id) && (viewId_article === id))  {
        selectedInstruction && setselectedView(selectedInstruction.id_view);
        }
        
    }, [instructionId_article,viewId_article])

    useEffect(()=> {

        if(id) {
            loadArticle(id);
            loadInstanceobjects(id);
            loadInstructions(id);
            loadViews(id);
            loadAnnotations(id);
            loadLights(id);
            loadAnnotationDisplays(id);
        } else {
            loadArticle("");
            loadInstanceobjects("");
            loadInstructions("");
            loadViews("");
            loadAnnotations("");
            loadLights("");
            loadAnnotationDisplays("");
        }

    }, [id])


    if(isDataLoading) return (<><LoadingComponent /><DebugDisplay /></>);
    

    return (
        <>

                <Row>
                    
                    { id &&
                    <Col style={{ 
                        width: isMotiondisplayMode ? 1280 : undefined
                        }} sm={6} >
                        {id && <h2>{article?.title}</h2> }

                        <div style={{aspectRatio: '16 / 9', position: "relative"}} >
                            <ModelScreen  isEditmode={isEditmode} isAutoAnimationExec={isAutoAnimationExec}/>
                            { isSubtitleMode && <DisplayHtmlSubtitles fontSize={'2em'}/> }
                        </div>

                        
                        <InstructionSelector />

                        { isSubtitleMode && <SubtitleSelector /> }

                        <SetChecker Val={sceneInfoStore.is_automatic_camera_rotate} ValSettingFunction={sceneInfoStore.setIsAutomaticCameraRotate} LabelString="Camera Auto Moving" />
                    </Col>
                    }

                    <Col className={`colsetting`}>
                        <Tabs defaultActiveKey={id ? "instruction" : "base"} id="article-editor-main-tab" className="mb-3">
                            {id && 

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
                            }

                            { id &&
                            <Tab eventKey="objects" title="Objects">
                                <Tabs defaultActiveKey="view" id="objects-editor-sub-tab" className="mb-3">
                                    <Tab eventKey="view" title="View">
                                        <EditView /> 
                                        <hr />
                                        <EditViewList /> 
                                    </Tab>
                                    
                                    <Tab eventKey="annotation" title="Annotation" >
                                        {
                                            //<EdiaAnnotationDisplay />
                                        }
                                        <EditAnnotation />
                                    </Tab>
                                    
                                    <Tab eventKey="light" title="Light" >
                                        <EditLight /> 
                                        <hr />
                                        <EditLightList /> 
                                    </Tab>

                                    <Tab eventKey="instance" title="Instance" >
                                        <EditInstanceobject />
                                    </Tab>
                                </Tabs>
                            </Tab>
                            }

                            <Tab eventKey="base" title="Base">
                                <Tabs defaultActiveKey="articleBase" id="base-editor-sub-tab" className="mb-3">
                                    <Tab eventKey="articleBase" title="Article Base" >
                                        <EditArticleSub /> 
                                    </Tab>
                                    

                                    { id &&
                                    <Tab eventKey="thumbnail" title="Thumbnail" >
                                        <EditEyecatch />
                                    </Tab>
                                    }

                                    { id &&
                                    <Tab eventKey="materials" title="Materials" >
                                        <MaterialDisplay />
                                    </Tab>
                                    }
                                </Tabs>
                            </Tab>


                            { id &&
                            <Tab eventKey="info" title="info" >
                                <Link to={`/article/${article?.id_article}`}>Details</Link> 
                                <hr />

                                <SetChecker Val={isEditmode} ValSettingFunction={setIsEditmode} LabelString="Edit Mode" />
                                <SetChecker Val={isMotiondisplayMode} ValSettingFunction={setIsMotiondisplayMode} LabelString="Display Mode" />
                                <SetChecker Val={isAutoAnimationExec} ValSettingFunction={setIsAutoAnimationExec} LabelString="Automatic Animation Exec" />
                                <SetChecker Val={isSubtitleMode} ValSettingFunction={setIsSubtitleMode} LabelString="Subtitle Mode" />
                                
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


//https://awesome-linus.com/2020/01/10/react-props-function-type/
type MyFunctionType = (state: boolean) => void;


interface Props {
    Val: boolean;
    ValSettingFunction: React.Dispatch<React.SetStateAction<boolean>> | MyFunctionType;
    LabelString: string;
  }
  
 const SetChecker = ({Val, ValSettingFunction, LabelString}: Props) => {
    
        

    return (

        <div>
            <input type="checkbox" defaultChecked={Val} onChange={(event: React.ChangeEvent<HTMLInputElement>) => ValSettingFunction(event.target.checked)}/>
            <label>{LabelString}</label>
        </div>
    )
}