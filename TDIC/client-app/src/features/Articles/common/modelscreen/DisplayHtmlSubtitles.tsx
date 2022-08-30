import "./stylesSubtitles.css"
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../app/stores/store';


interface Props {
  fontSize: string;
}





export default observer( function DisplayHtmlSubtitles({fontSize}: Props) {
    
    
    const {instructionStore} = useStore();
    const {selectedSubtitles, selectedSubtitleIndex} = instructionStore;




  
  
  return (
        <>
        <div style={{aspectRatio: '16 / 1.5', fontSize: fontSize}}
              className={ `html-subtitle` }>                            
            <p>{selectedSubtitles[selectedSubtitleIndex]}</p>
        </div>
        </>
    )
})
