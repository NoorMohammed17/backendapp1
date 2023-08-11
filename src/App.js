import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading , setIsLoading] = useState(false);
  // ***********************USING .THEN  METHOD TO FETCH DATA *******************************//
  // const fetchMoviesHandler = () => {
  //   fetch("https://swapi.dev/api/films/")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       const tranfomedMoviesData = data.results.map((movieData) => {
  //         return {
  //           id: movieData.episode_id,
  //           title: movieData.title,
  //           openingText: movieData.opening_crawl,
  //           releaseDate: movieData.release_date,
  //         };
  //       });
  //       console.log(tranfomedMoviesData)
  //       setMovies(tranfomedMoviesData);
  //     });
  // };

  //***********************using async await method to fetch data ***************************//
  async function fetchMoviesHandler() {
    setIsLoading(true)
    const response = await fetch("https://swapi.dev/api/films/");
    const data = await response.json();
    const tranfomedMoviesData = data.results.map((movieData) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      };
    });
    console.log(tranfomedMoviesData);
    setMovies(tranfomedMoviesData);
    setIsLoading(false)
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
         {!isLoading && movies.length>0 && <MoviesList movies={movies} />}
         {!isLoading && movies.length === 0 && <p>No movies found</p>}
         {isLoading && <h1>Loading...</h1>}
      </section>
    </React.Fragment>
  );
}

export default App;
