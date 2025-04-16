import { Link } from "react-router-dom";
import Loading from "../../../pages/Loading";

export default function Show({ children,mode, id,row,urlPrefix }){
    console.log(row);
    
    if(!row){
        return (
            <Loading></Loading>
        );
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>title</th>
                        <th>author</th>
                        <th>date</th>
                    </tr>
                </thead>
                <tbody>

                    <tr>
                        <td>{row.id}</td>
                        <td>{row.title}</td>
                        <td>{row.autdor}</td>
                        <td>{row.date}</td>
                    </tr>
                </tbody>
            </table>
            <div>
                <Link to={urlPrefix}>이전</Link>
            </div>
        </>

    );
}