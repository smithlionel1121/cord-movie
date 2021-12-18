import React from "react";
import styled from "styled-components";

import Checkbox from "../checkbox";

export default class ExpandableFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filtersShown: false,
    };
  }

  // You need to create your own checkbox component with a custom checkmark
}
