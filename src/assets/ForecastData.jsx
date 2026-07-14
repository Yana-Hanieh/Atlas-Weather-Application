import { TiWeatherCloudy,TiWeatherDownpour,TiWeatherPartlySunny } from "react-icons/ti";
import { SiAccuweather } from "react-icons/si";

const ForecastData = [
    {time:"8:00", temp:"18°C", rain:"0%", weather: "cloudy", icon:<TiWeatherCloudy />},
    {time:"10:00", temp:"20°C", rain:"0%", weather: "cloudy", icon:<TiWeatherCloudy />},
    {time:"12:00", temp:"22°C", rain:"0%", weather: "partly sunny", icon:<TiWeatherPartlySunny />},
    {time:"14:00", temp:"22°C", rain:"0%", weather: "sunny", icon:<SiAccuweather />},
    {time:"16:00", temp:"21°C", rain:"60%", weather: "rainy", icon:<TiWeatherDownpour />},
    {time:"18:00", temp:"33°C", rain:"0%", weather: "sunny", icon:<SiAccuweather />},
]
export default ForecastData