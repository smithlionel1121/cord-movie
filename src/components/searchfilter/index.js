import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";

import ExpandableFilter from "../../components/expandablefilter";
import SearchBar from "../../components/searchbar";

import * as breakpoints from "../../breakpoints";
import SearchIcon from "../../images/search-icon-yellow.png";
import CalendarIcon from "../../images/year-icon.png";
import ExpandableFilterList from "../expandablefilterlist";

const startYear = 1870;
const currentYear = new Date().getFullYear() + 10;

export default function SearchFilters({
  genres,
  ratings,
  languages,
  keyword,
  year,
  updateInput,
  dispatch,
}) {
  const [validYear, setValidYear] = useState(true);

  useEffect(() => {
    setValidYear(!year || (startYear <= year && year <= currentYear));
  }, [year]);

  return (
    <FiltersWrapper>
      <SearchFiltersCont className="search_inputs_cont" mobile marginBottom>
        {/* Implement a "SearchBar" component and re-use it for the keyword and the year inputs */}
        <SearchBar
          type="text"
          value={keyword}
          name="keyword"
          onChange={updateInput}
          placeholder="Search for movies"
          icon={SearchIcon}
          mobile={true}
        />
        <SearchBar
          type="number"
          value={year || ""}
          name="year"
          onChange={updateInput}
          placeholder="Year of release"
          min={startYear}
          max={currentYear}
          icon={CalendarIcon}
        >
          {!validYear && (
            <InputValidationMessage>
              Please enter a year between {startYear} and {currentYear}
            </InputValidationMessage>
          )}
        </SearchBar>
      </SearchFiltersCont>

      <SearchFiltersCont>
        <CategoryTitle>Movies</CategoryTitle>
        {/* Implement a component called "ExpandableFilter" and apply it to all filter categories */}
        <ExpandableFilter filterLabel="Genre(s)">
          <ExpandableFilterList
            field="genreOptions"
            list={genres}
            radio={false}
            dispatch={dispatch}
          />
        </ExpandableFilter>
        <ExpandableFilter filterLabel="min. vote">
          <ExpandableFilterList
            field="ratingOptions"
            list={ratings}
            radio={true}
            dispatch={dispatch}
          />
        </ExpandableFilter>
        <ExpandableFilter filterLabel="Language">
          <ExpandableFilterList
            field="languageOptions"
            list={languages}
            radio={true}
            dispatch={dispatch}
          />
        </ExpandableFilter>
      </SearchFiltersCont>
    </FiltersWrapper>
  );
}

const FiltersWrapper = styled.div`
  position: relative;
`;

const SearchFiltersCont = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 3px;
  transition: all 0.3s ease-in-out;

  @media only screen and (max-width: ${breakpoints.md}) {
    background-color: transparent;
    padding: 20px 0;

    ${(props) =>
      !props.mobile &&
      css`
        display: none;
      `}
  }

  ${(props) =>
    props.marginBottom &&
    css`
      margin-bottom: 15px;
    `}
`;

const CategoryTitle = styled.div``;

const InputValidationMessage = styled.span`
  color: red;
`;
