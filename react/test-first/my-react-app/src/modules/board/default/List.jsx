import { Link } from "react-router-dom";

export default function List({ children,mode, id,rows,urlPrefix  }){

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
                {
                    rows?.map((row)=>{
                        return (
                            <tr key={row.id}>
                                <td>{row.id}</td>
                                <td>
                                    <Link to={`${urlPrefix}/${row.id}`}>{row.title}</Link>
                                </td>
                                <td>autdor</td>
                                <td>date</td>
                            </tr>
                        )
                    })
                }
                
            </tbody>
        </table>
        <div>
            <Link to={`?page=1`} className="btn btn-link">1</Link>
            <Link to={`?page=2`} className="btn btn-link">2</Link>
        </div>
        </>
    );
}