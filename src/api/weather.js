const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY; //reads the key from the .env file, only variables starting with VITE_ are exposed to client side by vite

//for the user location, provides the weatherData used by the AirConditionsCard, and the top section of the DisplayCard
export async function getWeatherByCoords(lat, lon, signal){ //signal: optional AbortSignal so the caller can cancel in-flight requests
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
        { signal }
    );
    

    if (!response.ok){  //.ok is a property builtin property on the Response object, thats automatically set based on the response code, its value is a boolean
        throw new Error("Failed to fetch weather data"); //if the response.ok is false => issues found then a new manual error is thrown 
    }
    return response.json(); //returns a promise which lets the caller wait until the response body is parsed in a format json
}

//for the search bar
export async function getCoordsByCity(cityName){ //converts the city/country name into coordinates 
    const response = await fetch( //calls the geocoding endpoint and returns a Response object
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${API_KEY}` //API call for the geocoding API, encodeURIcomponent is a builtin function that allows the spaces, and special characters (spaces, accents,etc.) between names (new york, los angleles), the limit shows the maximum numb of matching results, set to 1 to get the 1 "best" result
    )

    if (!response.ok){
        throw new Error ("Failed to fetch city data");
    }

    const data = await response.json(); //returns a promise which lets the caller wait until the response body is parses into an array of matching places in one time in a json format
   
    if (data.length === 0){ //if the geocoding can succeed but the entered city is not matched then its a new error type 
        throw new Error ("City not found");
    }

    return {lat:data[0].lat, lon:data[0].lon} // return the lat and lon of the matched location only
}

//for the weekly data, provides the forecastData that is used by TodayCard and WeekCard 
export async function getForecastByCoords(lat, lon, signal){ //signal: optional AbortSignal so the caller can cancel in-flight requests
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
        { signal }
    )

    if (!response.ok){
        throw new Error ("Failed to fetch forecast data");
    }
    return response.json();
}