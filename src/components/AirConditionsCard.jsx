import { FaTemperatureHalf } from "react-icons/fa6";
import { FaWind } from "react-icons/fa";
import {TiWeatherCloudy} from "react-icons/ti"
import { WiHumidity } from "react-icons/wi";

function AirConditionsCard({weatherData}) {
    if (!weatherData) return null;
    const {main,wind,clouds} = weatherData; //save the weatherData into the 4 seperate variables (arrays) to easily call their values
    
    return(
        <div className=" bg-primary-light auto shadow-sm shadow-shadowColor hover:shadow-shadowColor-hover transition-transform hover:-translate-y-2 hover:shadow-sm duration-300 rounded-xl items-center px-4 py-1 w-full">
            <h2 className="font-medium text-white text-2xl m-3">Air Conditions</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-6 px-4 md:px-6 mt-4 pb-4"> {/*grid layout used to display the hrs, temp, and icon in a grid format*/}
                <div className="flex flex-col">
                    <div className="flex flex-row gap-3 items-center">
                        <FaTemperatureHalf className="text-blue-200 text-2xl "/>
                        <p className=" text-gray-200 text-lg">Real Feel</p>
                    </div>
                    <p className="text-ln text-gray-100 ml-6 sm:ml-10 m-2">{main.feels_like} °C</p>  
                </div>

                <div className="flex flex-col">
                    <div className="flex flex-row gap-3 items-center">
                        <FaWind className="text-blue-200 text-xl "/>
                        <p className=" text-gray-200 text-lg">Wind</p>
                    </div>
                    <p className="text-ln text-gray-100 ml-6 sm:ml-10 m-2">{Math.round(wind.speed * 3.6)} km/h</p>  
                </div>

                 <div className="flex flex-col">
                    <div className="flex flex-row gap-3 items-center">
                        <WiHumidity className="text-blue-300 text-2xl "/>
                        <p className=" text-gray-200 text-lg">Humidity</p>
                    </div>
                    <p className="text-ln text-gray-100 ml-6 sm:ml-10 m-2">{main.humidity}</p>  
                </div>

                 <div className="flex flex-col">
                    <div className="flex flex-row gap-3 items-center text-wrap">
                        <TiWeatherCloudy className="text-white text-2xl "/>
                        <p className=" text-gray-200 text-lg w-full">Cloud Cover</p>
                    </div>
                    <p className="text-ln text-gray-100 ml-6 sm:ml-10 m-2">{clouds.all} %</p>  
                </div>

            
            </div>I

        </div>
    )
}
export default AirConditionsCard