import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

export default function ExpandableFilter({ filterLabel, children }) {
  // You need to create your own checkbox component with a custom checkmark
  const [filtersShown, setFiltersShown] = useState(false);

  const listRef = useRef(null);

  useEffect(() => {
    listRef.current.style.maxHeight = filtersShown
      ? listRef.current.scrollHeight + "px"
      : null;
  }, [filtersShown]);

  const id = filterLabel.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-");
  return (
    <>
      <FilterButton
        onClick={() => setFiltersShown(!filtersShown)}
        aria-expanded={filtersShown}
        id={`accordian-${id}`}
        aria-controls={`list-${id}`}
      >
        <FilterLabel>
          <ExpansionSymbol expanded={!filtersShown} /> Select {filterLabel}
        </FilterLabel>
      </FilterButton>

      <FilterList
        ref={listRef}
        expanded={filtersShown}
        aria-expanded={filtersShown}
        id={`list-${id}`}
        aria-labelledby={`accordian-${id}`}
      >
        {children}
      </FilterList>
    </>
  );
}

const FilterButton = styled.button`
  display: block;
  position: relative;
  width: 100%;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  margin: 1em 0 0 0;
  padding: 0;
  text-align: left;

  &:focus {
    outline: thin auto currentColor;
    outline-offset: 0.3em;
  }
`;
const FilterLabel = styled.h4`
  margin: auto 0;
  position: relative;
  display: grid;
  grid-template-columns: min-content auto;
  gap: 0.5em;
`;
const ExpansionSymbol = styled.span`
  position: relative;
  align-self: center;
  height: 0.15em;
  width: 1.2em;
  background-color: currentColor;
  border-radius: 0.1em;

  ::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 0.15em;
    background-color: currentColor;
    transition: height 125ms ease-in;
    width: 0.15em;

    ${(props) => css`
      height: ${props.expanded ? "1.2em" : "0em"};
    `}
  }
`;

const FilterList = styled.ul`
  list-style: none;
  max-height: 0;
  overflow-y: clip;
  margin: 0;
  padding: 0.2em 0;
  transition: max-height 250ms ease-in;

  &[aria-expanded="false"] {
    visibility: hidden;
    padding: 0;
  }
`;
