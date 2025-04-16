import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState } from 'react'
import './LayoutWeb.css';

import NavWeb from "../navs/NavWeb";

export default function LayoutWeb({ children }){
    return (
        <div className="layout layout-web">
            <NavWeb></NavWeb>
            { children }
        </div>
    )
}