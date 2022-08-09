import {  makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Modelfile } from "../models/ModelFile";
import { OptionBase } from "../models/Optionbase";

export default class ModelfileStore {
    ModelfileRegistry = new Map<number, Modelfile>();
    selectedModelfile: Modelfile| undefined = undefined;
    //editMode=false;
    loading=false;

    constructor(){
        makeAutoObservable(this)
    }


    get ModelfilesArray(){
        
        return Array.from(this.ModelfileRegistry.values());

            
    }
    get ModelfilesByDate(){
        
        return Array.from(this.ModelfileRegistry.values()).sort((a,b) => 
            a.create_datetime!.getTime() - b.create_datetime!.getTime());

            
    }

    get groupedModelfiles(){
        return Object.entries(
            this.ModelfilesByDate.reduce((modelfiles,modelfile) => {
                const id = modelfile.id_part;
                modelfiles[id] = modelfiles[id] ? [...modelfiles[id], modelfile] : [modelfile];
                return modelfiles;
            }, {} as {[key: number]: Modelfile[]})
        )
    }


    loadModelfiles = async () => {
        this.loading = true;
        try {
            const modelfiles = await agent.Modelfiles.list();
            modelfiles.forEach(modelfile => {
                this.setModelfile(modelfile);
            })
            this.setLoaing(false);
        } catch (error) {
            console.log(error);
            this.setLoaing(false);
        }
    }
    

    loadModelfile = async (id:number) => {
        this.loading = true;
        let object:Modelfile;
        //console.log("called loadmodelfiles");
        try {
            //console.log("called loadmodelfiles");
            object = await agent.Modelfiles.details(id);
            this.setModelfile(object);
            runInAction(()=>{
                this.selectedModelfile = object;
            })
            this.setLoaing(false);
            return object;
        } catch (error) {
            console.log(error);
            this.setLoaing(false);
        }
        
    }

    
    updateModelfile = async (object: Modelfile) => {
        this.loading = true;
        
        try {
            await agent.Modelfiles.update(object);
            runInAction(() => {
                this.ModelfileRegistry.set(object.id_part, object);
                this.selectedModelfile = object;
                this.loading = false;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    
    

    
    deleteModelfile = async (object: Modelfile) => {
        this.loading = true;
        
        try {
            await agent.Modelfiles.delete(object.id_part);
            runInAction(() => {
                this.ModelfileRegistry.delete(object.id_part);
                this.loading = false;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }    
    
    setSelectedModelfile = async (id_part:number) => {
        let modelfile = this.getModelfile(id_part);
        if(modelfile) {
            runInAction(()=>{
                this.selectedModelfile = modelfile;
            })
            return modelfile;
        } else {
            this.loading = true;
            try {
                modelfile = await agent.Modelfiles.details(id_part);
                this.setModelfile(modelfile);
                runInAction(()=>{
                    this.selectedModelfile = modelfile;
                })
                this.setLoaing(false);
                return modelfile;
            } catch (error) {
                console.log(error);
                this.setLoaing(false);
            }
        }
    }
    

    getOptionArray=()=>{
        const ans = Array<OptionBase>();

        
        Array.from(this.ModelfileRegistry.values()).map(modelfile=>(
            ans.push({label: modelfile.part_number, value: modelfile.id_part.toString()})
        ))
        return ans;
    }

    private setModelfile = (modelfile : Modelfile) => {
        this.ModelfileRegistry.set(modelfile.id_part,modelfile);
    }

    private getModelfile=(id:number) => {
        return this.ModelfileRegistry.get(id);
    }

    setLoaing = (state: boolean) => {
        this.loading = state;
    }


}