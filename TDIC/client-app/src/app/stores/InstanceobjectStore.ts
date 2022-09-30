import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import {format} from 'date-fns';
import { AnimationClip } from "three";
import { Instanceobject } from "../models/Instanceobject";

export default class InstanceobjectStore {
    instanceobjectRegistry = new Map<number, Instanceobject>();
    selectedInstanceobject: Instanceobject| undefined = undefined;
    loading=false;

    annimationsRegistry = new Map<number, AnimationClip[]>();//number = id_inst(=instance)

    modelLoadingRegistry = new  Map<number, boolean>();
    
    id_article: number = 0;

    constructor(){
        makeAutoObservable(this)
    }


    loadInstanceobjects = async (id_article:number) => {
        this.loading = true;
        this.instanceobjectRegistry.clear();
        this.modelLoadingRegistry.clear();
        try {
            const objects = await agent.Instanceobjects.list(id_article);
            runInAction(() => {
                objects.forEach(object => {
                    this.setInstanceobject(object);
                    this.modelLoadingRegistry.set(object.id_article,true);
                })
                this.id_article=id_article;
            })            
            this.setLoading(false);
        } catch (error) {
            console.log(error);
            this.loading = false;
            this.setLoading(false);
        }
    }

    setSelectedInstanceobject = async (id_instance:number) => {
        let object = this.getInstanceobject(id_instance);
        if(object) {
            this.selectedInstanceobject = object;
            runInAction(()=>{
                this.selectedInstanceobject = object;
            })
            return object;
        }
    }


    
    
    createInstanceobject = async (object: Instanceobject) => {
        this.loading = true;
        try {
            const result_object = await (await agent.Instanceobjects.create(object)).data;
            runInAction(() => {
                this.instanceobjectRegistry.set(result_object.id_instance, result_object);
                this.selectedInstanceobject = result_object;
                this.loading = false;
            })            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateInstanceobjects = async (objects: Instanceobject[]) => {
        this.loading = true;

        try {
            await agent.Instanceobjects.update(objects);
            const result_object = await agent.Instanceobjects.list(objects[0].id_article);
            runInAction(() => {
                result_object.forEach(object => {
                    this.setInstanceobject(object);
                })
                this.loading = false;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }


    
    deleteInstanceobject = async (object: Instanceobject) => {
        this.loading = true;
        
        try {
            console.log(object);
            await agent.Instanceobjects.delete(object.id_article, object.id_instance);
            runInAction(() => {
                this.instanceobjectRegistry.delete(object.id_instance);
                this.loading = false;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }    


    setAnimationClips = (animations : AnimationClip[], id_instance: number) => {
        this.annimationsRegistry.set(id_instance,animations);
    }


    private setInstanceobject = (object : Instanceobject) => {
        this.instanceobjectRegistry.set(object.id_instance,object);
    }

    private getInstanceobject=(id_instance:number) => {
        return this.instanceobjectRegistry.get(id_instance);
    }

    setLoading = (state: boolean) => {
        this.loading = state;
    }

    setModelLoading = (id_inst : number, state : boolean) => {
        runInAction(() => {
            this.modelLoadingRegistry.set(id_inst,state);
        })
    }

    getModelLoading = (id_inst : number) => {
        return this.modelLoadingRegistry.get(id_inst);
    }

    getIsAllModelLoading = () => {
        let ans = false;
        this.modelLoadingRegistry.forEach(modelLoading=>{
            ans = ans || modelLoading;
        })
        return ans;
    }

}