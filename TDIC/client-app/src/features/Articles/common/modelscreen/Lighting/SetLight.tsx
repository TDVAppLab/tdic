import { Light } from '../../../../../app/models/Light';


import { Lights } from './Lights';


/*
extend({ Lensflare, LensflareElement });



// 
declare global {
    namespace JSX {
      interface IntrinsicElements {
        lensflare: ReactThreeFiber.Node<Lensflare, typeof Lensflare>
        lensflareElement: ReactThreeFiber.Node<LensflareElement, typeof LensflareElement>
      }
    }
  }
*/

interface Props {
    light:Light;
}

const SetLight  = ({light}: Props) => {

  
    if(light.light_type==='DirectionalLight'){
        return (
            <directionalLight intensity={light.intensity} position={[light.px, light.py, light.pz]} />
        )
    }else if(light.light_type==='AmbientLight'){
        return (
            <ambientLight intensity={light.intensity*0.3} />
        )
    }else if(light.light_type==='PointLight'){

        return <Lights size={light.lfsize*3} position={ [light.px, light.py, light.pz] }/>;
    }

    return (
        null
    )
}  


  export default SetLight;