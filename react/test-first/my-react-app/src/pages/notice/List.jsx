import { BrowserRouter, Routes, Route, useParams, useSearchParams } from "react-router-dom";
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


function getList(page=1,cb){
  if(page==1){
    setTimeout(()=>{
      cb([
        {id:1,title:'title1'}
        ,{id:2,title:'title2'}
        ,{id:3,title:'title3'}
        ,{id:4,title:'title4'}
      ])
    },100)
  }else{
    setTimeout(()=>{
      
      cb([
        {id:5,title:'title5'}
        ,{id:6,title:'title6'}
        ,{id:7,title:'title7'}
        ,{id:8,title:'title8'}
      ])
    },100);
  }
  
}

export default function List(){
  
  console.log('Notice.List');
  
  const [searchParams] = useSearchParams();

  const page = searchParams.get('page')??1;
  
  const { id } = useParams();
  const urlPrefix = '/notice';
  
  
  let [rows, setRows] = useState([]);
  let mode = 'list'
  
  useEffect(() => {
    console.log(page);
    
    getList(page,(rows)=>{
      console.log(rows);
      
      setRows(rows);
    })
    return () => {  };
  }, [searchParams]);
  
  return (
    <LayoutWeb>
      <div className="container">
        <h1>HELLO REACT - Notice - board</h1>
        <hr />
        <div>
        {/* <Board id={id} mode={mode} rows={rows} row={row} urlPrefix={urlPrefix}></Board> */}
        <Board.List id={id} mode={mode} rows={rows} urlPrefix={urlPrefix}></Board.List>
        </div>
      </div>
    </LayoutWeb>
    
  )
}