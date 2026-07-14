import {  GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { FaCity,FaMap } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { useState} from "react";

function SideBar() {

  const [iscollapsed, setIsCollapsed] = useState(false); //usestate used to to switch boolean value => allowing user to collapse and expand the sidebar, initially set to false since the sidebar is initially expanded
  if (iscollapsed) { //if the iscollapsed is true this return function will be executed
    return ( //return clause if the sidebar is collapsed (iscollapsed=true), only the icons will show
      <div className="bg-primary-light rounded-xl text-white w-16 sm:w-20 flex flex-col gap-5 items-center">
        <div className="text-3xl mt-5 cursor-pointer flex item-center justify-center" onClick={() => setIsCollapsed(!iscollapsed)}><GoSidebarCollapse className="hover:text-yellow-100" /></div> {/*onclick function is used to switch the boolean value of iscollapsed, allowing the user to expand the sidebar upon clicking*/}
        <div className="border-b border-white w-full"> </div> {/*The line under the sidebar, used to separate the expand icon from the sidebar icons*/}
        <div className="mt-5 flex flex-col gap-10 text-4xl text-gray-200 font-semibold"> {/*the icons in the sidebar*/ }
          <TiWeatherPartlySunny className="hover:text-yellow-100" />
          <FaCity className="hover:text-yellow-100"/>
          <FaMap className="hover:text-yellow-100"/>
          <IoSettings className="hover:text-yellow-100"/></div>
      </div>
    );

  }
  return ( //if the iscollapsed is false this return function will be executed, this is the default state, the icons along with the labels will show
    <div className="bg-primary-light rounded-xl text-white w-16 sm:w-35  flex flex-col gap-6 sm:gap-10">
      <div> {/*top section of the sidebar that constains label, collapse icon, and line*/} 
        <div className="flex flex-row gap-5 items-center justify-center"> {/*the label and collapse icon are in a flex row so they are on the same row/x-axis*/ }
          <h2 className="hidden md:block text-xl mt-5">Sidebar</h2>
          <GoSidebarExpand className="text-2xl mt-5 cursor-pointer text-gray-200 hover:text-yellow-100" onClick={()=> setIsCollapsed(!iscollapsed)}/> {/* onclick function is used to switch the boolean value of iscollapsed, allowing the user to colllapse the sidebar upon clicking*/}
        </div>
          <div className="border-b border-gray-200 mt-3 "> </div> {/*The line under the sidebar, used to separate the collapse icon from the sidebar icons*/  }
     </div>
     
     
      <div className="flex flex-col gap-4 font-semibold items-center text-gray-200" > {/*the elements of the sidebar (icons + labels)*/ }
        <TiWeatherPartlySunny className="text-4xl" />
        <button className="hidden sm:block hover:text-yellow-100 cursor-pointer "> Weather</button>
        <FaCity className="text-4xl"/>
        <button className="hidden sm:block hover:text-yellow-100 cursor-pointer">Cities</button>
        <FaMap className="text-4xl"/>
        <button className="hidden sm:block hover:text-yellow-100 cursor-pointer">Map</button>
        <IoSettings className="text-4xl text-gray-300"/>
        <button className="hidden sm:block hover:text-yellow-100 cursor-pointer">Settings</button>
      </div>
    </div>
  );
}
export default SideBar;