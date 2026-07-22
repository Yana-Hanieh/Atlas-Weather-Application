import { TiWeatherCloudy,TiWeatherDownpour } from "react-icons/ti";
import { RiDrizzleFill,RiMistFill  } from "react-icons/ri";
import { SiAccuweather } from "react-icons/si";
import { IoThunderstorm } from "react-icons/io5";
import { GiSnowing } from "react-icons/gi"; 
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
 function CityCard({city,weather, onClick}){
  if (!weather) 
    return null;
  return (
    <div 
      onClick={onClick}
      className="rounded-2xl bg-primary-light p-6 shadow-lg shadow-shadowColor hover:shadow-shadowColor-hover transition-transform hover:-translate-y-2 hover:shadow-lg duration-300 items-center w-full">
      <div className="flex items-center justify-between sm:ml-25 sm:mr-20">
        <WeatherIcon 
          weather= {weather.weather[0].main} 
        />
        <div className="flex flex-col">
          <p className="text-gray-200 font-semibold text-base sm:text-3xl sm:w-60">{city.name}</p>
          <p className="text-gray-300 text-xs sm:text-base sm:w-45">{weather.weather[0].description}</p>
        </div>
        <p className="text-gray-200 text-xl sm:text-3xl font-semibold sm:w-20">{Math.round(weather.main.temp)}°C</p>
      </div>
      
      
    </div>
  );
 }
 export default CityCard
