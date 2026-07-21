import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
  const isActive = (Path) => location.pathname === Path; //returns true of the button's path matches the current URL
  const [iscollapsed, setIsCollapsed] = useState(false); //usestate used to to switch boolean value => allowing user to collapse and expand the sidebar, initially set to false since the sidebar is initially expanded
  const NavigationLinks = [
    {Label: "Weather", Path:"/weather", Icon:TiWeatherPartlySunny },
    {Label: "Cities", Path:"/cities", Icon:FaCity },
    {Label: "Map", Path:"/map", Icon:FaMap },
    {Label: "Settings", Path:"/settings", Icon:IoSettings },
  ]
  return ( //if the iscollapsed is false this return function will be executed, this is the default state, the icons along with the labels will show
    <div
      className={`bg-primary-light z-50 rounded-xl text-white absolute sm:relative flex flex-col ring-1 ring-hover sm:ring-0 transition-all duration-300 ease-in-out
        
        ${iscollapsed ? ` w-16 sm:w-20 gap-5 items-center pb-6` : `w-16 h-fit sm:h-screen sm:w-35 gap-6 sm:gap-10 `}`} 
      >
        
      {/*top section of the sidebar that constains label, collapse icon, and line*/} 
      <div> 
        <div className="flex flex-row gap-5 items-center justify-center"> {/*the label and collapse icon are in a flex row so they are on the same row/x-axis*/ }
          {!iscollapsed &&(
            <h2 className="hidden md:block text-xl mt-5">Sidebar</h2>
          )}
         
          {iscollapsed ? (
          
              <GoSidebarCollapse 
                  onClick={() => setIsCollapsed(!iscollapsed)} //onclick function is used to switch the boolean value of iscollapsed, allowing the user to expand the sidebar upon clicking
                  className="text-3xl mt-5 cursor-pointer flex item-center justify-center text-gray-200 hover:text-yellow-100" />
             ):(
              <GoSidebarExpand 
                onClick={()=> setIsCollapsed(!iscollapsed)} //onclick function is used to switch the boolean value of iscollapsed, allowing the user to colllapse the sidebar upon clicking
                className="text-2xl mt-5 cursor-pointer text-gray-200 hover:text-yellow-100" 
              /> 
            )}
   
        </div> 
      
        {/*The line under the sidebar, used to separate the collapse icon from the sidebar icons*/}
        <div className={`mt-3 
          ${iscollapsed ? "border-b border-white w-full":" border-0 sm:border-b border-gray-200"}`}></div> 
        </div> 
          {/*the elements of the sidebar (icons + labels)*/ }
          <div className= {`flex flex-col gap-4 font-semibold items-center text-gray-200 
            ${iscollapsed ? "gap-10":"hidden sm:flex gap-4"}`}> 
            
            {NavigationLinks.map(({Label,Path,Icon}) => (
              <span 
                key={Path}
                className="flex flex-col gap-2 items-center">
                  <Icon 
                    onClick={() => navigate(Path)}
                    className={`text-3xl cursor-pointer 
                    ${isActive(Path)? "text-yellow-100":"hover:text-hover"}`}
                  />
                  {!iscollapsed && (
                    <button
                      onClick ={() => navigate(Path)}
                      className= {`hidden sm:block cursor-pointer 
                      ${isActive(Path) ? "text-yellow-100": "hover:text-hover"}`}>
                      {Label}
                    </button>
                  )}
              </span>
             ))}
          </div>
        </div>    
  
  );
}
export default SideBar;