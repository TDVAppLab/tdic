import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../app/stores/store';


interface Props{
  isModeTransport : boolean;
}


export default observer( function AutomaticCameraMove({isModeTransport}: Props)  {
    const camera = useThree((state) => state.camera);
    const { scene } = useThree();
    const orbitControls = ((scene as any).orbitControls as any);  
  

    let vector_x : number;
    let vector_z : number;


    const d_rad = - 2.0 * 3.14 / 6000.0;
  
  
    useFrame(state => {
            
        if(isModeTransport){
            if(orbitControls){
                vector_x = camera.position.x - orbitControls.target.x;
                vector_z = camera.position.z - orbitControls.target.z;
                camera.position.set(orbitControls.target.x + vector_x * Math.cos(d_rad) - vector_z * Math.sin(d_rad), camera.position.y, orbitControls.target.z + vector_z * Math.cos(d_rad) + vector_x * Math.sin(d_rad));
            }
        }

    })

  return (null);
});