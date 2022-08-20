import "./stylesSubtitles.css"
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../app/stores/store';


export default observer( function DisplayHtmlSubtitles() {
    
    
    const {instructionStore} = useStore();
    const {selectedSubtitles, selectedSubtitleIndex} = instructionStore;
  
  
  return (
        <>
        <div style={{aspectRatio: '16 / 1'}}
              className={ `html-subtitle` }>                            
            <p>{selectedSubtitles[selectedSubtitleIndex]}</p>
        </div>
        </>
    )
})
