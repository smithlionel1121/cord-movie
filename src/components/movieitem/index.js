import React from "react";
import styled from "styled-components";

import * as breakpoints from "../../breakpoints";
import * as colors from "../../colors";

export default class MovieItem extends React.Component {
  render() {
    const { movie, genres } = this.props;
    return (
      // Complete the MovieItem component
      <MovieItemWrapper>
        <LeftCont>
          <PosterImg
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt="movie poster"
          />
        </LeftCont>
        <RightCont>
          <MovieHeader>
            <MovieTitle>{movie.title}</MovieTitle>
            <MovieRating>{movie.vote_average}</MovieRating>
          </MovieHeader>
          <MovieGenres>
            {movie.genre_ids
              .map((id) => {
                const index = genres.findIndex((genre) => genre.id === id);
                return index !== -1 ? genres[index].name : null;
              })
              .join(" | ")}
          </MovieGenres>
          <MovieOverview>{movie.overview}</MovieOverview>
          <MovieYear>{movie.release_date}</MovieYear>
        </RightCont>
      </MovieItemWrapper>
    );
  }
}

const MovieItemWrapper = styled.div`
  position: relative;
  background-color: white;
  border-radius: 3px;
  margin: 15px auto;
  padding: 20px;
  overflow: hidden;

  display: grid;
  grid-template-columns: 140px 1fr;
  grid-template-rows: 210px;
  gap: 0px 20px;
  grid-template-areas: "poster content";

  @media only screen and (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    gap: 0px;
    grid-template-areas: "content";
  }
`;

const LeftCont = styled.div`
  display: inline-block;
  grid-area: poster;

  @media only screen and (max-width: ${breakpoints.mobile}) {
    display: none;
  }
`;

const PosterImg = styled.img`
  height: 100%;
`;

const RightCont = styled.div`
  display: inline-block;
  grid-area: content;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content 5% 1fr 5%;
  grid-template-rows: min-content min-content minmax(0, 1fr) min-content;
  gap: 0px 0px;
  grid-template-areas:
    "header"
    "genres"
    "overview"
    "year";
`;

const MovieHeader = styled.div`
  grid-area: header;
  position: relative;
  margin-bottom: 0.25em;
`;

const MovieTitle = styled.h3`
  margin: 0;
  grid-area: title;
  margin-inline-end: 2em;
`;

const MovieRating = styled.span`
  margin: 0;
  grid-area: rating;
  position: absolute;
  top: 0;
  right: 0;
  background: ${colors.primaryColor};
  padding: 0.2em;
  font-weight: 700;
  border-radius: 10%;
  color: white;
`;

const MovieGenres = styled.span`
  grid-area: genres;
  color: ${colors.primaryColor};
  font-size: 0.9em;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const MovieOverview = styled.p`
  grid-area: overview;
  overflow: hidden;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  white-space: normal;
  margin-bottom: auto;
`;

const MovieYear = styled.div`
  grid-area: year;
  color: ${colors.primaryColor};
  font-size: 0.9em;
`;
