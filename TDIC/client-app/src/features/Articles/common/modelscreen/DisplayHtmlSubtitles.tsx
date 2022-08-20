import "./stylesSubtitles.css"
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../app/stores/store';


export default observer( function DisplayHtmlSubtitles() {
    
    
    const {instructionStore} = useStore();
    const {selectedSubtitles, selectedSubtitleIndex} = instructionStore;
  
  
  return (
        <>
        <div
              className={ `html-subtitle` }>                            
            <p>{selectedSubtitles[selectedSubtitleIndex]}</p>
        </div>
        </>
    )
})
