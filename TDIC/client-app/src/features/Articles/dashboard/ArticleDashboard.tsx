import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import GoogleAd from '../../../app/common/utils/GoogleAd';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import ArticleList from './ArticleList';

export default observer(function ArticleDashboard() {      

    
    const {siteAnalyticsStore} = useStore();
    
    const {articleStore} = useStore();
    const {loadArticles, articleRegistry} = articleStore;
    const {userStore: {user}} = useStore();
  
    useEffect(() => {
        if(articleRegistry.size <= 1) loadArticles();
    },[articleRegistry.size, loadArticles])
  
  
    if(articleStore.loading) return <LoadingComponent content='Loading articles...' />



    return(
        <Container>
            {
                user &&
                    <>            
                        <Link to={`/createarticle`}>
                            <h3>Create New Article</h3>
                        </Link>
                        <hr />                        
                    </>
            }
            
            <ArticleList />
            {
            <GoogleAd pid={siteAnalyticsStore.GoogleAdsensePublisherId!} uid={siteAnalyticsStore.GoogleAdsenseUnitId!} />
            }
        </Container>

        
    )
})