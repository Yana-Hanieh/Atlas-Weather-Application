import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { TiWeatherCloudy,TiWeatherDownpour } from "react-icons/ti";
import { RiDrizzleFill,RiMistFill  } from "react-icons/ri";
import { SiAccuweather } from "react-icons/si";
import { IoThunderstorm } from "react-icons/io5";
import { GiSnowing } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { RxCross1 } from "react-icons/rx";
import TodayCard from "./TodayCard.jsx";
import WeekCard from "./WeekCard.jsx";
import { MdDescription } from "react-icons/md";

function WeatherIcon({weather}){ //A function which takes the icon as a prop/variable from the api to display the weather icon based on its condition
    if (weather === "Clouds")
         return <TiWeatherCloudy className="text-slate-300 text-[3rem] sm:text-[5rem]"/>;
     if (weather === "Clear") 
         return <SiAccuweather className="text-yellow-300 text-[3rem] sm:text-[5rem] transform transition duration-300 hover:rotate-360"/>;
     if (weather === "Rain")
         return <TiWeatherDownpour className="text-blue-400 text-[3rem] sm:text-[5rem] "/>
     if (weather === "Drizzle")
         return <RiDrizzleFill className="text-blue-300 text-[3rem] sm:text-[5rem]"/>
     if (weather === "Thunderstorm")
         return <IoThunderstorm className="text-blue-800 text-[3rem] sm:text-[10rem]"/>
     if (weather === "Snow")
         return <GiSnowing className="text-blue-200 text-[3rem] sm:text-[5rem] "/>
     if (weather === "Mist")
         return <RiMistFill  className="text-blue-200 text-[3rem] sm:text-[5rem]"/>
 }

function CityDetails({city,weatherData,forecastData,onClose}) {
    if (!weatherData)
        return <p className="text-gray-300">Loading Details...</p>;
    if (!city){
        return <div className="h-full w-full"></div>
    }
   const {name,main,weather,clouds} = weatherData; //save the weather data into the 4 seperate variables to easily call
   const description = weather[0].description; //a variable containing the description element of the "weather" array, NOTE: its written separatly since its an element of a nested array => destructuring would'nt work
   const condition = weather[0].main; //a variable containing the main element found in the "weather" array  which helps choose the weather icon, NOTE: its the main element inside the weather array, 
   
    return(
        <div className="bg-primary-light shadow-lg shadow-shadowColor hover:shadow-shadowColor-hover transition-transform hover:shadow-lg duration-300 rounded-xl h-170 p-4 overflow-hidden">
          <button 
            onClick={onClose}
            className="flex items-center justify-center rounded-2xl w-8 h-5 text-white cursor-pointer float-right"
            >
            <RxCross1 className="hover:text-hover"/>
        </button>
        
            <div className="flex flex-row m-3 gap-3 py-3">
                <div className="flex flex-col gap-3">
                    <h1 className="font-semibold text-gray-100 text-xl sm:text-3xl sm:w-35">{city.name}</h1>
                    <h4 className="text-gray-300 text-sm sm:text-base w-30">{description} </h4>
                    <h1 className="font-bold text-gray-100 text-3xl w-15">{Math.round(main.temp)}°C</h1>
                </div>
                <div className="ml-2 mt-4 sm:ml-10 sm:mt-3">
                    <WeatherIcon weather={condition}/>
                </div> 
            </div>

            <div className="border-t text-gray-300 w-full"></div>

            <TodayCard forecastData={forecastData}/>
            <div className="border-t text-gray-300 w-full"></div>
            <div className="flex justify-center overflow-x-auto max-h-90 sm:max-h-80 gap-2 hide-scrollbar">
                <WeekCard forecastData={forecastData}/>
            </div>

            
        </div>
    )
    
}
export default CityDetails