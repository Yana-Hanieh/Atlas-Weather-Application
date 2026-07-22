import {useRef, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { getCoordsByCity, getWeatherByCoords } from "../../api/weatherApi";
import mapboxgl from 'mapbox-gl'; //the Mapbox library
import 'mapbox-gl/dist/mapbox-gl.css'; //the required stylesheet, a file added when library was installed. No "from X" variable needed, since CSS has nothing to import into a variable
import SearchBar from "../components/SearchBar";
import CityCard from "../components/CityCard";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN; //setting the access token globally 
const defaultLocation = {lat: 51.5073219, lon: -0.1276474};
const defaultCities = [ 
  {name:"New York", lat:40.7128, lon:-74.0060},
  {name:"London", lat:51.5074, lon:-0.1278},
  {name:"Shanghai", lat:31.2304, lon:121.4737},
  {name:"Tokyo", lat:35.6812, lon: 139.7671}
];

function Map() {
  const mapContainerRef = useRef(null); //points to the actual <div> that Mapbox will render into
  const mapInstanceRef = useRef(null); //holds the live Mapbox map object itself, so we can call methods on it later (like .flyTo) 
  const [selectedCity, setSelectedCity] = useState({name:"London", ...defaultLocation});
  const [searchCity, setSearchCity] = useState([]); //cities entered by the user
  const [weatherByCity, setWeatherByCity] = useState({}); //an obj saving the current weather data displayed for each city
  const [forecastByCity, setForecastByCity] = useState({}) //an obj saving the current forecast data displayed for each city
  const [input, setInput] = useState("");
  const [searchError, setSearchError] = useState(null) // used for the search warning, if user inputs wrong city names
  const navigate = useNavigate();
  const searchedCities = new Set(searchCity.map((c) => c.name.toLowerCase()));
  const filteredDefaultCities= defaultCities.filter((city)=> !searchedCities.has(city.name.toLowerCase()));
  const allCities = [...[...searchCity].reverse(),...filteredDefaultCities]; //combined list of the default and searched city, used to easily display the cities 
  
  useEffect(() => { //creating the map once on mount
    mapInstanceRef.current = new mapboxgl.Map ({
      container: mapContainerRef.current, //the DOM node to render into
      style: "mapbox://styles/mapbox/streets-v11", //a dark map style that matches the apps theme
      center: [defaultLocation.lon, defaultLocation.lat], //take the lon and lat to center the map NOTE: Mapbox takes lon first, unlike openWeatherAPI 
      zoom: 5,
    });

    return() => mapInstanceRef.current.remove(); //a cleanup meathod used to destroy the map instance when this component unmounts, it prevents memory leaks
  }, [] ); //run once on mount only, the map should be only created once => if its created then display the already accessed map
  
  // return (
  //   <div ref={mapContainerRef} className="w-full h-full rounded-xl"></div>
  // )

  useEffect(() => { //used to recenter the map whenver the selectedCity changes
    if (!selectedCity || !mapInstanceRef.current) //if no data is available to center or map not created yet
      return; 
    mapInstanceRef.current.flyTo({
      center: [selectedCity.lon, selectedCity.lat],
      zoom:10,
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


  const handleSearch = async(cityName) => { //an event handler that gets called by the SearchBar when the user submits a search, it only handles the coordinates
          try{
            const coords= await getCoordsByCity(cityName); //converts the coordinates of the searched city into lat and lon coordinates
            setSelectedCity({name: cityName, ...coords}); //updates the location which triggeres the existing fetch-effect in the weather.js file automatically
          }
          catch(err){
            console.error(err); //temporary error used until the real error state arrives
              //setError(err.message) the actual error handeling case
          }
        };

  return (
    <div className="bg-primary flex flex-row gap-3 px-4 pb-4 items-stretch min-h-screen w-full"> {/* search bar and side bar are aligned from the top so they start in the same height */}
      <div className="flex flex-col lg:flex-row gap-3 flex-1 min-w-0 items-stretch pt-4">
        <div className="gap-5 flex-1 min-w-0">
          <SearchBar onSearch={handleSearch}/>
          <div className="flex flex-row gap-3 h-160 mt-4">
            <div
              ref={mapContainerRef} 
              className="sm:w-1/2 w-full rounded-xl ring-9 ring-red-700">
            </div>
            
            <div className="w-1/2 ring-9 justify-between gap-5  mt-3 cursor-pointer max-h-165 rounded-xl overflow-y-auto hide-scrollbar">
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

        </div>
      </div>
    </div>
  )
}
export default Map