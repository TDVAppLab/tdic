import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import {format} from 'date-fns';
import { Instancepart } from "../models/Instancepart";
import { AnimationClip } from "three";

export default class InstancepartStore {
    instancepartRegistry = new Map<number, Instancepart>();
    selectedInstancepart: Instancepart| undefined = undefined;
    loading=false;

    annimationsRegistry = new Map<number, AnimationClip[]>();//number = id_inst(=instance)

    modelLoadingRegistry = new  Map<number, boolean>();

    constructor(){
        makeAutoObservable(this)
    }


    loadInstanceparts = async (id_assy:number) => {
        this.loading = true;
        this.instancepartRegistry.clear();
        this.modelLoadingRegistry.clear();
        try {
            const instanceparts = await agent.Instanceparts.list(id_assy);
            runInAction(() => {
                instanceparts.forEach(instancepart => {
                    this.setInstancepart(instancepart);
                    this.modelLoadingRegistry.set(instancepart.id_inst,true);
                })
            })            
            this.setLoading(false);
        } catch (error) {
            console.log(error);
            this.loading = false;
            this.setLoading(false);
        }
    }

    setSelectedInstancepart = async (id_inst:number) => {
        let instancepart = this.getInstancepart(id_inst);
        if(instancepart) {
            this.selectedInstancepart = instancepart;
            runInAction(()=>{
                this.selectedInstancepart = instancepart;
            })
            return instancepart;
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


    
    
    createInstancepart = async (object: Instancepart) => {
        this.loading = true;
        try {
            const result_object = await (await agent.Instanceparts.create(object)).data;
            runInAction(() => {
                this.instancepartRegistry.set(result_object.id_inst, result_object);
                this.selectedInstancepart = result_object;
                this.loading = false;
            })            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateInstancepart = async (objects: Instancepart[]) => {
        this.loading = true;

        try {
            await agent.Instanceparts.update(objects);
            const result_object = await agent.Instanceparts.list(objects[0].id_assy);
            runInAction(() => {
                result_object.forEach(object => {
                    this.setInstancepart(object);
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


    
    deleteInstancepart = async (object: Instancepart) => {
        this.loading = true;
        
        try {
            console.log(object);
            await agent.Instanceparts.delete(object.id_assy, object.id_inst);
            runInAction(() => {
                this.instancepartRegistry.delete(object.id_inst);
                this.loading = false;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }    


    setAnimationClips = (animations : AnimationClip[], id_inst: number) => {
        this.annimationsRegistry.set(id_inst,animations);
    }


    private setInstancepart = (instancepart : Instancepart) => {
        this.instancepartRegistry.set(instancepart.id_inst,instancepart);
    }

    private getInstancepart=(id_inst:number) => {
        return this.instancepartRegistry.get(id_inst);
    }

    setLoading = (state: boolean) => {
        this.loading = state;
    }

    setModelLoading = (id_inst : number, state : boolean) => {
        this.modelLoadingRegistry.set(id_inst,state);
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