import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled, { css } from "styled-components";
import * as breakpoints from "../src/breakpoints";

import SideNavBar from "./components/sidenavbar";

import Discover from "./pages/discover";

import "./css/app.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sidebarOpen: false };
  }

  toggleSidebar(isOpen) {
    if (typeof isOpen === "boolean") {
      this.setState({ sidebarOpen: isOpen });
      return;
    }

    this.setState((state) => ({ sidebarOpen: !state.sidebarOpen }));
  }

  render() {
    const { sidebarOpen } = this.state;

    return (
      <Router>
        <PageContainer>
          <SideNavBar
            isOpen={sidebarOpen}
            toggleSidebar={(isOpen) => this.toggleSidebar(isOpen)}
          />
          <ContentWrapper sidebarOpen={sidebarOpen}>
            <Switch>
              <Route path="/discover" {...this.props}>
                <Discover toggleSidebar={() => this.toggleSidebar()} />
              </Route>
            </Switch>
          </ContentWrapper>
        </PageContainer>
      </Router>
    );
  }
}

const ContentWrapper = styled.main`
  padding-left: 260px;
  transition: padding 250ms ease-in;

  @media only screen and (max-width: ${breakpoints.lg}) {
    ${({ sidebarOpen }) =>
      !sidebarOpen &&
      css`
        padding-left: 0px;
      `}
  }

  @media only screen and (max-width: ${breakpoints.sm}) {
    padding-left: 0px;
  }
`;

const PageContainer = styled.main``;
