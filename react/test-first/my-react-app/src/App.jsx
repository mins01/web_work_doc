import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LayoutWeb from "./layouts/LayoutWeb";

import Home from "./pages/Home";
import Home2 from "./pages/Home2";
import NotFound from "./pages/NotFound";
// import Notice from "./pages/Notice";
import Notice from "./pages/notice/main";



export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home2" element={<Home2 />} />
        <Route path="/board/test" element={<Home2 />} />
        <Route path="/board/test2" element={<Home2 />} />
        {/* <Route path="/notice/:id" element={<Notice />} />
        <Route path="/notice" element={<Notice />} /> */}
        <Route path="/notice" element={<Notice.List />} />
        <Route path="/notice/:id" element={<Notice.Show />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}