import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LayoutWeb from "./layouts/LayoutWeb";

import Home from "./pages/Home";
import Home2 from "./pages/Home2";

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home2" element={<Home2 />} />
      </Routes>
    </BrowserRouter>
  )
}