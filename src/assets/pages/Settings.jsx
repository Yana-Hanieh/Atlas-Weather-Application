import SearchBar from "../components/SearchBar";
 function Settings() {

  return (
    <div className=" bg-primary flex flex-row gap-3 px-4 pb-4 items-stretch min-h-screen w-full"> {/* search bar and side bar are aligned from the top so they start in the same height */}
      <div className="flex flex-col lg:flex-row gap-3 flex-1 min-w-0 items-stretch">
        <div className="flex flex-col gap-5 flex-1 min-w-0">
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
export default Settings