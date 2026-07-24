import { TiWeatherCloudy,TiWeatherDownpour } from "react-icons/ti";
import { RiDrizzleFill,RiMistFill  } from "react-icons/ri";
import { SiAccuweather } from "react-icons/si";
import { IoThunderstorm } from "react-icons/io5";
import { GiSnowing } from "react-icons/gi";

function WeatherIcon({weather}){ //A function which takes the weaher as a prop/variable from the LocationData to display the weather icon based on its condition
    if (weather === "Clear") 
        return <SiAccuweather className="text-yellow-300 text-4xl"/>;
    if (weather === "Rain")
        return <TiWeatherDownpour className="text-blue-400 text-4xl"/>
    if (weather === "Drizzle")
        return <RiDrizzleFill className="text-blue-400 text-4xl"/>
    if (weather === "Thunderstorm")
        return <IoThunderstorm className="text-blue-800 text-4xl"/>
    if (weather === "Snow")
        return <GiSnowing className="text-blue-200 text-4xl"/>
    if (weather === "Mist")
        return <RiMistFill  className="text-blue-200 text-4xl"/>
   }

function TodayCard({forecastData}){
    if (!forecastData) return null; //if data doesnt exist, dont render the page
    const hourData = forecastData.list.slice(0,8); //takes the first 8 entries, 3hrs apart 
    return(
        <div className=" bg-primary-light auto shadow-sm shadow-shadowColor rounded-xl items-center px-4 py-2 w-full">
            <h2 className="font-medium text-white text-lg sm:text-2xl mt-3">Today's Forecast</h2>
            <div className="flex overflow-x-auto gap-2 hide-scrollbar"> {/*grid layout used to display the hrs, temp, and icon in a grid format*/}
                {hourData.map((Data,index) => ( 
                    <div key={index} className="shrink-0 w-24 sm:w-32 text-center text-gray-200 text-sm sm:text-lg mt-4 border-r-2 border-gray-300 last:border-0"> {/*use map function to loop through HoursData file which contains the hrs,temp and icon*/}
                        <p className="text-xl">{Data.dt_txt.slice(11,16)}</p>  {/*slice is used to remove the date, providing only the time (00:00) of the day, */}
                        <p className="flex justify-center my-3">
                            <WeatherIcon weather={Data.weather[0].main}/> {/*displays the weather of the first and only object in the array */}
                        </p>
                        <p className="text-xl">{Math.round(Data.main.temp)}°C</p> {/*rounds up the temp to remove decimals  */}
                    </div>
                ))}
            </div>
        </div>
    )
}
export default TodayCard