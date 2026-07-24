import { TiWeatherCloudy,TiWeatherDownpour } from "react-icons/ti";
import { RiDrizzleFill,RiMistFill  } from "react-icons/ri";
import { SiAccuweather } from "react-icons/si";
import { IoThunderstorm } from "react-icons/io5";
import { GiSnowing } from "react-icons/gi"; 
import { FaX } from "react-icons/fa6";

function WeatherIcon({weather}){ //A function which takes the icon as a prop/variable from the api to display the weather icon based on its condition
    if (weather === "Clouds")
         return <TiWeatherCloudy className="text-slate-300 text-[2rem] sm:text-[5rem]"/>;
     if (weather === "Clear") 
         return <SiAccuweather className="text-yellow-300 text-[2rem] sm:text-[5rem] transform transition duration-300 hover:rotate-360"/>;
     if (weather === "Rain")
         return <TiWeatherDownpour className="text-blue-400 text-[2rem] sm:text-[5rem] "/>
     if (weather === "Drizzle")
         return <RiDrizzleFill className="text-blue-300 text-[2rem] sm:text-[5rem]"/>
     if (weather === "Thunderstorm")
         return <IoThunderstorm className="text-blue-800 text-[2rem] sm:text-[10rem]"/>
     if (weather === "Snow")
         return <GiSnowing className="text-blue-200 text-[2rem] sm:text-[5rem] "/>
     if (weather === "Mist")
         return <RiMistFill  className="text-blue-200 text-[2rem] sm:text-[5rem]"/>
 }

//weather parameter is the weather data fetched from the api
 function CityCard({city,weather, onClick, onClear}){
  if (!weather) 
    return null;
  return (
    <div 
      onClick={onClick}
      className="flex items-start rounded-2xl bg-primary-light p-6 shadow-sm shadow-shadowColor hover:shadow-shadowColor-hover transition-transform hover:-translate-y-2 hover:shadow-sm duration-300 w-full">
      
      <div className="flex items-center justify-evenly gap-3  h-full flex-1">
        <div className="">
          <WeatherIcon 
          weather= {weather.weather[0].main} 
       
        />
        </div>
        
        <div className="flex flex-col">
          <p className="text-gray-200 font-semibold text-base sm:text-3xl ">{city.name}</p>
          <p className="text-gray-300 text-xs sm:text-base sm:w-45">{weather.weather[0].description}</p>
        </div>
      
          <div className="text-gray-200 text-xl sm:text-3xl font-semibold sm:w-20 ">{Math.round(weather.main.temp)}°C</div>
      
        
      </div>
     {onClear && <FaX className="text-gray-200" onClick={(e)=>{
      e.stopPropagation()
      onClear()
     }}/>}
      
    </div>
  );
 }
 export default CityCard
