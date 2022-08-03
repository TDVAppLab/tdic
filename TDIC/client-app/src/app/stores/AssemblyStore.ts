import {  makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import {format} from 'date-fns';
import { Assembly } from "../models/Assembly";

export default class AssemblyStore {
    AssemblyRegistry = new Map<number, Assembly>();
    selectedAssembly: Assembly| undefined = undefined;
    loading=false;

    constructor(){
        makeAutoObservable(this)
    }




    loadAssemblies = async () => {
        this.setLoaing(true);
        this.AssemblyRegistry.clear();
        try {
            const assys = await agent.Assemblies.list();
            assys.forEach(assy => {
                this.setObject(assy);
            })
            this.setLoaing(false);
        } catch (error) {
            console.log(error);
            this.setLoaing(false);
        }
    }




    loadAssembly = async (id:number) => {
        this.loading = true;
        let object: Assembly;
        try {
            object = await agent.Assemblies.details(id);
            this.setObject(object);
            runInAction(()=>{
                this.selectedAssembly = object;
            })
            this.setLoaing(false);
            return object;
        } catch (error) {
            console.log(error);
            this.setLoaing(false);
        }
        
    }


    updateAssembly = async (object: Assembly) => {
        this.loading = true;
        
        try {
            await agent.Assemblies.update(object);
            runInAction(() => {
                this.AssemblyRegistry.set(object.id_assy, object);
                this.selectedAssembly = object;
                this.loading = false;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    

    
    deleteAssembly = async (object: Assembly) => {
        this.loading = true;
        
        try {
            await agent.Assemblies.delete(object.id_assy);
            runInAction(() => {
                this.AssemblyRegistry.delete(object.id_assy);
                this.loading = false;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }    

    private setObject = (object : Assembly) => {
        this.AssemblyRegistry.set(object.id_assy,object);
    }

    private getObject=(id:number) => {
        return this.AssemblyRegistry.get(id);
    }
    
    setLoaing = (state: boolean) => {
        this.loading = state;
    }


}