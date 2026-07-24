import {useRef, useEffect, useState, useMemo} from "react";
import { useNavigate } from "react-router-dom";
import { getCoordsByCity, getWeatherByCoords } from "../api/weatherApi";
import ReactDOMServer from "react-dom/server" ;
import mapboxgl from 'mapbox-gl'; //the Mapbox library
import 'mapbox-gl/dist/mapbox-gl.css'; //the required stylesheet, a built-in css file added when library was installed. No "from X" variable needed, since CSS has nothing to import into a variable
 //Imports the custom map marker styling
import SearchBar from "../components/SearchBar";
import CityCard from "../components/CityCard";
import { TiWeatherCloudy, TiWeatherDownpour } from "react-icons/ti";
import { RiDrizzleFill, RiMistFill } from "react-icons/ri";
import { SiAccuweather } from "react-icons/si";
import { IoThunderstorm } from "react-icons/io5";
import { GiSnowing } from "react-icons/gi";
import { IoWarningOutline } from 'react-icons/io5'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN; //setting the access token globally 

const defaultLocation = {lat: 51.5073219, lon: -0.1276474};
const defaultCities = [ 
  {name:"London", lat:51.5074, lon:-0.1278},
  {name:"New York", lat:40.7128, lon:-74.0060},
  {name:"Shanghai", lat:31.2304, lon:121.4737},
  {name:"Tokyo", lat:35.6812, lon: 139.7671}
];

function WeatherIcon({ weather }) {
  if (weather === "Clouds") return <TiWeatherCloudy className="text-slate-300 text-3xl" />;
  if (weather === "Clear") return <SiAccuweather className="text-yellow-300 text-3xl" />;
  if (weather === "Rain") return <TiWeatherDownpour className="text-blue-400 text-3xl" />;
  if (weather === "Drizzle") return <RiDrizzleFill className="text-blue-300 text-3xl" />;
  if (weather === "Thunderstorm") return <IoThunderstorm className="text-blue-800 text-3xl" />;
  if (weather === "Snow") return <GiSnowing className="text-blue-200 text-3xl" />;
  if (weather === "Mist") return <RiMistFill className="text-blue-200 text-3xl" />;
  return null;
}

function Map() {
  const mapContainerRef = useRef(null); //points to the actual <div> that Mapbox will render into
  const mapInstanceRef = useRef(null); //holds the live Mapbox map object itself, so we can call methods on it later (like .flyTo) 
  const markersRef = useRef([]); //Ref to keep track of created mapbox markers

  const [selectedCity, setSelectedCity] = useState({name:"London", ...defaultLocation});
  const [searchCity, setSearchCity] = useState([]); //cities entered by the user
  const [weatherByCity, setWeatherByCity] = useState({}); //an obj saving the current weather data displayed for each city
  const [searchError, setSearchError] = useState(null) // used for the search warning, if user inputs wrong city names
  
  const navigate = useNavigate();

  const searchedCities = new Set(searchCity.map((c) => c.name.toLowerCase()));
  const filteredDefaultCities= useMemo(()=>{
    return defaultCities.filter((city)=> !searchedCities.has(city.name.toLowerCase()));
  }, [defaultCities])
  const citiesList = useMemo(()=>{
    return [...[...searchCity].reverse(),...filteredDefaultCities]
  },[searchCity, filteredDefaultCities]); //combined list of the default and searched city, used to easily display the cities 
  



  const [allCities, setAllCities] = useState(citiesList)



  
  useEffect(() => { //creating the map once on mount
    mapInstanceRef.current = new mapboxgl.Map ({
      container: mapContainerRef.current, //the DOM node to render into
      style: "mapbox://styles/mapbox/streets-v11", //a dark map style that matches the apps theme
      center: [defaultLocation.lon, defaultLocation.lat], //take the lon and lat to center the map NOTE: Mapbox takes lon first, unlike openWeatherAPI 
      zoom: 5,
    });
    return() => mapInstanceRef.current.remove(); //a cleanup meathod used to destroy the map instance when this component unmounts, it prevents memory leaks
  }, [] ); //run once on mount only, the map should be only created once => if its created then display the already accessed map

  useEffect(() => { //used to recenter the map whenver the selectedCity changes
    if (!selectedCity || !mapInstanceRef.current) //if no data is available to center or map not created yet
      return; 
    mapInstanceRef.current.flyTo({
      center: [selectedCity.lon, selectedCity.lat],
      zoom:8,
      essential: true, //it overrides the user preferences and performs smooth camera transitions
    });
  }, [selectedCity]);

  useEffect(() => {
      allCities.forEach((city) =>{
        if (weatherByCity[city.name])
          return;
  
        getWeatherByCoords(city.lat,city.lon)
        .then((data) =>{
          setWeatherByCity((prev) => ({...prev,[city.name]:data}))
        })
        .catch((err) => console.error(err));
      })
     }, [searchCity]);

  //plotting custom UI markers on the map
  useEffect(()=> {
    if (!mapInstanceRef.current) //if no markers found on the map, dont render anything
      return; 
    
      markersRef.current.forEach((marker) => marker.remove()); //removes any existing markers from the map before plotting new ones 
      markersRef.current = [];

      

      allCities.forEach((city) => {
        
        const weather = weatherByCity[city.name];
        const temp = weather ? `${Math.round(weather.main.temp)}°` : "--°"; //saves the city temp (if known) or -- if unknown in temp variable thats used later to display in the card 
        const condition = weather ? weather.weather[0].main : null; //take the condition from the api data if available or null if not
        const iconHTML = ReactDOMServer.renderToStaticMarkup(<WeatherIcon weather = {condition}/>) //converts the weatherIcon (react icons) into plain HTML 

        const DOM_elment = document.createElement("div"); //creates a standard browser div element in memory
        DOM_elment.className="custom-mapbox-marker bg-primary text-white px-4 py-3 rounded-2xl flex flex-col items-center gap-1 shadow-sm shadow-shadowColor min-w-25"; //applies the styling on the standard browser div
        //injects the city name, weather icon in plain HTML and the temp into the memory div 
        DOM_elment.innerHTML = `<p class="font-semibold text-sm">${city.name}</p> 
                        <div class="flex justify-center">${iconHTML}</div>
                        <p class="text-xl font-bold">${temp}</p> `;
        DOM_elment.addEventListener("click", () => setSelectedCity(city)) //attaches a DOM click listener to the marker card, when clicking the searched city is set and it triggers the map to move to the new city#s position

        const marker = new mapboxgl.Marker({element:DOM_elment}) //creates an instance marker
          .setLngLat([city.lon, city.lat]) //sets the coords of the instance marker 
          .addTo(mapInstanceRef.current); //pushes it to the markersRef.current so it can be cleared when website rerenders

        markersRef.current.push(marker);
      });
  }, [allCities, weatherByCity]); //reruns the marker plotter when the city list or their weather data changes

  const handleSearch = async(cityName) => { //an event handler that gets called by the SearchBar when the user submits a search, it only handles the coordinates
    if (cityName.trim() === "") //if input is empty, dont fetch any data
      return;
    try{
      const coords = await getCoordsByCity(cityName); //converts the coordinates of the searched city into lat and lon coordinates
      setSelectedCity({name: cityName, ...coords}); //updates the location which triggeres the existing fetch-effect in the weather.js file automatically
      const filtered = searchCity.filter((c) =>
          c.name.toLowerCase() !== cityName.trim().toLowerCase() && !(Math.abs(c.lat - coords.lat) < 0.01 && Math.abs(c.lon - coords.lon) < 0.01)); 
      const newCities =  [...filtered, {...coords,name:cityName}];
      setSearchCity(newCities);
      setAllCities((prev)=>{
        const filtered = prev.filter((c) =>
          c.name.toLowerCase() !== cityName.trim().toLowerCase() && !(Math.abs(c.lat - coords.lat) < 0.01 && Math.abs(c.lon - coords.lon) < 0.01)); 
       return [{...coords,name:cityName},...filtered]
      })
    }
    catch(err){
      setSearchError(`City "${cityName}" not found`); //the error handeling case when user inputs unknown city name
      setTimeout(() => setSearchError(null),4000); //the warning is visible for 4 seconds only
      }
  };
  


  const handleClear = (index)=>{
      const newArr = [
  ...allCities.slice(0, index),
  ...allCities.slice(index + 1)];

  setAllCities(newArr)
  setSearchCity(newArr)
  }

  return (
    <div className=" flex flex-row gap-3 px-4 pb-4 items-stretch w-full"> {/* search bar and side bar are aligned from the top so they start in the same height */}
      <div className="flex flex-col lg:flex-row gap-3 flex-1 min-w-0 items-stretch pt-4 ">
        <div className="gap-5 flex-1 min-w-0">
          <SearchBar 
            onSearch={handleSearch}
          />
          {searchError && (
                    <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-2.5 rounded-xl text-sm transition-all animate-fadeIn">
                      <IoWarningOutline className='text-lg shrink-0'/>
                      <span>{searchError}</span>
                    </div>
          )}

          <div className="flex flex-col lg:flex-row gap-3 h-160 mt-4">
            <div
              ref={mapContainerRef} 
              className="lg:w-1/2 h-full w-full rounded-xl">
            </div>
            
            <div className="lg:w-1/2 w-full flex flex-col gap-5 cursor-pointer max-h-165 rounded-xl overflow-y-auto hide-scrollbar">
                {allCities.map((city, i) =>(
                      <CityCard
                        key={city.name}
                        city={city}
                        weather={weatherByCity[city.name]} 
                        onClick = {() => setSelectedCity(city)}
                      onClear={()=>{
                        handleClear(i)
                      }}
                      />
                    ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
export default Map