import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useStore } from '../../../../app/stores/store';
import { OrbitControls } from '@react-three/drei';
import THREE, { Color, Vector3 } from 'three';
import LoadModel from './LoadModel';
import SetLight from './SetLight';
import ShowAnnotation from './ShowAnnotation';
import UpdateCameraWork from './UpdateCameraWork';
import SceneInfoCatcher from './SceneInfoCatcher';
import { Effects } from './Effect';
import { Lights } from './Lights';
import GetSceneCapture from './GetSceneCapture';
import AutomaticCameraMove from './AutomaticCameraMove';
import ShowOrbitInfo from './ShowOrbitInfo';
import UpdateInstanceVisivility from './UpdateInstanceVisivility';
import ShowActionUseInstructionSettings from './ShowActionUseInstructionSettings';
import ShowActionofSettedModel from './ShowActionofSettedModel';


// ref https://codesandbox.io/s/draggable-mesh-rgn91?file=/src/App.tsx:900-940
//https://qiita.com/nemutas/items/c49728da8641ee28fd2e
//https://codesandbox.io/embed/react-three-fiber-suspense-zu2wo



interface Props {
  //width : string;
  //height : string;
  isEditmode : boolean
  isAutoAnimationExec : boolean;
}

export default observer( function ModelScreen({isEditmode, isAutoAnimationExec}: Props) {

  const [isDebugMode, setIsDebugMode] = useState(false);
  
  const { articleStore } = useStore();
  const { selectedArticle } = articleStore;

  const { viewStore } = useStore();
  const { selectedView } = viewStore;
  
  const { annotationStore } = useStore();
  const { annotationRegistry, selectedAnnotation } = annotationStore;
    
  const {instructionStore} = useStore();
  const {selectedInstruction,  loading : isInstructionLoading} = instructionStore;
  
  const {annotationDisplayStore} = useStore();
  const {selectedAnnotationDisplayMap } = annotationDisplayStore;

  const { instanceobjectStore } = useStore();
  const { instanceobjectRegistry } = instanceobjectStore;
  
  const { lightStore } = useStore();
  const { lightRegistry } = lightStore;
  
  const { sceneInfoStore } = useStore();
  const { setModeTransport } = sceneInfoStore;
  


  useEffect(()=> {
    setModeTransport(true);
    sceneInfoStore.setIsAutomaticCameraRotate(selectedInstruction ? selectedInstruction.is_automatic_camera_rotate : false);
  }, [selectedInstruction])

useEffect(()=> {
}, [sceneInfoStore.is_automatic_camera_rotate])

  return (
      <Canvas
        gl={{ 
          antialias: true, 
          //toneMapping: NoToneMapping 
        }}
        onCreated={({ gl, scene }) => {
          //gl.toneMapping = THREE.ACESFilmicToneMapping
          //gl.outputEncoding = THREE.sRGBEncoding
          scene.background = new Color(selectedArticle?.bg_c)
        }}
        linear={!selectedArticle?.gammaOutput}        
        camera={{ 
          fov:45
          ,position:[3,3,3]
          ,near:1
          ,far:6350000
          }} >
        {
          Array.from(lightRegistry.values()).map(x=>(<SetLight key={x.id_light} light={x} />))
        }
        {
          Array.from(instanceobjectRegistry.values()).map(x=>(<LoadModel key={x.id_instance} id_inst={x.id_instance} id_part={x.id_part} pos={new Vector3(x.pos_x, x.pos_y, x.pos_z)} scale={x.scale}/>))
        }
        {
          selectedView && <UpdateCameraWork view={selectedView} isModeTransport={sceneInfoStore.mode_transport} step={100}/>
        }
        <OrbitControls enableDamping={false} attach="orbitControls" />

        { isDebugMode && <axesHelper args={[2]}/> }
        {
          <ShowAnnotation annotationMap={annotationRegistry} annotationDisplayMap={selectedAnnotationDisplayMap} selectedAnnotationId = {selectedAnnotation?.id_annotation}/>
        }
        <AutomaticCameraMove isModeTransport={sceneInfoStore.is_automatic_camera_rotate} />
        {
          isEditmode && <ShowOrbitInfo />
        }
        <UpdateInstanceVisivility />

        
			{/* lights */}
			{
				//<Lights />
			}
      {
      //  <Effects />
      }
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