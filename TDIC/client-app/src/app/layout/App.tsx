import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Route, Routes, useLocation } from 'react-router-dom';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponents';
import ModalContainer from '../common/modals/ModalContainer';
import AttachmentFileDashboard from '../../features/attachmentfiles/dashboard/AttachmentFileDashboard';
import ArticleDashboard from '../../features/Articles/dashboard/ArticleDashboard';
import ArticleDetails from '../../features/Articles/details/ArticleDetails';
import ModelfileDashboard from '../../features/Modelfiles/dashboard/ModelfileDashboard';
import RegisterForm from '../../features/users/RegisterForm';
import ArticleEdit from '../../features/Articles/edit/ArticleEdit';
import Privacy from '../../features/Privacy/Privacy';
import { GoogleAdHead } from '../common/utils/GoogleAdHead';
import AttachmentFileDetails from '../../features/attachmentfiles/details/AttachmentFileDetails';
import ModelfileCreate from '../../features/Modelfiles/create/ModelfileCreate';
import ModelfileEdit from '../../features/Modelfiles/edit/ModelfileEdit';
import AttachmentfileUpload from '../../features/attachmentfiles/upload/AttachmentfileUpload';
import AttachmentfileEdit from '../../features/attachmentfiles/edit/AttachmentfileEdit';
import WebsiteSettingDashboard from '../../features/WebsiteSetting/dashboard/WebsiteSettingDashboard';
import WebsiteSettingForm from '../../features/WebsiteSetting/form/WebsiteSettingForm';
import useTrackingGA4 from '../common/utils/useTrackingGA4';
import { RouteAuthChk } from '../common/RouteAuthChk';

function App() {

  
  const {siteAnalyticsStore} = useStore();
  
  useEffect(() => {
    GoogleAdHead(siteAnalyticsStore.GoogleAdsensePublisherId!)
  }, [siteAnalyticsStore.GoogleAdsensePublisherId]);

  useTrackingGA4();



  const location = useLocation();
  const {commonStore, userStore} = useStore();

  useEffect(() => {
    if(commonStore.token){
      userStore.getUser().finally(()=> commonStore.setAppLoaded());

    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  if(!commonStore.appLoaded) return <LoadingComponent content='Loading app ...' />

  return (
    <>
      <ToastContainer position ='bottom-right' hideProgressBar />
      <ModalContainer />
      <NavBar />
      <div className="container-fluid">
            <Routes>
                <Route path = '/' element={<ArticleDashboard />} />       
                <Route path = '/articles' element={<ArticleDashboard />} />
                <Route path = '/article/:id' element={<ArticleDetails />} />                
                <Route path = '/articleedit/:id' element={ <RouteAuthChk component={<ArticleEdit />} redirect="/login" /> } />
                <Route path = '/createarticle' element={ <RouteAuthChk component={<ArticleEdit />} redirect="/login" /> } />

                
                <Route path = '/attachmentfiles' element={ <RouteAuthChk component={<AttachmentFileDashboard />} redirect="/login" /> } />
                <Route path = '/attachmentfile/:id' element={ <RouteAuthChk component={<AttachmentFileDetails />} redirect="/login" /> } />
                <Route path = '/attachmentfileedit/:id' element={ <RouteAuthChk component={<AttachmentfileEdit />} redirect="/login" /> } />
                <Route path = '/attachmentfileupload' element={ <RouteAuthChk component={<AttachmentfileUpload />} redirect="/login" /> } />



                <Route path = '/modelfiles' element={ <RouteAuthChk component={<ModelfileDashboard />} redirect="/login" /> } />
                <Route path = '/modelfilecreate' element={ <RouteAuthChk component={<ModelfileCreate />} redirect="/login" /> } />
                <Route key = {location.key} path = '/modelfileedit/:id' element={ <RouteAuthChk component={<ModelfileEdit />} redirect="/login" /> } />



                <Route path = '/websitesettings' element={ <RouteAuthChk component={<WebsiteSettingDashboard />} redirect="/login" /> } />
                <Route key = {location.key} path = '/websitesettingedit/:id' element={ <RouteAuthChk component={<WebsiteSettingForm />} redirect="/login" /> } />
                <Route key = {location.key} path = '/websitesettingcreate' element={ <RouteAuthChk component={<WebsiteSettingForm />} redirect="/login" /> } />
                
                

                <Route path='/errors' element={<TestErrors />} />
                <Route path='/server-error' element={<ServerError />} />
                <Route path='/login' element={<LoginForm />} />
                <Route path='/register' element={<RegisterForm />} />
                <Route path='/privacy' element={<Privacy />} />
                <Route element={<NotFound />} />
            </Routes>
      </div>    
    </>
  );
}

export default observer(App);
