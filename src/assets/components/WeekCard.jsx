import { TiWeatherCloudy,TiWeatherDownpour } from "react-icons/ti";
import { RiDrizzleFill,RiMistFill  } from "react-icons/ri";
import { SiAccuweather } from "react-icons/si";
import { IoThunderstorm } from "react-icons/io5";
import { GiSnowing } from "react-icons/gi";

function WeekIcon({icon}){ //A function which takes the icon as a prop/variable from the LocationData to display the weather icon based on its condition
     if (icon === "Clear") 
        return <SiAccuweather className="text-yellow-300 text-4xl"/>;
    if (icon === "Rain")
        return <TiWeatherDownpour className="text-blue-400 text-4xl"/>
    if (icon === "Drizzle")
        return <RiDrizzleFill className="text-blue-300 text-4xl"/>
    if (icon === "Thunderstorm")
        return <IoThunderstorm className="text-blue-800 text-4xl"/>
    if (icon === "Snow")
        return <GiSnowing className="text-blue-200 text-4xl"/>
    if (icon === "Mist")
        return <RiMistFill  className="text-blue-200 text-4xl"/>
   }

function groupForecastByDay(forecastData){ //turns 40 3hr entries into 5 daily summaries
    const grouped ={} //will hold one array of enteires per day
    // if(!forecastData) //if no data available, return and empty list guard
    //     return[];


    forecastData.list.forEach((entry) =>{
        const date = entry.dt_txt.split(" ")[0]; //dt_txt displays "date time" so split the space and take only the date  
    if (!grouped[date]){
        grouped[date]=[]; //start a new entry for each day 
    }
        grouped[date].push(entry); //add the new date into the entry 
    });

    return Object.keys(grouped).map((date) => {
        const entries = grouped[date];
        const temps = entries.map((t) => t.main.temp);
        const high = Math.round(Math.max(...temps));
        const low = Math.round(Math.min(...temps));
        const midday = entries.find((e) => e.dt_txt.includes("12:00:00")) || entries[0]; 
        const dayName = new Date(date).toLocaleDateString("en-US",{weekday:"long"})

        return {
            date,
            dayName,
            condition:midday.weather[0].main,
            description:midday.weather[0].description,
            high,
            low,
        };  
    })
}


function WeekCard({forecastData}){
    if (!forecastData) return null; //if data doesnt exist, dont render the page
    const weekData = groupForecastByDay(forecastData); //actually calls the grouping function

    return(
        <div className="flex flex-col bg-primary-light shadow-lg shadow-shadowColor rounded-xl h-full p-5 justify-between w-full">
            <h2 className="font-medium text-white text-2xl">6 Day Forecast</h2>
            <div className="flex flex-col justify-between flex-1">
                
                {weekData.map((day,index) => (
                    <div key={index} 
                        className="flex-1 text-sm sm:text-lg text-gray-200 font-medium flex flex-row items-center gap-2 py-4 border-b-2 border-gray-400 last:border-b-0 hide-scrollbar">
                        <p title={day.dayName} className="truncate w-18">{day.dayName}</p>
                        <p className="w-15 flex justify-center"><WeekIcon icon={day.condition} /></p>
                        <p title={day.description} className="truncate w-16 text-xs sm:text-sm">{day.description}</p>
                        <p className="w-15 text-right text-xs sm:text-sm">{day.high}/{day.low}</p>
                    </div>
                    
                ))}
            </div>
        </div>
    )
}
export default WeekCard