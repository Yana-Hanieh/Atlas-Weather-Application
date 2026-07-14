import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import './index.css'
import Weather from './assets/pages/Weather.jsx'
import Cities from './assets/pages/Cities.jsx'
import Map from './assets/pages/Map.jsx'
import Settings from './assets/pages/Settings.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element= {<Navigate to ="/weather"/>}/>
            <Route path="/weather" element={<Weather/>}/>
            <Route path="/cities" element={<Cities/>}/>
            <Route path="/map" element={<Map/>}/>
            <Route path="/settings" element={<Settings/>}/>
        </Routes>
    </BrowserRouter>
)
