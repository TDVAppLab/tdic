import { Canvas } from '@react-three/fiber';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useStore } from '../../../../app/stores/store';
import { OrbitControls } from '@react-three/drei';
import { Color, LinearEncoding, NoToneMapping, PMREMGenerator, Quaternion, sRGBEncoding, Vector3 } from 'three';
import LoadModel from './ModelLoading/LoadModel';
import SetLight from './Lighting/SetLight';
import ShowAnnotation from './ShowAnnotation/ShowAnnotation';
import UpdateCameraWork from './CameraControl/UpdateCameraWork';
import SceneInfoCatcher from './SceneInfoCatcher';
import GetSceneCapture from './SceneCapture/GetSceneCapture';
import AutomaticCameraMove from './CameraControl/AutomaticCameraMove';
import ShowOrbitInfo from './ShowOrbitInfo';
import UpdateInstanceVisivility from './SetVisivility/UpdateInstanceVisivility';
import ShowActionUseInstructionSettings from './ShowAction/ShowActionUseInstructionSettings';
import ShowActionofSettedModel from './ShowAction/ShowActionofSettedModel';
import ModelScreenControlPanel from './ModelScreenControlPanel';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';



// ref https://codesandbox.io/s/draggable-mesh-rgn91?file=/src/App.tsx:900-940
//https://qiita.com/nemutas/items/c49728da8641ee28fd2e
//https://codesandbox.io/embed/react-three-fiber-suspense-zu2wo



interface Props {
  isEditmode : boolean
  isAutoAnimationExec : boolean;
}

export default observer( function ModelScreen({isEditmode, isAutoAnimationExec}: Props) {

  
  const { articleStore } = useStore();
  const { selectedArticle } = articleStore;

  const { viewStore } = useStore();
  const { selectedView } = viewStore;
  
  const { annotationStore } = useStore();
  const { annotationRegistry, selectedAnnotation, setSelectedAnnotationPosMoved, isShowSelectedAnnotationDetailOnScreen } = annotationStore;
    
  const {instructionStore} = useStore();
  const {selectedInstruction} = instructionStore;
  
  const {annotationDisplayStore} = useStore();
  const {selectedAnnotationDisplayMap } = annotationDisplayStore;

  const { instanceobjectStore } = useStore();
  const { instanceobjectRegistry } = instanceobjectStore;
  
  const { lightStore } = useStore();
  const { lightRegistry } = lightStore;
  
  const { sceneInfoStore } = useStore();
  const { setModeTransport } = sceneInfoStore;
  


  useEffect(()=> {
    sceneInfoStore.setIsAutomaticCameraRotate(selectedInstruction ? selectedInstruction.is_automatic_camera_rotate : false);
  }, [selectedInstruction])

  
  useEffect(()=> {
    setModeTransport(true);
  }, [selectedView, selectedInstruction])

useEffect(()=> {
}, [sceneInfoStore.is_automatic_camera_rotate])

  return (
      <Canvas
        gl={{ 
          antialias: true, 
          outputEncoding : selectedArticle?.outputEncoding ? selectedArticle.outputEncoding : LinearEncoding,
          toneMapping: selectedArticle?.toneMapping ? selectedArticle.toneMapping : NoToneMapping,
        }}
        onCreated={({ gl, scene }) => {
          gl.toneMappingExposure = Math.pow(2, selectedArticle?.exposure ? selectedArticle.exposure : 0.0);
          
          if(selectedArticle?.environment==='Neutral'){
            scene.environment =  new PMREMGenerator(gl).fromScene( new RoomEnvironment() ).texture
          } else {
            scene.environment = null
          }

          scene.background = new Color(selectedArticle?.bg_color ? selectedArticle.bg_color : "#ffffff")
        }}
        //linear={selectedArticle?.gammaOutput}        
        //flat={true}    
        camera={{ 
          fov:45
          ,position:[3,3,3]
          ,near:1
          ,far:6350000
          }} >
          { isEditmode && <ModelScreenControlPanel /> }
        {
          Array.from(lightRegistry.values()).map(x=>(<SetLight key={x.id_light} light={x} />))
        }
        {
          Array.from(instanceobjectRegistry.values()).map(x=>(<LoadModel key={x.id_instance} id_inst={x.id_instance} id_part={x.id_part} pos={new Vector3(x.pos_x, x.pos_y, x.pos_z)} scale={x.scale} quaternion={new Quaternion(x.quaternion_x, x.quaternion_y, x.quaternion_z, x.quaternion_w)}/>))
        }
        {
          selectedView && <UpdateCameraWork view={selectedView} isModeTransport={sceneInfoStore.mode_transport} step={100}/>
        }
        <OrbitControls enableDamping={false} attach="orbitControls" makeDefault />

        {
          <ShowAnnotation annotationMap={annotationRegistry} annotationDisplayMap={selectedAnnotationDisplayMap} selectedAnnotationId = {selectedAnnotation?.id_annotation} setSelectedAnnotationPosMoved={setSelectedAnnotationPosMoved} isShowSelectedAnnotationDetailOnScreen={isShowSelectedAnnotationDetailOnScreen} />
        }
        <AutomaticCameraMove isModeTransport={sceneInfoStore.is_automatic_camera_rotate} />
        {
          isEditmode && <ShowOrbitInfo />
        }
        <UpdateInstanceVisivility />

       
      {
        isAutoAnimationExec && <ShowActionofSettedModel isActiondisplayMode={isAutoAnimationExec} />
      }
      {
        !isAutoAnimationExec && <ShowActionUseInstructionSettings isActiondisplayMode={false} />
      }
      
        {<SceneInfoCatcher />}
        {
          <GetSceneCapture />
        }
      </Canvas>
  );
});