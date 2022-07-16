import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import AttachmentFileList from './AttachmentFileList';

export default observer(function AttachmentFileDashboard() {        
    const {attachmentfileStore} = useStore();
    const {loadAttachmentfiles, AttachmentfileRegistry} = attachmentfileStore;
  
    useEffect(() => {
        if(AttachmentfileRegistry.size <= 1) loadAttachmentfiles();
    },[AttachmentfileRegistry.size, loadAttachmentfiles])
  
  
    if(attachmentfileStore.loadingInitial) return <LoadingComponent content='Loading attachments...' />



    return(
        <Container>
            <AttachmentFileList />
        </Container>
    )
})