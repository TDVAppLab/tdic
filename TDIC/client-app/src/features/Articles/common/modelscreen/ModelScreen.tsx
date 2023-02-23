import { Canvas } from '@react-three/fiber';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useStore } from '../../../../app/stores/store';
import { OrbitControls } from '@react-three/drei';
import { Color, LinearEncoding, NoToneMapping, PMREMGenerator, Quaternion, sRGBEncoding, Vector3 } from 'three';
import ShowAnnotation from './ShowAnnotation/ShowAnnotation';
import UpdateCameraWork from './CameraControl/UpdateCameraWork';
import SceneInfoCatcher from './SceneInfoCatcher';
import GetSceneCapture from './SceneCapture/GetSceneCapture';
import ShowOrbitInfo from './ShowOrbitInfo';
import UpdateInstanceVisivility from './SetVisivility/UpdateInstanceVisivility';
import ShowActionUseInstructionSettings from './ShowAction/ShowActionUseInstructionSettings';
import ShowActionofSettedModel from './ShowAction/ShowActionofSettedModel';
import ModelScreenControlPanel from './ModelScreenControlPanel';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import LoadModels from './ModelLoading/LoadModels';
import SetLights from './Lighting/SetLights';



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
          }} 
      >
      {
      // Show the control panel only in Edit Mode (Edit Modeの場合のみコントロールパネルを表示する)
      isEditmode && <ModelScreenControlPanel />
      }
      <SetLights />
      <LoadModels />
      {
        selectedView && <UpdateCameraWork view={selectedView} isModeTransport={sceneInfoStore.mode_transport} step={100}/>
      }

      <OrbitControls
        enableDamping={false}
        attach="orbitControls"
        autoRotate={sceneInfoStore.is_automatic_camera_rotate}
        autoRotateSpeed={1}
        makeDefault
      />

      <ShowAnnotation
        annotationMap={annotationRegistry}
        annotationDisplayMap={selectedAnnotationDisplayMap}
        selectedAnnotationId = {selectedAnnotation?.id_annotation}
        setSelectedAnnotationPosMoved={setSelectedAnnotationPosMoved}
        isShowSelectedAnnotationDetailOnScreen={isShowSelectedAnnotationDetailOnScreen}
      />

      {/*編集モードの場合はオービットコントロールの各情報をCanvasに表示する*/}
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