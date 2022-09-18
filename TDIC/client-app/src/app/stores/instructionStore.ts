import {  makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import {format} from 'date-fns';
import { Instruction } from "../models/instruction";
import { InstanceDisplay } from "../models/InstanceDisplay";
import { InstanceActionExecSetting } from "../models/InstanceActionExecSetting";

export default class InstructionStore {
    instructionRegistry = new Map<number, Instruction>();
    selectedInstruction: Instruction| undefined = undefined;
    loading=false;

    
    selectedSubtitles: string[]=[];
    selectedSubtitleIndex: number=-1;
    
    instanceDisplayRegistry = new Map<number, InstanceDisplay>();

    
    instanceActionExecSettingAllArray :InstanceActionExecSetting[]=[];
    instanceActionExecSettingRegistry :InstanceActionExecSetting[]=[];

    constructor(){
        makeAutoObservable(this)
    }


    loadInstructions = async (id_article:number) => {
        this.loading = true;
        this.instructionRegistry.clear();
        try {
            const instructions = await agent.Instructions.list(id_article);
            instructions.forEach(instruction => {
                this.setInstruction(instruction);
            })

            await this.loadInstanceActionExecSettingAllArray(id_article);

            

            // Setup Selected Instruction
            if (this.instructionRegistry.size > 0) {
                const ar1_map
                    = (Array.from(this.instructionRegistry.values()).filter((x: Instruction) => typeof x.display_order === 'number'))
                        .map((x: Instruction) => x.display_order);

                const id_startinst = (Array.from(this.instructionRegistry.values())).filter((x: Instruction) => x.display_order == Math.min.apply(null, ar1_map))[0].id_instruct;
                this.setSelectedInstruction(id_startinst);

            }

            this.setLoading(false);
        } catch (error) {
            console.log(error);
            this.loading = false;
        }
    }


    loadInstanceActionExecSettingAllArray = async (id_article:number) => {
        this.loading = true;
        this.instanceActionExecSettingAllArray.length =0;
        try {
            this.instanceActionExecSettingAllArray = await agent.Instructions.getInstanceActionClips(id_article);

            //console.log("called loadInstanceActionExecSettingAllArray2");
            //console.log( this.instanceActionExecSettingAllArray);

            this.setLoading(false);
        } catch (error) {
            console.log(error);
            this.loading = false;
        }
    }
    

    setSelectedInstruction = async (id_instruct:number) => {
        let instruction = this.getInstruction(id_instruct);
        if(instruction) {
            this.selectedInstruction = instruction;
            runInAction(()=>{
                this.selectedInstruction = instruction;
                this.selectedSubtitles.length = 0;
                if(this.selectedInstruction?.memo){
                    this.selectedSubtitles = this.selectedInstruction.memo.split(/\n/).filter(x => x.length > 0);
                    this.selectedSubtitleIndex=0;
                }

                this.instanceDisplayRegistry.clear();
                if(this.selectedInstruction){

                    const ans = JSON.parse(this.selectedInstruction.display_instance_sets || "null") as InstanceDisplay[];
                    if(ans) {
                        ans.forEach(x=>{                            
                            this.instanceDisplayRegistry.set(x.id_inst,x);
                        })
                    }
                }

                this.instanceActionExecSettingRegistry.length=0;
                if(this.selectedInstruction){
                    
                    this.instanceActionExecSettingRegistry = this.instanceActionExecSettingAllArray.filter((item:InstanceActionExecSetting) => item.id_instruct === id_instruct);
                    //console.log(this.instanceActionExecSettingRegistry);
                }

            })
            return instruction;
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

    loadInstruction = async (id_article:number,id_instruct:number) => {
        let instruction = this.getInstruction(id_instruct);
        if(instruction) {
            this.selectedInstruction = instruction;
            return instruction;
        } else {
            this.loading = true;
            try {
                instruction = await agent.Instructions.details(id_article,id_instruct);
                this.setInstruction(instruction);
                runInAction(()=>{
                    this.selectedInstruction = instruction;
                })
                this.setLoading(false);
                return instruction;
            } catch (error) {
                console.log(error);
                this.setLoading(false);
            }
        }
    }
    

    
    createInstruction = async (object: Instruction) => {
        this.loading = true;
        try {
            const result_object = await (await agent.Instructions.create(object)).data;
            console.log(result_object);
            runInAction(() => {
                this.instructionRegistry.set(result_object.id_instruct, result_object);
                this.selectedInstruction = result_object;
                this.loading = false;
            })            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateInstruction = async (instruction: Instruction) => {
        //this.loading = true;
        
        try {
            await agent.Instructions.update(instruction);
            runInAction(() => {
                this.instructionRegistry.set(instruction.id_instruct, instruction);
                this.selectedInstruction = instruction;
                //this.loading = false;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
            //    this.loading = false;
            })
        }
    }

    updateInstanceDisplay = async (instruction: Instruction) => {
        //this.loading = true;
        console.log("called");
        try {
            await agent.Instructions.updateInstanceDisplay(instruction);
            runInAction(() => {
                this.instructionRegistry.set(instruction.id_instruct, instruction);
                this.selectedInstruction = instruction;
                //this.loading = false;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
            //    this.loading = false;
            })
        }
    }

    resetInstanceDisplay = async (id_article:number) => {
        //this.loading = true;
        console.log(id_article);
        try {
            await agent.Instructions.resetInstanceDisplay(id_article);
            runInAction(() => {
                //this.instructionRegistry.set(instruction.id_instruct, instruction);
                //this.selectedInstruction = instruction;
                //this.loading = false;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
            //    this.loading = false;
            })
        }
    }


    updateInstanceActionClips = async (id_article:number,id_instruct:number,instanceActionExecSettings: InstanceActionExecSetting[]) => {
        //this.loading = true;
        //console.log("called");
        try {
            await agent.Instructions.updateInstanceActionClips(id_article,id_instruct,instanceActionExecSettings);
            runInAction(() => {
                //this.instructionRegistry.set(instruction.id_instruct, instruction);
                //this.selectedInstruction = instruction;
                //this.loading = false;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
            //    this.loading = false;
            })
        }
    }
    
    deleteInstruction = async (instruction: Instruction) => {
        this.loading = true;
        
        try {
            await agent.Instructions.delete(instruction.id_article, instruction.id_instruct);
            runInAction(() => {
                this.instructionRegistry.delete(instruction.id_instruct);
                this.loading = false;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }    

    setSelectedSubtitleIndex = (i : number) => {
        this.selectedSubtitleIndex = i;
    }

    private setInstruction = (instruction : Instruction) => {
        this.instructionRegistry.set(instruction.id_instruct,instruction);
    }

    private getInstruction=(id_instruct:number) => {
        return this.instructionRegistry.get(id_instruct);
    }

    setLoading = (state: boolean) => {
        this.loading = state;
    }

}