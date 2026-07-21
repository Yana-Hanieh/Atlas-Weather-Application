import { TiWeatherCloudy,TiWeatherDownpour } from "react-icons/ti";
import { RiDrizzleFill,RiMistFill  } from "react-icons/ri";
import { SiAccuweather } from "react-icons/si";
import { IoThunderstorm } from "react-icons/io5";
import { GiSnowing } from "react-icons/gi";
import TodayCard from "./TodayCard.jsx";
import AirConditionsCard from "./AirConditionsCard.jsx";
import WeekCard from "./WeekCard.jsx";


function WeatherIcon({weather}){ //A function which takes the icon as a prop/variable from the LocationData to display the weather icon based on its condition
   if (weather === "Clouds")
        return <TiWeatherCloudy className="text-slate-300 text-[5rem] sm:text-[10rem] "/>;
    if (weather === "Clear") 
        return <SiAccuweather className="text-yellow-300 text-[5rem] sm:text-[10rem] transform transition duration-300 hover:rotate-360"/>;
    if (weather === "Rain")
        return <TiWeatherDownpour className="text-blue-400 text-[5rem] sm:text-[10rem] "/>
    if (weather === "Drizzle")
        return <RiDrizzleFill className="text-blue-300 text-[5rem] sm:text-[10rem]"/>
    if (weather === "Thunderstorm")
        return <IoThunderstorm className="text-blue-800 text-[5rem] sm:text-[10rem]"/>
    if (weather === "Snow")
        return <GiSnowing className="text-blue-200 text-[5rem] sm:text-[10rem]"/>
    if (weather === "Mist")
        return <RiMistFill  className="text-blue-200 text-[5rem] sm:text-[10rem]"/>
}

function DisplayCard({weatherData, forecastData, loading, error}){ //enter the location, tempreater, rain percentage, and corresponding icon for the weather
   if (loading){ //if its fetching the data show a message
    return <p className="text-gray-100 text-2xl m-20 ">Loading Weather....</p>;
   }
   if (error){ //if an error occurs show a warning
    return <p className="text-red-600 text-2xl m-20">{error}</p>;
   }
   if (!weatherData){ //if there's no data, dont render
    return null;
   }

   const {name,main,weather,clouds} = weatherData; //save the weather data into the 4 seperate variables to easily call
   const description = weather[0].description; //a variable containing the description element of the "weather" array, NOTE: its written separatly since its an element of a nested array => destructuring would'nt work
   const condition = weather[0].main; //a variable containing the main element found in the "weather" array  which helps choose the weather icon, NOTE: its the main element inside the weather array, 
   
    return(
        <div className="flex flex-col lg:flex-row w-full h-full"> {/*display the hooks/cards in the same row*/}
            <div className="flex flex-col gap-5 flex-1 min-w-0"> {/*display the hooks/cards in the same column*/}
                <div className="flex flex-row justify-between ml-10 max-w-230">
                    <div className="flex flex-col gap-12 ">
                        <div>
                            <h1 className="font-semibold text-gray-100 text-5xl mt-4">{name}</h1> 
                            <p className="font-light text-gray-300 text-md mt-2 ml-1 mb-8">{description}</p>
                        </div>
                        <h1 className="font-bold text-gray-100 text-5xl">{Math.round(main.temp)}°C</h1>
                    </div>
                    <WeatherIcon weather={condition} />
                </div>

                <div className="mt-8 flex flex-col gap-10">
                    <div className=" hover:shadow-cyan-900 transition-transform hover:-translate-y-2 hover:shadow-lg duration-300 rounded-xl">
                        <TodayCard forecastData={forecastData}/> {/*use the TodayCard hook as first card containing the current weather data */}
                    </div>
                    <AirConditionsCard weatherData={weatherData}/> {/*use the AirConditionsCard hook as a second card containing the air con ditions data */}
                </div>

            </div>
        </div>
    )
}
export default DisplayCard