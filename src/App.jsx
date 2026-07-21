import { useState, useEffect } from "react"
import { useNavigate, Route, Routes, Navigate } from 'react-router-dom'
import Weather from "./assets/pages/Weather";
import Cities from "./assets/pages/Cities.jsx";
import Map from "./assets/pages/Map.jsx";
import Settings from "./assets/pages/Settings.jsx";
import SideBar from "./assets/components/SideBar.jsx";


function App() {
 
  return (
      <div className="bg-primary flex flex-row gap-3  items-stretch h-screen w-full"> {/* search bar and side bar are aligned from the top so they start in the same height */}
        <SideBar/>
        <div className="flex flex-col lg:flex-row gap-3 flex-1 min-w-0 items-stretch">
            <Routes>
                  <Route path="/" element= {<Navigate to ="/weather"/>}/>
                  <Route path="/weather" element={<Weather/>}/>
                  <Route path="/cities" element={<Cities/>}/>
                  <Route path="/map" element={<Map/>}/>
                  <Route path="/settings" element={<Settings/>}/>
              </Routes>
          </div>
      </div>
  );
}

export default App
