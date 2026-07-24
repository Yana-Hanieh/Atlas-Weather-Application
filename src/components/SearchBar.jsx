import {useState} from "react";
import { FaSearch } from "react-icons/fa"; 

function SearchBar({onSearch, placeholder}) { //uses the onSearch function from App.jsx file without having to know about the coords, states or API, it sends the city name
  const [input, setInput]= useState(""); //holds what the user is currently typing in the box, initially an empty string
  const handleSubmit = (e) => { //runs when the form is submitted (user presses enter key)
    e.preventDefault(); //on form submit the browser automatically reloads, so we use this to stops the browser from reloading
    if(input.trim() === "") //trim() removes all whitespaces, if the result is an empty string only the input is ignored => doesnt invoke any data fetching
      return;
    onSearch (input); //use the typed input in the onSearch function 
    setInput(""); //clears the input after submitting, so the user doesnt have to manually backspace/delete entered city
  };
    return (
      <>
        <form 
          onSubmit={handleSubmit}
          className="bg-primary-light rounded-xl flex items-center px-7 py-2 w-full">
            <FaSearch className="text-gray-100 "/> 
            <input 
              type="text"
              placeholder={placeholder || "City"}
              className=" text-white ml-5 text-lg font-md w-full"
              value={input} //displays the written text in the input state into the input box
              onChange={(e) => setInput(e.target.value)} //runs when all pressed keys are appended into the text already in the input state
            />
        </form>
      </> 
    )}
export default SearchBar;