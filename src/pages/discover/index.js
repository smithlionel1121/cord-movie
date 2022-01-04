import React from "react";
import styled from "styled-components";

import * as fetcher from "../../fetcher";
import * as breakpoints from "../../breakpoints";

import SearchFilters from "../../components/searchfilter";
import MovieList from "../../components/movielist";

import stateReducer from "./reducer";

import Hamburger from "../../images/hamburger.svg";
import debounce from "../../utils/debounce";

const DEBOUNCE_TIME = 50;
let controller;

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
        { id: "en", name: "English" },
        { id: "el", name: "Greek" },
        { id: "ru", name: "Russian" },
        { id: "pl", name: "Polish" },
        { id: "es", name: "Spanish" },
        { id: "pt", name: "Portuguese" },
        { id: "fr", name: "French" },
      ],
      isError: null,
    };

    controller = new AbortController();
  }

  // Write a function to preload the popular movies when page loads & get the movie genres
  async componentDidMount() {
    await this.loadGenresAndPopularMovies();
  }

  async componentDidUpdate(_, prevState) {
    if (this.state.results !== prevState.results) return;
    this.debouncedUpdateResults(prevState);
  }

  componentWillUnmount() {
    controller.abort();
  }

  async loadGenresAndPopularMovies() {
    try {
      const { results, totalCount, genreOptions } =
        await fetcher.getGenresAndPopularMovies(controller);
      this.setState((state) => ({
        ...state,
        results,
        totalCount,
        genreOptions,
        isError: false,
      }));
    } catch (err) {
      this.handleError(err);
    }
  }

  updateResults = async (prevState) => {
    try {
      let results, totalCount;

      if (
        !!this.state.keyword &&
        (this.state.keyword !== prevState.keyword ||
          this.state.year !== prevState.year)
      ) {
        ({ results, totalCount } = await fetcher.searchMovies(
          controller,
          this.state
        ));
      } else {
        ({ results, totalCount } = await fetcher.getFilteredMovies(
          controller,
          this.state
        ));
      }

      this.setState((state) => ({
        ...state,
        results,
        totalCount,
        isError: false,
      }));
    } catch (err) {
      this.handleError(err);
    }
  };

  debouncedUpdateResults = debounce(
    (prevState) => this.updateResults(prevState),
    DEBOUNCE_TIME
  );

  handleError(err) {
    if (err.message !== "canceled") {
      this.setState((state) => ({ ...state, results: [], isError: true }));
    } else {
      throw err;
    }
  }

  // Write a function to trigger the API request and load the search results based on the keyword and year given as parameters
  updateInput = (e) => {
    this.setState((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

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
      keyword,
      year,
      isError,
    } = this.state;

    return (
      <DiscoverWrapper>
        <MobilePageTitle>
          <h1>
            <HamburgerIcon
              src={Hamburger}
              alt="menu"
              onClick={this.props.toggleSidebar}
            />
            Discover
          </h1>
        </MobilePageTitle>{" "}
        <MovieFiltersWrapper>
          <MovieFilters>
            <SearchFilters
              genres={genreOptions}
              ratings={ratingOptions}
              languages={languageOptions}
              keyword={keyword}
              year={year}
              updateInput={this.updateInput}
              dispatch={(action) => this.reducer(action)}
            />
          </MovieFilters>
        </MovieFiltersWrapper>
        <MovieResults>
          {totalCount > 0 && <TotalCounter>{totalCount} results</TotalCounter>}
          <MovieListWrapper>
            {isError ? (
              <div>Something went wrong...</div>
            ) : (
              <MovieList movies={results || []} genres={genreOptions || []} />
            )}
          </MovieListWrapper>
        </MovieResults>
      </DiscoverWrapper>
    );
  }
}

const DiscoverWrapper = styled.main`
  padding: 35px 45px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 15px;
  grid-template-areas: "movie-results movie-filters-grid";

  @media only screen and (max-width: ${breakpoints.md}) {
    display: flex;
    flex-direction: column;
    padding: 0 20px;
  }

  @media only screen and (max-width: ${breakpoints.lg}) {
    padding: 0 20px;
    grid-template-rows: auto 1fr;
    gap: 0px 15px;
    grid-template-areas:
      "mobile-title mobile-title"
      "movie-results movie-filters-grid";
  }
`;

const HamburgerIcon = styled.img`
  height: 1em;
  margin-right: 35px;
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

  @media only screen and (max-width: ${breakpoints.md}) {
    display: block;
  }
`;

const MovieFilters = styled(MoviesBaseCont)`
  grid-area: movie-filters;

  @media only screen and (max-width: ${breakpoints.md}) {
    display: block;
  }
`;

const MobilePageTitle = styled.header`
  grid-area: mobile-title;
  display: none;

  @media only screen and (max-width: ${breakpoints.lg}) {
    display: block;

    & h1 {
      display: inline-flex;
    }
  }
`;

const MovieListWrapper = styled.div`
  grid-area: movie-list;
`;
