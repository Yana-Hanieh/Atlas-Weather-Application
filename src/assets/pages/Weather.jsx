import SearchBar from '../components/SearchBar.jsx'
import DisplayCard from '../components/DisplayCard.jsx'
import WeekCard from '../components/WeekCard.jsx'
import { useState, useEffect } from "react"
import {getWeatherByCoords,getCoordsByCity, getForecastByCoords} from '../../api/weatherApi.js'

const defaultLocation = {lat:51.5073219, lon:-0.1276474}; //a default location object if user denies access or problems encountered

function Weather() {
  //useStates used that initialises variables and allows changing them
  const [searchInput, setSearchInput]= useState(""); //empty string since the input takes a string type from the user 
  const [location,setLocation]= useState(null); //location set to null before asking the user for permission for location, if user accepts location is changed to user's current location, if user rejects location is set to default 
  const [weatherData, setWeatherData] = useState(null); //weather data is initially null so when no data is found, no data appears/renders
  const [loading, setLoading] = useState(true); //initially true, since it will first load to show the data then will be switched to false when the weather fetch is done regardless if its a success or a fail 
  const [error, setError] = useState(null);
  const [forecastData, setForecastData] = useState(null); //forecast data is initially null so when no data is found, no data appears/renders
  
  function requestGeolocation() { //responsible for the geolocation support and access
    if (navigator.geolocation){ //navigator geolocation is a browser web api that checks if the browser supports the geolocation API  monitors the user geolocation after they give permission
      navigator.geolocation.getCurrentPosition( //if the user gives permision => the current location of user is saved in the position.coords variable
        (position) => { 
          setLocation({lat:position.coords.latitude, lon:position.coords.longitude}); //the location is changed to the user's new location by using the coordinates of the location's lat and lon
        },
        () => { //if the user denys access, the location is set to the default location (nicosia in this case)
          setLocation(defaultLocation); //pass the default location directly without using {} since its an object already
        },
      );
    }else{ //if geolocation isnt available (due to device incompatibility/issues etc), the location is set to the default location
      setLocation(defaultLocation); 
    }
  }; 
    
  useEffect(() => { //used to check the URL for city name 
    const params = new URLSearchParams(window.location.search); //stores the location in the search bar into params var
    const cityFromURL = params.get("city"); //returns the value of ?city=... or null if city isnt in the URL
    
    if (cityFromURL){ //if city is specified in the URL => use it directly without having to call the geolocation API
      getCoordsByCity(cityFromURL)
        .then((coords) => setLocation(coords))
        .catch((err) => {
          console.error(err); //if the city in the URL is invalid, send an error and use the geolocation api instead
          requestGeolocation();
        });
    } else{
      requestGeolocation(); 
    }
  }, []); //an empty array which makes the useEffect run only once after the initial rendering, ensuring that no rendering occurs if no changes occur

  useEffect (() => { //responsible for fetching the data, it reacts to the location and calls the API Function
    if (!location) //if location is not available, dont fetch any data
      return;
    setLoading(true); //shows the loading state while the data is being fetched 
    Promise.all([
      getWeatherByCoords(location.lat,location.lon), //calls the getWeatherByCoords function from the weather.js file, passing the location's (user or default) lat and lon 
      getForecastByCoords(location.lat,location.lon) //calls the getForecastByCoords function from the weather.js file, passing the location's (user or default) lat and lon
    ])
      .then(([weather,forecast]) =>{ //promise method that takes data if its fullfilled, and leaves it empty if its rejected 
        //save the fetched data into state
        setWeatherData(weather); 
        setForecastData(forecast)
      })
      .catch ((err) => { //promise method runs only if the promise fails/rejectcalls .then() internally, doesnt pass the fulfillment handler, only runs if the error gets passed as the argument
        console.error(err); //temporary error used until the real error state arrives
        //setError(err.message) the actual error handeling case
      })
      .finally(() => { //promise method always runs once after the .then() or the .catch() finishes
        setLoading(false); //turn off he loading state regardless if it succeeded or failed
      });  
      //each method returns a new promise which is why the . chaining onto a single call is allowed
  }, [location]); //reruns the useeffect function whenever the location changes (default, geolocation result, or user search)

  useEffect(() => { //keeps the URL synced with the location currently displayed
    if (!weatherData)
      return; //no data available => wait for data to fetch
    
    const params = new URLSearchParams(window.location.search) //read the current URL's query string
    params.set("city", weatherData.name); //add the city key from the api into the URL
    window.history.pushState({},"",`?${params.toString()}`); //update the browser's address without reloading the page
   }, [weatherData]); //runs whenever weatherData changes (new search or geolocation)

  const handleSearch = async(cityName) => { //an event handler that gets called by the SearchBar when the user submits a search, it only handles the coordinates
    try{
      const coords= await getCoordsByCity(cityName); //converts the coordinates of the searched city into lat and lon coordinates
      setLocation (coords); //updates the location which triggeres the existing fetch-effect in the weather.js file automatically
    }
    catch(err){
      console.error(err); //temporary error used until the real error state arrives
        //setError(err.message) the actual error handeling case
    }
  };

  return (
    <div className=" bg-primary flex flex-row gap-3 px-4 pb-4 items-stretch min-h-screen w-full overflow-y-auto hide-scrollbar"> {/* search bar and side bar are aligned from the top so they start in the same height */}
      <div className="flex flex-col lg:flex-row gap-3 flex-1 min-w-0 items-stretch">
        <div className="flex flex-col gap-5 flex-1 min-w-0 pt-4">
        <SearchBar 
          onSearch={handleSearch} //triggers the search logic without having the coords,states, or api
          input={searchInput} 
          setInput={setSearchInput} //the input will be changed every key is pressed
        />

        <DisplayCard
          weatherData={weatherData} //the actual data to render once it exists
          forecastData ={forecastData} //the data used to render the weekly card
          loading={loading} //shows a spinner while loading instead of trying to render data while theres no data yet (null)
          error={error} 
        /> 
        
      </div>
      
      <div className="flex flex-col">
        <p className="h-12"></p>
        <div className=" md:mt-16 w-full h-full lg:w-80 shrink-0 rounded-xl hover:shadow-cyan-900 transition-transform hover:-translate-y-2 hover:shadow-lg duration-300">
 
              <WeekCard forecastData={forecastData}/> {/* use the WeekCard hook as a third card containing the weekly weather data (displayed on the rightside of the screen) */}
        </div>
      </div>

      </div>
    </div>
  );
}

export default Weather
