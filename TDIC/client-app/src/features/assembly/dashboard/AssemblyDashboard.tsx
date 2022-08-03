import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import AssemblyList from './AssemblyList';

export default observer(function AssemblyDashboard() {        
    const {assemblyStore} = useStore();
    const {loadAssemblies} = assemblyStore;
  
    useEffect(() => {
        loadAssemblies();
    },[])
  
  
    if(assemblyStore.loading) return <LoadingComponent content='Loading assembies...' />



    return(
        <Container>
            <Link to={`/attachmentfileupload`}>
                <h3 >Create New Assembly</h3>
            </Link>
            
            <hr />
            <AssemblyList />
        </Container>
    )
})