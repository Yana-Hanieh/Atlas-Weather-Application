
 import SearchBar from "../components/SearchBar";
 function Map() {
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
    <div className=" bg-primary flex flex-row gap-3 px-4 pb-4 items-stretch min-h-screen w-full"> {/* search bar and side bar are aligned from the top so they start in the same height */}
      <div className="flex flex-col lg:flex-row gap-3 flex-1 min-w-0 items-stretch">
        <div className="flex flex-col gap-5 flex-1 min-w-0 pt-4">
        <SearchBar 
       />

         {/**City cards */}
        {/* <div className="border rounded-2xl bg-primary-light px-4 py-8 flex flex-row gap-2 shadow-lg shadow-shadowColor hover:shadow-shadowColor-hover transition-transform hover:-translate-y-2 hover:shadow-lg duration-300 items-center w-full">
          <span className="">
            <GiSnowing />
          </span>
          <div className="flex flex-col gap-2 text-gray-300">
            <span className=""></span>
            hello
         </div>
        </div>
        

      </div>
      <div className="w-full lg:w-80 shrink-0 lg:mt-13"> */}
            {/* use the WeekCard hook as a third card containing the weekly weather data (displayed on the rightside of the screen) */}
      </div>
      </div>
    </div>
  )
}
export default Map