import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getCoordsByCity, getForecastByCoords, getWeatherByCoords } from "../api/weatherApi";
import { IoWarningOutline } from 'react-icons/io5'
import SearchBar from "../components/SearchBar";
import CityDetails from "../components/CityDetails";
import CityCard from "../components/CityCard";


//each element is the "city" parameter that will be used in the citycard function
  const defaultCities = [
  {name:"London", lat:51.5074, lon:-0.1278},
  {name:"New York", lat:40.7128, lon:-74.0060},
  {name:"Shanghai", lat:31.2304, lon:121.4737},
  {name:"Tokyo", lat:35.6812, lon: 139.7671}
]

 function Cities() {
    const [searchCity, setSearchCity] = useState([]); //cities entered by the user
    const [weatherByCity, setWeatherByCity] = useState({}); //an obj saving the current weather data displayed for each city
    const [forecastByCity, setForecastByCity] = useState({}) //an obj saving the current forecast data displayed for each city
    const [input, setInput] = useState("");
    const [selectedCity, setSelectedCity] = useState(null); //used to determine if the city card is pressed
    const [searchError, setSearchError] = useState(null) // used for the search warning, if user inputs wrong city names
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

      setSearchError(null);
      try { 
        const coords = await getCoordsByCity(cityName); 
        const newCity = {...coords, name:cityName.trim()};

        setSearchCity((prev) => {
          const filteredSearchedCities = prev.filter((c) =>
            c.name.trim().toLowerCase() !== cityName.trim().toLowerCase() //checks if the previously searched names match the newly searched city name 
            && !(Math.abs(c.lat - coords.lat) < 0.01 && Math.abs(c.lon - coords.lon) < 0.01) //checks for lat and lon matches and removes them
          );
          return [...filteredSearchedCities, { ...coords, name: cityName.trim() }];
        }); //adds the newly distinct searched city into the filtered search list
      
       
          setSelectedCity(newCity);
        
      } catch (err) { 
          setSearchError(`City "${cityName}" not found`); //the error handeling case when user inputs unknown city name
          setTimeout(() => setSearchError(null),4000); //the warning is visible for 4 seconds only
      }
    }; 

  return (
    <div className="flex flex-row gap-3 px-4 pb-4 items-stretch min-h-screen w-full"> {/* search bar and side bar are aligned from the top so they start in the same height */}
      <div className="flex flex-col lg:flex-row gap-3 flex-1 min-w-0 items-stretch">
        <div className="flex flex-col gap-5 flex-1 min-w-0">
          <div className="w-full flex flex-col lg:flex-row justify-between gap-5  mt-3 cursor-pointer max-h-175 rounded-xl overflow-y-auto hide-scrollbar">
            <div className="w-full flex flex-col gap-5">
              <div className="flex flex-col w-full" >
                <div className="pl-8 mt-1 sm:pl-0 w-full">
                  <SearchBar 
                    onSearch={handleSearch} //triggers the search logic without having the coords,states, or api
                    input={searchCity} 
                    setInput={setSearchCity} //the input will be changed every key is pressed
                    placeholder={"Search above to add more cities to this list."}
                  />
                </div>
              {/* {searchCity.length === 0 && (
                <p className="text-gray-400 text-sm sm:text-base text-center mt-3"></p>
              )} */}
                {searchError && (
                  <div className="flex items-center gap-2 mt-4 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-2.5 rounded-xl text-sm transition-all animate-fadeIn">
                    <IoWarningOutline className='text-lg shrink-0'/>
                    <span>{searchError}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-5 w-full overflow-y-auto max-h-165 hide-scrollbar">
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
            

            <div className={`w-1/4 md:mt-16 shrink-0 transition-all duration-300 ease-in-out transform origin-right 
              ${selectedCity? "w-full lg:w-80  opacity-100 transalte-x-0 scale-100 pointer-events-auto"
                :"w-0 lg:w-0 opacity-0 translate-x-8 scale-95 pointer-events-none overflow-hidden"
              }`}>
              {selectedCity &&(
                <CityDetails 
                  city={selectedCity}
                  weatherData= {weatherByCity[selectedCity.name]}
                  forecastData={forecastByCity[selectedCity.name]}
                  onClose={() => setSelectedCity(null)}/>
              )}
            </div>
            
          </div>
        </div>

      </div>
    </div>
  )
}
export default Cities