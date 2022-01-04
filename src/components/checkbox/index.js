import React from "react";
import styled from "styled-components";

import * as colors from "../../colors";

export default class CheckBox extends React.Component {
  // Create a custom checkbox component

  render() {
    const { label, radio = false, ...inputProps } = this.props;

    return (
      <CheckboxLabel>
        <CheckboxInput circle={radio} type="checkbox" {...inputProps} />
        {label}
      </CheckboxLabel>
    );
  }
}

const CheckboxLabel = styled.label`
  display: grid;
  grid-template-columns: min-content auto;
  gap: 0.5em;
  margin-top: 0.2em;
`;

const CheckboxInput = styled.input`
  appearance: none;
  font: inherit;
  height: 1.2em;
  width: 1.2em;
  border: 0.1em solid currentColor;
  border: 0.1em solid ${colors.fontColor};
  border-radius: 0.2em;
  border-radius: 50%;
  border-radius: ${(props) => (props.circle ? "50%" : "0.2em")};
  background-color: #fff;

  display: grid;
  margin: auto 0;
  place-content: center;

  &::before {
    content: "";
    height: 0.7em;
    width: 0.7em;
    box-shadow: inset 1em 1em ${colors.primaryColor};
    background-color: CanvasText;
    transform: scale(0);
    transition: 125ms transform ease-in-out;
    transform-origin: bottom left;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  }

  &:checked::before {
    transform: scale(1);
  }

  &:focus {
    outline: max(1px, 0.1em) solid currentColor;
    outline-offset: max(2px, 0.1em);
  }
`;
