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
    <div>
      <div className="text-center mt-2">
        <h1 class="text-neutral-100 text-3xl font-bold mt-5">Search unlimited movies, TV shows and more</h1>
        <p class="text-neutral-300 text-xl font-semibold mt-0.5">Ready to watch? Enter your movie name.</p>
      </div>
      <div className="border-b flex justify-between items-center border-neutral-800">
      <h1 className="font-bold text-3xl text-center">OMDb API Clone</h1>
        <div className="flex gap-2 justify-between w-[1050px] p-5">
        <div className="flex gap-2">
          <input type="text" ref={movieInput} placeholder="Enter movie name." className="border border-neutral-800 px-4 rounded-xl w-[500px] bg-neutral-800 py-0 focus:outline-2 focus: outline-blue-700" />
      <button onClick={movieHandler} className="bg-red-600 rounded-xl text-white font-bold px-4 py-2 ">Submit</button>
        </div>
      <button className="bg-green-600 px-4 py-2 rounded-lg">Log-in</button>
      </div>
      </div>

      {
        !movie && !error ? <Intro/>  :
        error === 'Movie not found!' ? <NoMovie/> :  
        loader ? <div className="flex justify-center mt-30 items-center">
                 <div className="loader"></div>
                 </div> :
     <div className="w-[800px] mx-auto justify-center items-center mt-20 p-4 rounded-lg border">
       {
         <>
        <div className="flex gap-6 items-center justify-between">
        <img src={movie.Poster} className="h-90 w-80 rounded-xl object-cover relative" />
        <div className="">
        <p className="font-bold text-lg text-neutral-300">Title : {movie.Title}</p>
        <p className="font-semibold text-lg text-neutral-400">Plot : {movie.Plot}</p>
        <p className="font-semibold text-lg">Actors : {movie.Actors}</p>
        <p className="font-semibold text-lg">Director : {movie.Director}</p>
        <p className="font-semibold text-lg">Genre : {movie.Genre}</p>
        <p className="font-semibold text-lg">Year : {movie.Year}</p>
        <p className="font-semibold text-lg">Language : {movie.Language}</p>
        <p className="font-semibold text-lg">Runtime : {movie.Runtime}</p>
        <p className="font-semibold text-lg">Released in the Year : {movie.Released}</p>
        <p className="font-semibold text-lg">IMDB Rating : {movie.imdbRating}</p>
        <p className="font-semibold text-lg">IMDB votes : {movie.imdbVotes}</p>
        </div>
        </div>
        </>
       }
     </div>
     
     }
    </div>
    </>
  )
}

export default App;