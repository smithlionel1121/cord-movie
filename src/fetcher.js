import axios from "axios";

// All of your API requests should be in this file
const baseURL = "https://api.themoviedb.org/3/";
const API_KEY = process.env.REACT_APP_API_KEY;

export async function getPopularMovies() {
  const res = await axios.get(`${baseURL}discover/movie?api_key=${API_KEY}`);
  return res.data;
}
export async function getMovieGenres() {
  const res = await axios.get(`${baseURL}genre/movie/list?api_key=${API_KEY}`);
  return res.data;
}

export async function getGenresAndPopularMovies() {
  const movies = getPopularMovies();
  const genres = getMovieGenres();

  const { results, total_results: totalCount } = await movies;
  const { genres: genreOptions } = await genres;

  return { results, totalCount, genreOptions };
}
