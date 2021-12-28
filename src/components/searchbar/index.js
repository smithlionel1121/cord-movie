import React, { useEffect, useState } from "react";
import styled from "styled-components";

import * as colors from "../../colors";
import SearchIcon from "../../images/search-icon-yellow.png";
import CalendarIcon from "../../images/year-icon.png";

const startYear = 1900;
const currentYear = new Date().getFullYear();

export default function SearchBar({ keyword, year, updateInput }) {
  const [validYear, setValidYear] = useState(true);

  useEffect(() => {
    setValidYear(!year || (startYear <= year && year <= currentYear));
  }, [year]);

  return (
    <>
      <SearchBarWrapper>
        <InputBar
          type="search"
          value={keyword}
          onChange={updateInput}
          name="keyword"
          autoComplete="off"
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
      {!validYear && (
        <InputValidationMessage>
          Please enter a year between {startYear} and {currentYear}
        </InputValidationMessage>
      )}
    </>
  );
}

const SearchBarWrapper = styled.div`
  position: relative;
`;

const InputBar = styled.input`
  border-style: none;
  border-bottom-style: solid;
  border-color: ${colors.primaryColor};
  color: ${colors.primaryColor};
  width: 100%;
  padding: 16px 0 16px 35px;
  box-sizing: border-box;
  outline: 0;
  font-size: 1.17em;
  font-weight: bold;

  &::placeholder {
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

const InputValidationMessage = styled.span`
  color: red;
`;
