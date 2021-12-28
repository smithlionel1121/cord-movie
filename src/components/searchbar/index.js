import React from "react";
import styled from "styled-components";

import * as colors from "../../colors";
import SearchIcon from "../../images/search-icon-yellow.png";
import CalendarIcon from "../../images/year-icon.png";

const startYear = 1900;
const currentYear = new Date().getFullYear();

export default class SearchBar extends React.Component {
  render() {
    const { keyword, year, updateInput } = this.props;
    return (
      <>
        <SearchBarWrapper>
          <InputBar
            type="search"
            value={keyword}
            onChange={updateInput}
            name="keyword"
          />
          <SearchBarIcon src={SearchIcon} />
        </SearchBarWrapper>

        <SearchBarWrapper>
          <InputBar
            type="number"
            placeholder="Year of release"
            value={year || ""}
            onChange={updateInput}
            name="year"
            min={startYear}
            max={currentYear}
          />
          <SearchBarIcon src={CalendarIcon} />
        </SearchBarWrapper>
      </>
    );
  }
}

const SearchBarWrapper = styled.div`
  position: relative;
`;

const InputBar = styled.input`
  border-style: none;
  border-bottom-style: solid;
  border-color: ${colors.primaryColor};
  width: 100%;
  padding: 16px 0 16px 35px;
  box-sizing: border-box;
  outline: 0;
  font-size: 1.17em;
  font-weight: bold;

  ::placeholder {
    color: ${colors.primaryColor};
    font-weight: 300;
  }
`;

const SearchBarIcon = styled.img.attrs({ draggable: false })`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
`;
