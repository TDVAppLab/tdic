


import { observer } from 'mobx-react-lite';
import { useStore } from "../../../app/stores/store";
import Bool2String from './Bool2String';


export default observer( function DebugDisplayModelLoadingInfo() {

    


    const {instancepartStore} = useStore();
    const {modelLoadingRegistry, instancepartRegistry, getModelLoading} = instancepartStore;
    


    return (
        <div>

            <hr />

            <table className="table">
                <thead>
                    <tr>
                        <th>
                            No.
                        </th>
                        <th>
                            ID Inst
                        </th>
                        <th>
                            Part Number
                        </th>
                        <th>
                            X
                        </th>
                        <th>
                            Y
                        </th>
                        <th>
                            Z
                        </th>
                        <th>
                            Scale
                        </th>
                    </tr>
                </thead>
                <tbody>
                {          
                    instancepartRegistry.size>0 && Array.from(instancepartRegistry.values()).map((x,index)=>(         
                        <tr key={x.id_inst}>
                            <td><div>{index+1}</div></td>
                            <td><div>{Bool2String(getModelLoading(x.id_inst)!)}</div></td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
})
