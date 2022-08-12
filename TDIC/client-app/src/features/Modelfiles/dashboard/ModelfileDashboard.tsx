import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import ModelfileList from './ModelfileList';

export default observer(function ModelfileDashboard() {

    const [isExcludeUsed, setIsExcludeUsed] = useState(false);


    const {modelfileStore} = useStore();
    const {loadModelfiles, ModelfileRegistry} = modelfileStore;
  
    useEffect(() => {
        loadModelfiles(isExcludeUsed);
    },[])
  
    useEffect(() => {
        loadModelfiles(isExcludeUsed);
    },[isExcludeUsed])


    useEffect(() => {
        if(ModelfileRegistry.size <= 1) loadModelfiles(isExcludeUsed);
    },[ModelfileRegistry.size, loadModelfiles])


    
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setIsExcludeUsed(event.target.checked);
    }
  
  
    if(modelfileStore.loading) return <LoadingComponent content='Loading modelfiles...' />



    return(
        <Container>
            <Link to={`/modelfilecreate`}>
                <h3 >Create</h3>
            </Link>
            <hr />
            
            <div className="App">
                <input type="checkbox" defaultChecked={isExcludeUsed} onChange={handleChange}/>
                <label>Exclude Used Models</label>
            </div>
            
            <ModelfileList />
        </Container>

    )
})