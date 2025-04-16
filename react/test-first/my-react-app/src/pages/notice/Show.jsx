import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import LayoutWeb from "../../layouts/LayoutWeb";
// import Board from "../modules/board/default/Board";
import Board from "../../modules/board/default/main";
import { useEffect, useState } from "react";

const vdata = [
  {id:1,title:'title1'}
  ,{id:2,title:'title2'}
  ,{id:3,title:'title3'}
  ,{id:4,title:'title4'}
  ,{id:5,title:'title5'}
  ,{id:6,title:'title6'}
  ,{id:7,title:'title7'}
  ,{id:8,title:'title8'}
]

function getShow(id,cb){
  setTimeout(()=>{

    cb( vdata.find((e)=> e.id=id ))
  },100);
}

export default function List(){
  
  console.log('Notice.Show');
  
  
  const { id } = useParams();
  console.log(id);
  
  const urlPrefix = '/notice';
  
  const page = 1;
  let [row, setRow] = useState(null);
  let mode = 'show'
  
  useEffect(() => {
    getShow(id,(row)=>{
      console.log(row);
      
      setRow(row);
    })
    return () => {  };
  }, []);
  
  return (
    <LayoutWeb>
      <div className="container">
        <h1>HELLO REACT - Notice - board</h1>
        <hr />
        <div>
        <Board.Show id={id} mode={mode} row={row} urlPrefix={urlPrefix} />
        </div>
      </div>
    </LayoutWeb>
    
  )
}