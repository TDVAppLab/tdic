import axios, { AxiosError, AxiosResponse } from "axios";
//import { request } from "http";
import { toast } from "react-toastify";
//import { history } from "../..";
import { APIURL } from "../constants";
import { Annotation } from "../models/Annotation";
import { AnnotationDisplay } from "../models/AnnotationDisplay";
import { Article } from "../models/article";
import { Attachmentfile, AttachmentfileEyecatchDtO } from "../models/attachmentfile";
import { InstanceActionExecSetting } from "../models/InstanceActionExecSetting";
import { Instanceobject } from "../models/Instanceobject";
import { Instruction } from "../models/instruction";
import { Light } from "../models/Light";
import { mArticleStatus } from "../models/mArticleStatus";
import { Modelfile } from "../models/ModelFile";
import { PartAnimationClip } from "../models/PartAnimationClip";
import { User, UserFormValues } from "../models/user";
import { View } from "../models/view";
import { WebsiteSetting } from "../models/WebsiteSetting";
import { store } from "../stores/store";

const sleep = (delay: number) => {
    return new Promise((resolve)=>{
        setTimeout(resolve, delay)
    })
}


axios.defaults.baseURL = APIURL;



axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if(token) config.headers!.Authorization = `Bearer ${token}`
    return config;
})

axios.interceptors.response.use(async response => {
    if(process.env.NODE_ENV === 'development') { await sleep(1000); }
    return response;
}, (error: AxiosError) => {
    const {data, status, config} = error.response!;
    switch (status) {
        case 400:
            if(config.method === 'get' && data.errors.hasOwnProperty('id')){
                toast.error('/not-found');
            }            
            if(data.errors){
                const modalStateErrors = [];
                for(const key in data.errors){
                    if(data.errors[key]){
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            } else {
                toast.error(data);
            }
            break;
        case 401:
            toast.error('unauthorized');
            break;
        case 404:
            toast.error('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            toast.error('server-error');
            break;
    }
    return Promise.reject(error);
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url:string) => axios.get<T>(url).then(responseBody),
    post: <T>(url:string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url:string, body: {}) => axios.put<T>(url,body).then(responseBody),
    del: <T>(url:string) => axios.delete<T>(url).then(responseBody),
}

const Modelfiles = {
    list: (is_exclude_used:boolean) => requests.get<Modelfile[]>(`/modelfiles/index/is_exclude_used=${is_exclude_used}`),
    details:(id:number) => requests.get<Modelfile>(`/modelfiles/details/${id}`),
    update: (modelfile: Modelfile) => axios.post<void>(`/modelfiles/update`, modelfile),
    fileupload: (formData:FormData) => axios.post<Modelfile>('/modelfiles/uploadfile',formData),
    delete:(id:number) => axios.post<void>(`/modelfiles/delete/${id}`),
    updatePartAnimationClip: (id:number, partAnimationClips: PartAnimationClip[]) => axios.post<void>(`/modelfiles/updatepartanimationclip/${id}`, partAnimationClips),
    getPartAnimationClips:(id:number) => requests.get<PartAnimationClip[]>(`/modelfiles/getpartanimationclip/${id}`),
}

const Attachmentfiles = {
    list: () => requests.get<Attachmentfile[]>('/attachmentfiles/index'),
    details:(id:number) => requests.get<Attachmentfile>(`/attachmentfiles/details/${id}`),
    createeyecatch:(image : AttachmentfileEyecatchDtO) => axios.post<void>(`/attachmentfiles/createeyecatch`,image),
    fileupload: (formData:FormData) => axios.post('/attachmentfiles/uploadfile',formData),
    update: (object: Attachmentfile) => axios.post<void>(`/attachmentfiles/update/`, object),
    delete:(id:number) => axios.post<void>(`/attachmentfiles/delete/${id}`),
}

const Articles = {
    list: () => requests.get<Article[]>('/articles/index'),
    details:(id:number) => requests.get<Article>(`/articles/details/${id}`),
    create:(article: Article) => axios.post<Article>(`/articles/create`,article),
    update: (article: Article) => axios.post<void>(`/articles/update/`, article),
    delete:(id:number) => axios.post<void>(`/articles/delete/${id}`),
    deleteDeep:(id:number) => axios.post<void>(`/articles/deletedeep/${id}`),
    duplicate:(id:number) => axios.post<Article>(`/articles/duplicate/${id}`),
}

const Instructions = {
    list: (id:number) => requests.get<Instruction[]>(`/instruction/index/${id}`),
    details:(id_article:number,id_instruct:number) => requests.get<Instruction>(`/instruction/id_article=${id_article}&id_instruct=${id_instruct}`),
    create:(instruction: Instruction) => axios.post<Instruction>(`/instruction/create`,instruction),
    update: (instruction: Instruction) => axios.post<void>(`/instruction/update/`, instruction),
    updateInstanceDisplay: (instruction: Instruction) => axios.post<void>(`/instruction/updateinstancedisplay/`, instruction),
    resetInstanceDisplay: (id_article: number) => axios.post<void>(`/instruction/resetinstancedisplay/${id_article}`),    
    resetInstanceActionClips: (id_article: number) => axios.post<void>(`/instruction/resetinstanceactionclips/${id_article}`),
    getInstanceActionClips:(id_article:number) => requests.get<InstanceActionExecSetting[]>(`/instruction/getinstanceactionclips/${id_article}`),    
    updateInstanceActionClips: (id_article:number,id_instruct:number,instanceActionExecSettings: InstanceActionExecSetting[]) => axios.post<void>(`/instruction/updateinstanceactionclips/id_article=${id_article}&id_instruct=${id_instruct}`, instanceActionExecSettings),
    delete: (id_article:number,id_instruct:number) => axios.post<void>(`/instruction/delete/id_article=${id_article}&id_instruct=${id_instruct}`),
}

const Views = {
    list: (id:number) => requests.get<View[]>(`/view/index/${id}`),
    details:(id_article:number, id_view : number) => requests.get<View>(`/view/details/id_article=${id_article}&id_view=${id_view}`),
    create:(view: View) => axios.post<View>(`/view/create`,view),
    update: (view: View) => axios.post<void>(`/view/update/`, view),
    delete: (id_article:number,id_view:number) => axios.post<void>(`/view/delete/id_article=${id_article}&id_view=${id_view}`),
}

const Annotations = {
    list: (id:number) => requests.get<Annotation[]>(`/annotation/index/${id}`),
    details:(id_article:number,id_annotation:number) => requests.get<Annotation>(`/annotation/details/id_article=${id_article}&id_annotation=${id_annotation}`),
    create:(annotation: Annotation) => axios.post<Annotation>(`/annotation/create`,annotation),
    update: (annotation: Annotation) => axios.post<void>(`/annotation/update/`, annotation),
    delete: (id_article:number,id_annotation:number) => axios.post<void>(`/annotation/delete/id_article=${id_article}&id_annotation=${id_annotation}`),
}
const AnnotationDisplays = {
    list: (id:number) => requests.get<AnnotationDisplay[]>(`/annotationdisplay/index/${id}`),
    details:(id:number) => requests.get<AnnotationDisplay>(`/annotationdisplay/details/${id}`),
    update: (annotationDisplays: AnnotationDisplay[]) => axios.post<void>(`/annotationdisplay/update/`, annotationDisplays),
}

const Lights = {
    list: (id:number) => requests.get<Light[]>(`/light/index/${id}`),
    details:(id_article:number,id_light:number) => requests.get<Light>(`/light/details/id_article=${id_article}&id_light=${id_light}`),
    create:(light: Light) => axios.post<Light>(`/light/create`,light),
    update: (light: Light) => axios.post<void>(`/light/update/`, light),
    delete: (id_article:number,id_light:number) => axios.post<void>(`/light/delete/id_article=${id_article}&id_light=${id_light}`),
}

const Instanceobjects = {
    list: (id:number) => requests.get<Instanceobject[]>(`/instanceobject/index/${id}`),
    details:(id_article:number,id_instance:number) => requests.get<Instanceobject>(`/instanceobject/details/id_article=${id_article}&id_instance=${id_instance}`),    
    create:(object: Instanceobject) => axios.post<Instanceobject>(`/instanceobject/create`,object),
    update: (instanceobject: Instanceobject[]) => axios.post<void>(`/instanceobject/update/`, instanceobject),
    delete: (id_article:number,id_instance:number) => axios.post<void>(`/instanceobject/delete/id_article=${id_article}&id_instance=${id_instance}`),
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user)
}

const MArticleStatus = {
    list: () => requests.get<mArticleStatus[]>('/marticlestatus/index'),
    details:(id:number) => requests.get<mArticleStatus>(`/status/details/${id}`),
    create:(status: mArticleStatus) => axios.post<mArticleStatus>(`/status/create`,status),
    update: (status: mArticleStatus) => axios.post<mArticleStatus>(`/status/update/${status.id}`, status),
    delete: (id:number) => axios.post<mArticleStatus>(`/status/delete/${id}`),
}


const WebsiteSettings = {
    list: () => requests.get<WebsiteSetting[]>('/websitesetting/index'),
    details:(title:string) => requests.get<WebsiteSetting>(`/websitesetting/details/title=${title}`),
    create:(object: WebsiteSetting) => axios.post<WebsiteSetting>(`/websitesetting/create`,object),
    update:(object: WebsiteSetting) => axios.post<WebsiteSetting>(`/websitesetting/update`,object),
    delete: (title:string) => axios.post<void>(`/websitesetting/delete/title=${title}`),
}


const agent = {
    Account,
    Modelfiles,
    Attachmentfiles,
    Articles,
    Instructions,
    Views,
    Annotations,
    AnnotationDisplays,
    Lights,
    Instanceobjects,
    MArticleStatus,
    WebsiteSettings,
}

export default agent;