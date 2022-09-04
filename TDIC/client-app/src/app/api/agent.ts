import axios, { AxiosError, AxiosResponse } from "axios";
import { request } from "http";
import { toast } from "react-toastify";
import { history } from "../..";
import { Annotation } from "../models/Annotation";
import { AnnotationDisplay } from "../models/AnnotationDisplay";
import { Article } from "../models/article";
import { Assembly } from "../models/Assembly";
import { Attachmentfile, AttachmentfileEyecatchDtO } from "../models/attachmentfile";
import { Instancepart } from "../models/Instancepart";
import { Instruction } from "../models/instruction";
import { Light } from "../models/Light";
import { mArticleStatus } from "../models/mArticleStatus";
import { Modelfile } from "../models/ModelFile";
import { User, UserFormValues } from "../models/user";
import { View } from "../models/view";
import { WebsiteSetting } from "../models/WebsiteSetting";
import { store } from "../stores/store";

const sleep = (delay: number) => {
    return new Promise((resolve)=>{
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

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
                history.push('/not-found');
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
            history.push('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('server-error');
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
    fileupload: (formData:FormData) => axios.post('/modelfiles/uploadfile',formData),
    delete:(id:number) => axios.post<void>(`/modelfiles/delete/${id}`),
}

const Attachmentfiles = {
    list: () => requests.get<Attachmentfile[]>('/attachmentfiles/index'),
    details:(id:number) => requests.get<Attachmentfile>(`/attachmentfiles/details/${id}`),
    createeyecatch:(image : AttachmentfileEyecatchDtO) => axios.post<void>(`/attachmentfiles/createeyecatch`,image),
    fileupload: (formData:FormData) => axios.post('/attachmentfiles/uploadfile',formData),
    update: (object: Attachmentfile) => axios.post<void>(`/attachmentfiles/update/`, object),
    delete:(id:number) => axios.post<void>(`/attachmentfiles/delete/${id}`),
}

const Assemblies = {
    list: () => requests.get<Assembly[]>('/assembly/index'),    
    details:(id:number) => requests.get<Assembly>(`/assembly/details/${id}`),
    create:(object: Assembly) => axios.post<void>(`/assembly/create`, object),
    update: (object: Assembly) => axios.post<void>(`/assembly/update/`, object),
    delete:(id:number) => axios.post<void>(`/assembly/delete/${id}`),
}

const Articles = {
    list: () => requests.get<Article[]>('/articles/index'),
    details:(id:number) => requests.get<Article>(`/articles/details/${id}`),
    create:(article: Article) => axios.post<void>(`/articles/create`,article),
    update: (article: Article) => axios.post<void>(`/articles/update/`, article),
    delete:(id:number) => axios.post<void>(`/articles/delete/${id}`),
}

const Instructions = {
    list: (id:number) => requests.get<Instruction[]>(`/instruction/index/${id}`),
    details:(id_article:number,id_instruct:number) => requests.get<Instruction>(`/instruction/id_article=${id_article}&id_instruct=${id_instruct}`),
    create:(instruction: Instruction) => axios.post<Instruction>(`/instruction/create`,instruction),
    update: (instruction: Instruction) => axios.post<void>(`/instruction/update/`, instruction),
    updateInstanceDisplay: (instruction: Instruction) => axios.post<void>(`/instruction/updateinstancedisplay/`, instruction),
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

const Instanceparts = {
    list: (id:number) => requests.get<Instancepart[]>(`/instancepart/index/${id}`),
    details:(id_assy:number,id_inst:number) => requests.get<Instancepart>(`/instancepart/details/id_assy=${id_assy}&id_inst=${id_inst}`),    
    create:(object: Instancepart) => axios.post<Instancepart>(`/instancepart/create`,object),
    update: (instancepart: Instancepart[]) => axios.post<void>(`/instancepart/update/`, instancepart),
    delete: (id_assy:number,id_inst:number) => axios.post<void>(`/instancepart/delete/id_assy=${id_assy}&id_inst=${id_inst}`),
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
    Assemblies,
    Articles,
    Instructions,
    Views,
    Annotations,
    AnnotationDisplays,
    Lights,
    Instanceparts,
    MArticleStatus,
    WebsiteSettings,
}

export default agent;