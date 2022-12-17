import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";


import DebugDisplay from "../common/DebugDisplay";
import GoogleAd from "../../../app/common/utils/GoogleAd";
import ModelScreen from "../common/modelscreen/ModelScreen";
import PanelInstruction from "./PanelInstruction";
import InstructionSelector from "./InstructionSelector";
import agent from "../../../app/api/agent";
import MaterialDisplay from "../common/MaterialDisplay";




export default observer( function ArticleDetails() {

    
    const {id} = useParams<{id:string}>();

    const {siteAnalyticsStore} = useStore();
    
    const {userStore: {user}} = useStore();

    const {articleStore} = useStore();
    const {selectedArticle : article, loadArticle, loading : isArticleLoading} = articleStore;
    
    const {instructionStore} = useStore();
    const {loadInstructions, selectedInstruction, loading : isInstructionLoading} = instructionStore;


    const {instanceobjectStore} = useStore();
    const {loadInstanceobjects, loading : isInstanceobjectLoading} = instanceobjectStore;
    
    const {viewStore} = useStore();
    const {loadViews, setselectedView, loading : isViewLoading} = viewStore;
    
    const {annotationStore} = useStore();
    const {loadAnnotations, loading : isAnnotationLoading} = annotationStore;
    
    const {annotationDisplayStore} = useStore();
    const {loadAnnotationDisplays, setSelectedAnnotationDisplayMap, loading : isAnnotationDisplayLoading} = annotationDisplayStore;
    
    const {lightStore} = useStore();
    const {loadLights, loading : isLightLoading} = lightStore;
    
    const {sceneInfoStore} = useStore();
        
    const [isDataLoading, setIsDataLoading]= useState<boolean>(true);
    
    

    useEffect(() => {

        setIsDataLoading(
               article?.id_article !== id
            || isArticleLoading 
            || isInstructionLoading
            || isViewLoading 
            || isInstanceobjectLoading 
            || isLightLoading 
            || isAnnotationLoading 
            || isAnnotationDisplayLoading
            );
        
    },[isArticleLoading, isInstructionLoading, isViewLoading, isInstanceobjectLoading, isLightLoading, isAnnotationLoading, isAnnotationDisplayLoading])


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
            loadArticle(id);
            loadInstanceobjects(id);
            loadInstructions(id);
            loadViews(id);
            loadAnnotations(id);
            loadLights(id);
            loadAnnotationDisplays(id);
        }

    }, [id])



    if(isDataLoading) return (<LoadingComponent />);

    return (
        <>
            <h2>{article?.title}</h2>

                <Row>
                    <Col sm={8}>
                    {
                        id && (<div style={{height: '64vh', width: '64vw'}} ><ModelScreen  isEditmode={false}  isAutoAnimationExec={false}/></div>)
                        //<ModelScreen height="64vh" width='64vw' isEditmode={false} />
                    }
                        <InstructionSelector />
                        <div>
                            <input type="checkbox" checked={sceneInfoStore.is_automatic_camera_rotate} onChange={(event: React.ChangeEvent<HTMLInputElement>) => sceneInfoStore.setIsAutomaticCameraRotate(event.target.checked)}/>
                            <label>Camera Auto Moving</label>
                        </div>
                        <GoogleAd pid={siteAnalyticsStore.GoogleAdsensePublisherId!} uid={siteAnalyticsStore.GoogleAdsenseUnitId!} />
                    </Col>
                    <Col   sm={4}>
                        <Tabs defaultActiveKey="instruction" id="uncontrolled-tab-example" className="mb-3">
                            <Tab eventKey="instruction" title="Instruction">
                                <PanelInstruction />
                            </Tab>
                            <Tab eventKey="profile" title="Material">
                                <MaterialDisplay />
                            </Tab>
                            {
                                user &&
                                <Tab eventKey="edit" title="Edit">
                                    <Link to={`/articleedit/${article?.id_article}`}>Edit</Link> 
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