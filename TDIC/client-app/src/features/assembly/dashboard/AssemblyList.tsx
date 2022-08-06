import { observer } from "mobx-react-lite";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStore } from "../../../app/stores/store";

export default observer( function AssemblyList() {
             
    const {assemblyStore} = useStore();
    const {AssemblyRegistry} = assemblyStore;

    return (
        <Row>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            No.
                        </th>
                        <th>
                            ID Assy
                        </th>
                        <th>
                            Name
                        </th>
                        <th>
                            Edit
                        </th>
                    </tr>
                </thead>
                <tbody>
                {                                
                    Array.from(AssemblyRegistry.values()).map(x=>(
                        

                        <tr key={x.id_assy}>
                            <td>{x.id_assy}</td>
                            <td>{x.id_assy}</td>
                            <td>{x.assy_name}</td>
                            <td><Link to={`/assembliesedit/${x.id_assy}`}>Edit</Link></td>
                        </tr>

                        ))
                }
                </tbody>
            </table>
        </Row>
    )
})