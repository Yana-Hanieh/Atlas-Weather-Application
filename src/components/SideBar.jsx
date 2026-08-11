import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {  GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { FaCity,FaMap } from "react-icons/fa";
import { useState} from "react";
import Weather from "../pages/Weather";
import Cities from "../pages/Cities";
import Map from "../pages/Map";


function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();//gives access to the current url info including the pathname
  const isActive = (Path) => location.pathname === Path; //returns true of the button's path matches the current URL
  const [iscollapsed, setIsCollapsed] = useState(false); //usestate used to to switch boolean value => allowing user to collapse and expand the sidebar, initially set to false since the sidebar is initially expanded
  const NavigationLinks = [
    {Label: "Weather", Path:"/weather", Icon:TiWeatherPartlySunny },
    {Label: "Cities", Path:"/cities", Icon:FaCity },
    {Label: "Map", Path:"/map", Icon:FaMap },
  ]
  return ( //if the iscollapsed is false this return function will be executed, this is the default state, the icons along with the labels will show
    <div
      className={`bg-primary-light z-50 rounded-r-xl text-white absolute sm:relative flex flex-col ring-1 ring-hover sm:ring-0 transition-all duration-300 ease-in-out mt-3 sm:mt-0 sm:pt-3
        ${iscollapsed ? ` w-16 sm:w-20 gap-5 items-center pb-6 ` : `mt-4 w-10 h-fit sm:h-screen sm:w-35 gap-6 sm:gap-10 `}`} 
      >
        
      {/*top section of the sidebar that constains label, collapse icon, and line*/} 
      <div> 
        <div className="flex flex-row gap-5 items-center justify-center h-10 p-2"> {/*the label and collapse icon are in a flex row so they are on the same row/x-axis*/ }
          {!iscollapsed &&(
            <h2 className="hidden sm:block text-xl ">Atlas Weather</h2>
          )}
         
          {iscollapsed ? (
              <GoSidebarCollapse 
                  onClick={() => setIsCollapsed(!iscollapsed)} //onclick function is used to switch the boolean value of iscollapsed, allowing the user to expand the sidebar upon clicking
                  className="text-3xl mt-5 cursor-pointer flex item-center justify-center text-gray-200 hover:text-yellow-100" />
             ):(
              <GoSidebarExpand 
                onClick={()=> setIsCollapsed(!iscollapsed)} //onclick function is used to switch the boolean value of iscollapsed, allowing the user to colllapse the sidebar upon clicking
                className="text-4xl cursor-pointer text-gray-200 hover:text-yellow-100" 
              /> 
            )}
   
        </div> 
      
        {/*The line under the sidebar, used to separate the collapse icon from the sidebar icons*/}
        <div className={` 
          ${iscollapsed ? "border-b border-white w-full mt-3":" border-0 sm:border-b border-gray-200 sm:mt-3"}`}></div> 
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