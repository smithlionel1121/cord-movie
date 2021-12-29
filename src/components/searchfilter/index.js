import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";

import ExpandableFilter from "../../components/expandablefilter";
import SearchBar from "../../components/searchbar";
import CheckBox from "../checkbox";

import * as breakpoints from "../../breakpoints";
import SearchIcon from "../../images/search-icon-yellow.png";
import CalendarIcon from "../../images/year-icon.png";
import { TOGGLE_GENRE_FILTER } from "../../pages/discover/actions";

const startYear = 1870;
const currentYear = new Date().getFullYear() + 10;

export default function SearchFilters({
  genres,
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
        <SearchFiltersCont className="search_inputs_cont" marginBottom>
          {/* Implement a "SearchBar" component and re-use it for the keyword and the year inputs */}
        <SearchBar
          type="search"
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
            {genres.map((filter) => (
              <li key={filter.id}>
                <CheckBox
                  filter={filter}
                  actionName={TOGGLE_GENRE_FILTER}
                  dispatch={dispatch}
                />
              </li>
            ))}
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
