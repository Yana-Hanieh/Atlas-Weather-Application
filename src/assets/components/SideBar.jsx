import { useLocation, useNavigate } from "react-router-dom";
import {  GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { FaCity,FaMap } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { useState} from "react";
import Weather from "../pages/Weather";
import Cities from "../pages/Cities";
import Map from "../pages/Map";
import Settings from "../pages/Settings";


function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();//gives access to the current url info including the pathname
  const isActive = (path) => location.pathname === path; //returns true of the button's path matches the current URL
  const [iscollapsed, setIsCollapsed] = useState(false); //usestate used to to switch boolean value => allowing user to collapse and expand the sidebar, initially set to false since the sidebar is initially expanded
  
  if (iscollapsed) { //if the iscollapsed is true this return function will be executed
    return ( //return clause if the sidebar is collapsed (iscollapsed=true), only the icons will show
      <div className="bg-primary-light rounded-xl text-white w-16 sm:w-20 flex flex-col gap-5 items-center">
        <div className="text-3xl mt-5 cursor-pointer flex item-center justify-center" onClick={() => setIsCollapsed(!iscollapsed)}><GoSidebarCollapse className="hover:text-yellow-100" /></div> {/*onclick function is used to switch the boolean value of iscollapsed, allowing the user to expand the sidebar upon clicking*/}
        <div className="border-b border-white w-full"> </div> {/*The line under the sidebar, used to separate the expand icon from the sidebar icons*/}
        <div className="mt-5 flex flex-col gap-10 text-4xl text-gray-200 font-semibold"> {/*the icons in the sidebar*/ }
          <TiWeatherPartlySunny  
            onClick = {()=> navigate(`/weather`)} 
            className={`text-4xl ${isActive(`/weather`) ? `text-yellow-100` : `hover:text-hover`}`} />
          <FaCity 
            onClick = {()=> navigate(`/cities`)}
            className={`text-4xl ${isActive(`/cities`) ? `text-yellow-100` : `hover:text-hover`}`}/>
          <FaMap 
            onClick = {()=> navigate(`/map`)}
            className={`text-4xl ${isActive(`/map`) ? `text-yellow-100` : `hover:text-hover`}`}/>
          <IoSettings 
            onClick = {()=> navigate(`/settings`)}
            className={`text-4xl ${isActive(`/settings`) ? `text-yellow-100` : `hover:text-hover`}`}/>
        </div>
      </div>
    );
  }
  
  return ( //if the iscollapsed is false this return function will be executed, this is the default state, the icons along with the labels will show
    <div className="bg-primary-light rounded-xl text-white w-16 h-full sm:h-screen sm:w-35  flex flex-col gap-6 sm:gap-10">
      <div> {/*top section of the sidebar that constains label, collapse icon, and line*/} 
        <div className="flex flex-row gap-5 items-center justify-center"> {/*the label and collapse icon are in a flex row so they are on the same row/x-axis*/ }
          <h2 className="hidden md:block text-xl mt-5">Sidebar</h2>
          <GoSidebarExpand 
             onClick={()=> setIsCollapsed(!iscollapsed)}
            className="text-2xl mt-5 cursor-pointer text-gray-200 hover:text-yellow-100" 
           /> {/* onclick function is used to switch the boolean value of iscollapsed, allowing the user to colllapse the sidebar upon clicking*/}
        </div>
          <div className="border-0 sm:border-b border-gray-200 mt-3 "> </div> {/*The line under the sidebar, used to separate the collapse icon from the sidebar icons*/  }
     </div>
     
      <div className=" hidden sm:flex flex-col gap-4 font-semibold items-center text-gray-200" > {/*the elements of the sidebar (icons + labels)*/ }
        <span className="flex flex-col gap-2 items-center">
          <TiWeatherPartlySunny 
            onClick = {()=> navigate(`/weather`)} 
            className={`text-4xl ${isActive(`/weather`) ? `text-yellow-100` : `hover:text-hover`}`}/>
          <button 
            onClick = {()=> navigate(`/weather`)}
            className={`hidden sm:block cursor-pointer ${isActive(`/weather`) ? `text-yellow-100` : `hover:text-hover`} `}>
            Weather
          </button>
       </span>

        <span className="flex flex-col gap-2 items-center">
          <FaCity 
            onClick = {()=> navigate(`/cities`)}
            className={`text-4xl ${isActive(`/cities`) ? `text-yellow-100` : `hover:text-hover`}`}/>
          <button 
            onClick = {()=> navigate(`/cities`)}
            className={`hidden sm:block cursor-pointer ${isActive(`/cities`) ? `text-yellow-100` : `hover:text-hover`} `}>
            Cities
          </button>
        </span>

        <span className="flex flex-col gap-2 items-center">
          <FaMap  
            onClick = {()=> navigate(`/map`)}
            className={`text-4xl ${isActive(`/map`) ? `text-yellow-100` : `hover:text-hover`}`}/>
          <button 
            onClick = {()=> navigate(`/map`)}
            className={`hidden sm:block cursor-pointer ${isActive(`/map`) ? `text-yellow-100` : `hover:text-hover`} `}>
            Map
          </button>
        </span>

        <span className="flex flex-col gap-2 items-center">
          <IoSettings 
            onClick = {()=> navigate(`/settings`)}
            className={`text-4xl ${isActive(`/settings`) ? `text-yellow-100` : `hover:text-hover`}`}/>
          <button 
              onClick = {()=> navigate(`/settings`)}
              className={`hidden sm:block cursor-pointer ${isActive(`/settings`) ? `text-yellow-100` : `hover:text-hover`} `}>
              Settings
            </button>
        </span>

      </div>
      
    </div>
  );



}
export default SideBar;