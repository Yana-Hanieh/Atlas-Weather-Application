import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { TiWeatherCloudy,TiWeatherDownpour } from "react-icons/ti";
import { RiDrizzleFill,RiMistFill  } from "react-icons/ri";
import { SiAccuweather } from "react-icons/si";
import { IoThunderstorm } from "react-icons/io5";
import { GiSnowing } from "react-icons/gi";
import SearchBar from "../components/SearchBar";
import { getCoordsByCity, getForecastByCoords, getWeatherByCoords } from "../../api/weather";

//each element is the "city" parameter that will be used in the citycard function
const defaultCities = [ 
  {name:"New York", lat:40.7128, lon:74.0060},
  {name:"London", lat:51.5074, lon:0.1278},
  {name:"Shanghai", lat:31.2304, lon:121.4737},
  {name:"Tokyo", lat:35.6764, lon:139.6500},
  {name:"Mağusa", lat:35.1250, lon:33.9424},
]

 function CityIcon({icon}){ //A function which takes the icon as a prop/variable from the api to display the weather icon based on its condition
    if (icon === "Clouds")
         return <TiWeatherCloudy className="text-slate-300 text-[2rem] sm:text-[5rem]"/>;
     if (icon === "Clear") 
         return <SiAccuweather className="text-yellow-300 text-[2rem] sm:text-[5rem] transform transition duration-300 hover:rotate-360"/>;
     if (icon === "Rain")
         return <TiWeatherDownpour className="text-blue-400 text-[2rem] sm:text-[5rem] "/>
     if (icon === "Drizzle")
         return <RiDrizzleFill className="text-blue-300 text-[2rem] sm:text-[5rem]"/>
     if (icon === "Thunderstorm")
         return <IoThunderstorm className="text-blue-800 text-[2rem] sm:text-[10rem]"/>
     if (icon === "Snow")
         return <GiSnowing className="text-blue-200 text-[2rem] sm:text-[5rem] "/>
     if (icon === "Mist")
         return <RiMistFill  className="text-blue-200 text-[2rem] sm:text-[5rem]"/>
 }

 //weather parameter is the weather data fetched from the api
 function CityCard({city,weather, onClick}){
  if (!weather) 
    return null;
  return (
    <div 
      onClick={onClick}
      className="border rounded-2xl bg-primary-light p-8 flex flex-row gap-6 shadow-lg shadow-cyan-950 hover:shadow-cyan-900 transition-transform hover:-translate-y-2 hover:shadow-lg duration-300 items-center w-full">
      <div className="flex items-center gap-2 sm:gap-8">
        <CityIcon icon= {weather.weather[0].main} />
        <div className="flex flex-col">
          <p className="text-gray-200 font-semibold text-md sm:text-3xl">{city.name}</p>
          <p className="text-gray-300 text-sm sm:text-xl">{weather.weather[0].description}</p>
        </div>
      </div>
      
      <p className="text-gray-200 text-3xl font-semibold ">{Math.round(weather.main.temp)}°C</p>
    </div>
  );
 }


 function Cities({weatherData, forecastData}) {
    const [searchCity, setSearchCity] = useState(""); //cities entered by the user
    const [weatherByCity, setWeatherByCity] = useState([]); //an array saving the current data displayed for each city
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const allCities = [...defaultCities, ...searchCity]; //combined list of the default and searched city, used to easily display the cities 
   
   useEffect(() => { //fetch the current weather for every city in the list whenever list changes
      allCities.forEach((city) => { //checks each city element in the allCity array
        if (weatherByCity[city.name]) //checks if the data is already in the array (fetched) => skip it
          return;

        //if city isnt found in the array (new city not displayed)
        getWeatherByCoords(city.lat,city.lon) 
          .then((data) =>{
            //takes a function as a parameter, and updates prev with all existing citys in weatherByCity, and overwrites the city with the same key (city name); prev is the current state value before the update
            setWeatherByCity((prev) => ({...prev,[city.name]:data})) //try setWeatherByCity({[city.name]: data})
          })
          .catch((err) => console.error(err));
      });
   }, [searchCity]);
   
    const handleSearch = async (cityName) => {
      cityName.preventDefault(); //prevents browser from default reloading
      if (input.trim() === "") //if input is empty, dont fetch any data
        return; 
      try { 
        const coords = await getCoordsByCity(input); 
        setSearchedCity((prev) => [...prev, { name: input, ...coords }]); 
        setInput(""); //clears the search bar
      } catch (err) { 
        console.error(err); 
      } 
    }; 

    
  return (
    <div className=" flex flex-row gap-3 px-4 pb-4 items-stretch min-h-screen w-full"> {/* search bar and side bar are aligned from the top so they start in the same height */}
      <div className="flex flex-col lg:flex-row gap-3 flex-1 min-w-0 items-stretch">
        <div className="flex flex-col gap-5 flex-1 min-w-0">
          <SearchBar 
            onSearch={handleSearch} //triggers the search logic without having the coords,states, or api
            input={searchCity} 
            setInput={setSearchCity} //the input will be changed every key is pressed
          />
          {/* {searchedCities.length === 0 && (
          <p className="text-gray-400 text-sm">Search above to add more cities to this list.</p>
        )} */}
          <div className="flex flex-col gap-7">
            {allCities.map((city) =>(
              <CityCard
                key={city.name}
                city={city}
                weather={weatherByCity[city.name]} 
                onClick = {() => navigate(`/weather?city=${encodeURIComponent(city.name)}`)}
              />
            ))}
        </div>
      </div>
      </div>
    </div>
  )
}
export default Cities