import React, { useState, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  // useEffect(() => {
  //   fetchMoviesHandler();
  // }, [fetchMoviesHandler]);

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }
  //let gif1='https://jenleigh409.files.wordpress.com/2018/08/giphy.gif?w=288&h=346&crop=1';
  //let gif2 ='https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831'
  let gif3='https://cdn.svgator.com/assets/landing-pages/static/css-loader/57579327-0-Loaders-3.svg'

  if (isLoading) {
    content = <img src={gif3} alt='gif loading' width={'95%'} height={'110rem'}/>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;

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
