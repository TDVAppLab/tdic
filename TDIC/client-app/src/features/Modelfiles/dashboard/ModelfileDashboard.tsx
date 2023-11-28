import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import ModelfileList from './ModelfileList';
import { Modelfile } from '../../../app/models/ModelFile';
import agent from '../../../app/api/agent';

export default function ModelfileDashboard() {

    const [isExcludeUsed, setIsExcludeUsed] = useState(false);
    
    const [modelfiles, setModelfiles] = useState<Modelfile[]>();
  
    useEffect(() => {
        agent.Modelfiles.list(isExcludeUsed).then(modelfiles => {
            modelfiles.length > 0 && setModelfiles(modelfiles);
        })
    },[isExcludeUsed])

    
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setIsExcludeUsed(event.target.checked);
    }
  
  
    if(!modelfiles) return <LoadingComponent content='Loading modelfiles...' />

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
            
            <ModelfileList modelfiles={modelfiles}/>
        </Container>

    )
}