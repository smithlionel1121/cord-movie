import axios from "axios";

// All of your API requests should be in this file
const baseURL = "https://api.themoviedb.org/";
const apiURL = new URL("/3/", baseURL);

const API_KEY = process.env.REACT_APP_API_KEY;
apiURL.search = `api_key=${API_KEY}`;

export async function getPopularMovies(controller, params = null) {
  try {
    const url = new URL(apiURL);
    url.pathname += "discover/movie";

    if (params)
      url.search = new URLSearchParams({ ...params, api_key: API_KEY });

    const res = await axios.get(url, {
      signal: controller.signal,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getMovieGenres(controller) {
  try {
    const url = new URL(apiURL);
    url.pathname += "genre/movie/list";
    const res = await axios.get(url, {
      signal: controller.signal,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getGenresAndPopularMovies(controller) {
  try {
    const values = await Promise.allSettled([
      getPopularMovies(controller),
      getMovieGenres(controller),
    ]);

    values.forEach((value) => {
      if (value.status === "rejected") throw value.reason;
    });

    const [{ value: movies }, { value: genres }] = values;
    const { results, total_results: totalCount } = movies;
    const { genres: genreOptions } = genres;
    return { results, totalCount, genreOptions };
  } catch (error) {
    throw error;
  }
}

export async function getFilteredMovies(controller, filters) {
  try {
    const { genreOptions } = filters;

    const with_genres = genreOptions
      .filter((genre) => !!genre?.isFiltered)
      .map((genre) => genre.id)
      .join(",");

    const { results, total_results: totalCount } = await getPopularMovies(
      controller,
      { with_genres }
    );

    return { results, totalCount };
  } catch (error) {
    throw error;
  }
}

export async function searchMovies(controller, params) {
  try {
    const url = new URL(apiURL);
    url.pathname += "search/movie";

    if (params) {
      const { keyword: query, year } = params;

      url.search = new URLSearchParams({
        query,
        ...(!!year && { year }),
        api_key: API_KEY,
      });
    }

    const res = await axios.get(url, { signal: controller.signal });

    const { results, total_results: totalCount } = res.data;

    return { results, totalCount };
  } catch (error) {
    throw error;
  }
}
