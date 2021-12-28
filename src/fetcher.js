import axios from "axios";

// All of your API requests should be in this file
const baseURL = "https://api.themoviedb.org/";
const apiURL = new URL("/3/", baseURL);

const API_KEY = process.env.REACT_APP_API_KEY;
apiURL.search = `api_key=${API_KEY}`;

export async function getPopularMovies(params = null) {
  const url = new URL(apiURL);
  url.pathname += "discover/movie";

  if (params) url.search = new URLSearchParams({ ...params, api_key: API_KEY });

  const res = await axios.get(url);
  return res.data;
}

export async function getMovieGenres() {
  const url = new URL(apiURL);
  url.pathname += "genre/movie/list";
  const res = await axios.get(url);
  return res.data;
}

export async function getGenresAndPopularMovies() {
  const movies = getPopularMovies();
  const genres = getMovieGenres();

  const { results, total_results: totalCount } = await movies;
  const { genres: genreOptions } = await genres;

  return { results, totalCount, genreOptions };
}

export async function getFilteredMovies(filters) {
  const { genreOptions } = filters;

  const with_genres = genreOptions
    .filter((genre) => !!genre?.isFiltered)
    .map((genre) => genre.id)
    .join(",");

  const { results, total_results: totalCount } = await getPopularMovies({
    with_genres,
  });

  return { results, totalCount };
}
