import React from "react";
import styled, { css } from "styled-components";

import ExpandableFilter from "../../components/expandablefilter";
import SearchBar from "../../components/searchbar";
import CheckBox from "../checkbox";

import { TOGGLE_GENRE_FILTER } from "../../pages/discover/actions";

export default class SearchFilters extends React.Component {
  render() {
    const { genres, dispatch } = this.props;

    return (
      <FiltersWrapper>
        <SearchFiltersCont className="search_inputs_cont" marginBottom>
          {/* Implement a "SearchBar" component and re-use it for the keyword and the year inputs */}
          <SearchBar />
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
