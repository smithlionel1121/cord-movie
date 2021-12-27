import React from "react";
import styled from "styled-components";

import * as fetcher from "../../fetcher";

import SearchFilters from "../../components/searchfilter";
import MovieList from "../../components/movielist";

import stateReducer from "./reducer";

export default class Discover extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: "",
      year: 0,
      results: [],
      totalCount: 0,
      genreOptions: [],
      ratingOptions: [
        { id: 7.5, name: 7.5 },
        { id: 8, name: 8 },
        { id: 8.5, name: 8.5 },
        { id: 9, name: 9 },
        { id: 9.5, name: 9.5 },
        { id: 10, name: 10 },
      ],
      languageOptions: [
        { id: "GR", name: "Greek" },
        { id: "EN", name: "English" },
        { id: "RU", name: "Russian" },
        { id: "PO", name: "Polish" },
      ],
    };
  }

  // Write a function to preload the popular movies when page loads & get the movie genres
  async componentDidMount() {
    const { results, totalCount, genreOptions } =
      await fetcher.getGenresAndPopularMovies();
    this.setState((state) => ({ ...state, results, totalCount, genreOptions }));
  }

  // Write a function to trigger the API request and load the search results based on the keyword and year given as parameters

  reducer(action) {
    this.setState(stateReducer(this.state, action));
  }

  render() {
    const {
      genreOptions,
      languageOptions,
      ratingOptions,
      totalCount,
      results,
    } = this.state;

    return (
      <DiscoverWrapper>
        <MobilePageTitle>Discover</MobilePageTitle>{" "}
        {/* MobilePageTitle should become visible on small screens & mobile devices*/}
        <MovieFiltersWrapper>
          <MovieFilters>
            <SearchFilters
              genres={genreOptions}
              ratings={ratingOptions}
              languages={languageOptions}
              searchMovies={(keyword, year) => this.searchMovies(keyword, year)}
              dispatch={(action) => this.reducer(action)}
            />
          </MovieFilters>
        </MovieFiltersWrapper>
        <MovieResults>
          {totalCount > 0 && <TotalCounter>{totalCount} results</TotalCounter>}
          <MovieListWrapper>
            <MovieList movies={results || []} genres={genreOptions || []} />
          </MovieListWrapper>
        </MovieResults>
      </DiscoverWrapper>
    );
  }
}

const DiscoverWrapper = styled.main`
  padding: 60px 35px;
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: 1fr;
  gap: 0px 15px;
  grid-template-areas: "movie-results movie-filters-grid";
`;

const MoviesBaseCont = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 35px 1fr;
  gap: 0px 0px;
`;

const TotalCounter = styled.div`
  font-weight: 900;
  grid-area: total-counter;
`;

const MovieResults = styled(MoviesBaseCont)`
  grid-area: movie-results;
  grid-template-areas:
    "total-counter"
    "movie-list";
`;

const MovieFiltersWrapper = styled(MoviesBaseCont)`
  grid-area: movie-filters-grid;
  grid-template-areas:
    "."
    "movie-filters";
`;
const MovieFilters = styled(MoviesBaseCont)`
  grid-area: movie-filters;
`;

const MobilePageTitle = styled.header`
  grid-area: mobile-title;
  display: none;
`;

const MovieListWrapper = styled.div`
  grid-area: movie-list;
`;
