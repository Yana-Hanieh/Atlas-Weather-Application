import { useState } from "react";
import { TiWeatherCloudy,TiWeatherDownpour } from "react-icons/ti";
import { RiDrizzleFill,RiMistFill  } from "react-icons/ri";
import { SiAccuweather } from "react-icons/si";
import { IoThunderstorm } from "react-icons/io5";
import { GiSnowing } from "react-icons/gi";
import SearchBar from "../components/SearchBar";
import { getCoordsByCity } from "../../api/weather";


 function LocationIcon({icon}){ //A function which takes the icon as a prop/variable from the api to display the weather icon based on its condition
    if (icon === "Clouds")
         return <TiWeatherCloudy className="text-slate-300 text-[5rem] sm:text-[10rem] "/>;
     if (icon === "Clear") 
         return <SiAccuweather className="text-yellow-300 text-[5rem] sm:text-[10rem] transform transition duration-300 hover:rotate-360"/>;
     if (icon === "Rain")
         return <TiWeatherDownpour className="text-blue-400 text-[5rem] sm:text-[10rem] "/>
     if (icon === "Drizzle")
         return <RiDrizzleFill className="text-blue-300 text-[5rem] sm:text-[10rem]"/>
     if (icon === "Thunderstorm")
         return <IoThunderstorm className="text-blue-800 text-[5rem] sm:text-[10rem]"/>
     if (icon === "Snow")
         return <GiSnowing className="text-blue-200 text-[10rem] "/>
     if (icon === "Mist")
         return <RiMistFill  className="text-blue-200 text-[5rem] sm:text-[10rem]"/>
 }

 function Cities({weatherData, forecastData}) {
    const [searchInput, setSearchInput] = useState("");
    const [input, setInput] = useState();
    const [error, setError] = useState();
    const handleSearch = async(cityName) => { //an event handler that gets called by the SearchBar when the user submits a search, it only handles the coordinates
        try{
          const coords= await getCoordsByCity(cityName); //converts the coordinates of the searched city into lat and lon coordinates
          setLocation (coords); //updates the location which triggeres the existing fetch-effect in the weather.js file automatically
        }
        catch(err){
          console.error(err); //temporary error used until the real error state arrives
            //setError(err.message) the actual error handeling case
        }
      };
  {/**City cards
    const {name,main,weather,clouds} = weatherData;
    const condition = weather[0].main; //a variable containing the main element found in the "weather" array  which helps choose the weather icon, NOTE: its the main element inside the weather array, 
 */}
    
  return (
    <div className=" bg-primary flex flex-row gap-3 px-4 pb-4 items-stretch min-h-screen w-full"> {/* search bar and side bar are aligned from the top so they start in the same height */}
      <div className="flex flex-col lg:flex-row gap-3 flex-1 min-w-0 items-stretch">
        <div className="flex flex-col gap-5 flex-1 min-w-0">
        <SearchBar 
          onSearch={handleSearch} //triggers the search logic without having the coords,states, or api
          input={searchInput} 
          setInput={setSearchInput} //the input will be changed every key is pressed
        />

         {/**City cards */}
        <div className="border rounded-2xl bg-primary-light px-4 py-8 flex flex-row gap-2 shadow-lg shadow-cyan-950 hover:shadow-cyan-900 transition-transform hover:-translate-y-2 hover:shadow-lg duration-300 items-center w-full">
          <span className="">
            <GiSnowing />
          </span>
          <div className="flex flex-col gap-2 text-gray-300">
            <span className=""></span>
            hello
         </div>
        </div>
        

      </div>
      <div className="w-full lg:w-80 shrink-0 lg:mt-13">
            {/* use the WeekCard hook as a third card containing the weekly weather data (displayed on the rightside of the screen) */}
      </div>
      </div>
    </div>
  )
}
export default Cities