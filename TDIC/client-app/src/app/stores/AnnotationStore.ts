import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Annotation } from "../models/Annotation";

export default class AnnotationStore {
    annotationRegistry = new Map<number, Annotation>();
    selectedAnnotation: Annotation| undefined = undefined;
    loading=false;

    
    id_article: number = 0;

    constructor(){
        makeAutoObservable(this)
    }


    loadAnnotations = async (id_article:number) => {
        this.loading = true;
        this.annotationRegistry.clear();
        try {
            const annotation = await agent.Annotations.list(id_article);
            annotation.forEach(annotation => {
                this.setAnnotation(annotation);
            })

            runInAction(()=>{
                this.id_article=id_article;
            })
            
            this.setLoading(false);
        } catch (error) {
            console.log(error);
            this.setLoading(false);
        }
    }

    setSelectedAnnotation = async (id_annotation:number) => {
        let object = this.getAnnotation(id_annotation);
        if(object) {
            //this.selectedAnnotation = object;
            runInAction(()=>{
                this.selectedAnnotation = object;
            })
            return object;
        } /*else {
            this.loadingInitial = true;
            try {
                instruction = await agent.Instructions.details(id_article,id_instruct);
                this.setInstruction(instruction);
                runInAction(()=>{
                    this.selectedInstruction = instruction;
                })
                this.setLoaingInitial(false);
                return instruction;
            } catch (error) {
                console.log(error);
                this.setLoaingInitial(false);
            }
        }*/
    }
    

    
    createAnnotation = async (object: Annotation) => {
        this.loading = true;
        try {
            //await agent.Annotations.create(object);
            const result_object = await (await agent.Annotations.create(object)).data;
            runInAction(() => {
                this.annotationRegistry.set(result_object.id_annotation, result_object);
                this.selectedAnnotation = result_object;
                this.setLoading(false);
            })            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoading(false);
            })
        }
    }

    
    editAnnotationInternal = async (object: Annotation) => {
        
        try {
            runInAction(() => {
                this.annotationRegistry.set(object.id_annotation, object);
                this.selectedAnnotation = object;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
            })
        }
    }
    
    updateAnnotation = async (object: Annotation) => {
        //this.loading = true;
        
        try {
            await agent.Annotations.update(object);
            const result_object = await agent.Annotations.details(object.id_article, object.id_annotation);
            //const result_object = object;
            runInAction(() => {
                this.annotationRegistry.set(result_object.id_annotation, result_object);
                this.selectedAnnotation = result_object;
                //console.log("calledxxxx");
                //this.setLoading(false);
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                //this.setLoading(false);
            })
        }
    }

    
    deleteAnnotation = async (object: Annotation) => {
        this.loading = true;
        
        try {
            await agent.Annotations.delete(object.id_article, object.id_annotation);
            runInAction(() => {
                this.annotationRegistry.delete(object.id_annotation);
                this.setLoading(false);
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoading(false);
            })
        }
    }    

    private setAnnotation = (object : Annotation) => {
        this.annotationRegistry.set(object.id_annotation,object);
    }

    private getAnnotation=(id_annotation:number) => {
        return this.annotationRegistry.get(id_annotation);
    }

    setLoading = (state: boolean) => {
        this.loading = state;
    }
}