import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import agent from '../../../app/api/agent';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { WebsiteSetting } from '../../../app/models/WebsiteSetting';

export default observer(function WebsiteSettingDashboard() {

    const [websiteSettings, setWebsiteSettings] = useState<WebsiteSetting[]>();
  
    useEffect(() => {
        agent.WebsiteSettings.list().then(sitesettings => {
            sitesettings.length > 0 && setWebsiteSettings(sitesettings);
        })
    },[])  
  
    if(!websiteSettings) return <LoadingComponent />

    return(
        <Container>
            
            <Link to={`/websitesettingcreate`}>
                <h3 >Create</h3>
            </Link>
            
            <hr />



            <table className="table">
                <thead>
                    <tr>
                        <th>
                            No.
                        </th>
                        <th>
                            Title
                        </th>
                        <th>
                            Memo
                        </th>
                        <th>
                            Edit
                        </th>
                    </tr>
                </thead>
                <tbody>
                {                                
                    websiteSettings && websiteSettings?.map((x,index)=>(                        

                        <tr key={x.title}>
                            <td>{index+1}</td>
                            <td>{x.title}</td>
                            <td>{x.memo}</td>
                            <td><Link to={`/websitesettingedit/${x.title}`}>Edit</Link></td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </Container>

        
    )
})