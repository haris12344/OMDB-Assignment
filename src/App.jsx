import { useRef, useState } from "react"
import axios from 'axios';
import Intro from "./Intro";
import NoMovie from "./NoMovie";
function App() {
  let movieInput = useRef();
  const [movie,setMovie] = useState('');
  let [error,setError] = useState('');
  let [loader,setLoader] = useState(false)
  function movieHandler(){
    let inp = movieInput.current.value.trim();
    let api = 'https://www.omdbapi.com/?apikey=b11fba2e&t='
    let result = api + inp;
    setLoader(true);
    axios.get(result).then((mov)=>{
      setMovie(mov.data);
      setError(mov.data.Error);
      console.log(mov.data.Error);
      console.log(mov.data);
    }).catch(() => setError('Something went wrong'))
      .finally(() => setLoader(false))
  }
  return (
    <>    
    <div className="px-4 sm:px-6 md:px-10 mb-10">
    <div className="text-center mt-2">
    <h1 className="text-neutral-100 text-2xl sm:text-3xl font-bold mt-5">Search unlimited movies, TV shows and more</h1>
    <p className="text-neutral-300 text-lg sm:text-xl font-semibold mt-0.5">Ready to watch? Enter your movie name.</p>
    </div>
    <div className="border-b flex flex-col md:flex-row justify-between items-center border-neutral-800">
    <h1 className="font-bold text-2xl sm:text-3xl text-center mb-4 md:mb-0">OMDb API Clone</h1>
    <div className="flex flex-col md:flex-row gap-3 md:gap-2 justify-between w-full md:w-[1050px] p-5">
      <div className="flex flex-col sm:flex-row gap-2  justify-center">
        <input type="text" ref={movieInput} placeholder="Enter movie name." className="border border-neutral-800 px-4 rounded-xl w-full sm:w-[500px] bg-neutral-800 py-2 focus:outline-2 focus:outline-green-400"/>
        <button onClick={movieHandler} className="bg-red-600 cursor-pointer rounded-xl text-white font-bold px-4 py-2 w-full sm:w-auto">Submit
        </button>
      </div>
      <button className="bg-green-700 cursor-pointer px-4 py-2 rounded-lg w-full sm:w-auto">Log-in</button>
    </div>
    </div>
  {
    !movie && !error ? <Intro /> :
    error === 'Movie not found!' ? <NoMovie /> :
    loader ? (
      <div className="flex justify-center mt-30 items-center">
        <div className="loader"></div>
      </div>
    ) : (
      <div className="w-full sm:w-[700px] md:w-[800px] mx-auto justify-center items-center mt-10 p-4 rounded-lg border">
        {
          <>
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
              <img src={movie.Poster} className="h-72 w-56 sm:h-90 sm:w-80 rounded-xl object-cover relative"/>
              <div className="text-neutral-300 space-y-2 text-sm sm:text-base">
                <p className="font-bold text-lg">Title : {movie.Title}</p>
                <p className="font-semibold">Plot : {movie.Plot}</p>
                <p className="font-semibold">Actors : {movie.Actors}</p>
                <p className="font-semibold">Director : {movie.Director}</p>
                <p className="font-semibold">Genre : {movie.Genre}</p>
                <p className="font-semibold">Year : {movie.Year}</p>
                <p className="font-semibold">Language : {movie.Language}</p>
                <p className="font-semibold">Runtime : {movie.Runtime}</p>
                <p className="font-semibold">Released in the Year : {movie.Released}</p>
                <p className="font-semibold">IMDB Rating : {movie.imdbRating}</p>
                <p className="font-semibold">IMDB votes : {movie.imdbVotes}</p>
              </div>
            </div>
          </>
        }
      </div>
        )
  }
      </div>
    </>
  )
}

export default App;