import { Children } from "react";
import List from "./List";
import Show from "./Show";

// export default {List, Show };


export default function Board({Children,mode,id,rows,row,urlPrefix}){
    console.log('Board',mode,id,rows,row);
    
    if(mode=='show'){
        return (
            <>
            <Show mode={mode} id={id} row={row} urlPrefix={urlPrefix} />
            </>
        )
    }else if(mode=='list'){
        return (
            <>
            <List mode={mode} id={id} rows={rows} urlPrefix={urlPrefix} />
            </>
        )
    }

}