import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Modelfile } from "../../../app/models/ModelFile";


interface Props {
    modelfiles: Modelfile[];
  }  

export default function ModelfileList({modelfiles}: Props) {


    return (
        <Row>
            { 
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                No.
                            </th>
                            <th>
                                ID
                            </th>
                            <th>
                                Part Number
                            </th>
                            <th>
                                Format
                            </th>
                            <th>
                                Length
                            </th>
                            <th>
                                License
                            </th>
                            <th>
                                Source
                            </th>
                            <th>
                                Author
                            </th>
                            <th>
                                Refferanced
                            </th>
                            <th>
                                Edit
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {                                
                        modelfiles.map((x,index)=>(                     
    
                            <tr key={x.id_part}>
                                <td>{index+1}</td>
                                <td>{x.id_part}</td>
                                <td>{x.part_number}</td>
                                <td>{x.format_data}</td>
                                <td>{x.file_length.toLocaleString()}</td>
                                <td>{x.license}</td>
                                <td><a href={x?.itemlink} target="_blank" rel="noopener noreferrer">Link</a></td>
                                <td>{x.author}</td>
                                <td>{x.count_use_instance}</td>
                                <td><Link to={`/modelfileedit/${x.id_part}`}>Edit</Link></td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            }
        </Row>


    )
}