import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { TiWeatherCloudy,TiWeatherDownpour } from "react-icons/ti";
import { RiDrizzleFill,RiMistFill  } from "react-icons/ri";
import { SiAccuweather } from "react-icons/si";
import { IoThunderstorm } from "react-icons/io5";
import { GiSnowing } from "react-icons/gi";
import { getCoordsByCity, getForecastByCoords, getWeatherByCoords } from "../../api/weatherApi";
import SearchBar from "../components/SearchBar";
import CityDetails from "../components/CityDetails";

//each element is the "city" parameter that will be used in the citycard function
const defaultCities = [ 
  {name:"New York", lat:40.7128, lon:-74.0060},
  {name:"London", lat:51.5074, lon:-0.1278},
  {name:"Shanghai", lat:31.2304, lon:121.4737},
  {name:"Tokyo", lat:35.6812, lon: 139.7671}
]

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
      className="rounded-2xl bg-primary-light p-6 shadow-lg shadow-cyan-950 hover:shadow-cyan-900 transition-transform hover:-translate-y-2 hover:shadow-lg duration-300 items-center w-full">
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

 function Cities() {
    const [searchCity, setSearchCity] = useState([]); //cities entered by the user
    const [weatherByCity, setWeatherByCity] = useState({}); //an obj saving the current weather data displayed for each city
    const [forecastByCity, setForecastByCity] = useState({}) //an obj saving the current forecast data displayed for each city
    const [input, setInput] = useState("");
    const [selectedCity, setSelectedCity] = useState(null); //used to determine if the city card is pressed
    const navigate = useNavigate();
    const searchedCities = new Set(searchCity.map((c) => c.name.toLowerCase()));
    const filteredDefaultCities= defaultCities.filter((city)=> !searchedCities.has(city.name.toLowerCase()));
    const allCities = [...[...searchCity].reverse(),...filteredDefaultCities]; //combined list of the default and searched city, used to easily display the cities 
    
   useEffect(() => { //fetch the current weather for every city in the list whenever list changes
      allCities.forEach((city) => { //checks each city element in the allCity array
        if (weatherByCity[city.name]) //checks if the data is already in the array (fetched) => skip it
          return;

        //if city isnt found in the array (new city not displayed) then we get the city's weather using its coords
        getWeatherByCoords(city.lat,city.lon) 
          .then((data) =>{
            //takes a function as a parameter, and updates prev with all existing citys in weatherByCity, and overwrites the city with the same key (city name); prev is the current state value before the update
            setWeatherByCity((prev) => ({...prev,[city.name]:data})) //we  to have save all the elements of the array and present them, if we used this instead setWeatherByCity({[city.name]: data}) then only the last array element will be displayed
          })
          .catch((err) => console.error(err));
      });
   }, [searchCity]);

   useEffect(() => {
    allCities.forEach((city) =>{
      if (forecastByCity[city.name])
        return;

      getForecastByCoords(city.lat,city.lon)
      .then((data) =>{
        setForecastByCity((prev) => ({...prev,[city.name]:data}))
      })
      .catch((err) => console.error(err));
    })
   }, [searchCity]);

    const handleSearch = async (cityName) => {
     if (cityName.trim() === "") //if input is empty, dont fetch any data
        return; 
      try { 
        const coords = await getCoordsByCity(cityName); 
        setSearchCity((prev) => {
          const filteredSearchedCities = prev.filter((c) => c.name.toLowerCase() !== cityName.trim().toLowerCase()); //checks if the previously searched names match the newly searched city name 
          return [...filteredSearchedCities, { name: cityName, ...coords }]}); //adds the newly distinct searched city into the filtered search list
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
          {searchCity.length === 0 && (
            <p className="text-gray-400 text-sm sm:text-base text-center mt-3">Search above to add more cities to this list.</p>
          )}

          <div className="flex flex-col gap-7 mt-3 cursor-pointer">
            {allCities.map((city) =>(
              <CityCard
                key={city.name}
                city={city}
                weather={weatherByCity[city.name]} 
                onClick = {() => setSelectedCity(city)
              }
              />
            ))}
          </div>
        </div>

        {selectedCity &&(
          <div className="w-full lg:w-80 shrink-0 lg:mt-13">
            <CityDetails 
              city={selectedCity}
              weatherData= {weatherByCity[selectedCity.name]}
              forecastData={forecastByCity[selectedCity.name]}
              onClose={() => setSelectedCity(null)}/>
          </div>
        )}


      </div>
    </div>
  )
}
export default Cities