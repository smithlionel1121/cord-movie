import React from "react";
import styled, { css } from "styled-components";
import { NavLink as Link } from "react-router-dom";

import * as colors from "../../colors";
import * as breakpoints from "../../breakpoints";
import Arrow from "../../images/arrow-icon.png";
import SearchWhite from "../../images/search-icon-white.png";

export default class SideNavBar extends React.Component {
  /* Write the necessary functions to show and hide the side bar on small devices */

  render() {
    const { isOpen } = this.state;

    return (
      <SideNavBarCont isOpen={isOpen}>
        {/* Implement a hamburger icon slide in effect for small devices */}
        <SideNavMainLink className="menu_nav_link main_nav_link" to="/" exact>
          Wesley
          <NavIcon src={Arrow} alt="dropdown arrow" />
        </SideNavMainLink>
        <SideNavMainLink className="menu_nav_link" to="/discover">
          Discover
          <NavIcon src={SearchWhite} alt="search icon" />
        </SideNavMainLink>
        <SideNavHeader>
          <HeaderText>Watched</HeaderText>
        </SideNavHeader>
        <NavLink className="menu_nav_link" to="/watched/movies">
          Movies
        </NavLink>
        <NavLink className="menu_nav_link" to="/watched/tv-shows">
          Tv Shows
        </NavLink>
        <SideNavHeader>
          <HeaderText>Saved</HeaderText>
        </SideNavHeader>
        <NavLink className="menu_nav_link" to="/saved/movies">
          Movies
        </NavLink>
        <NavLink className="menu_nav_link" to="/saved/tv-shows">
          Tv Shows
        </NavLink>
      </SideNavBarCont>
    );
  }
}

const SideNavBarCont = styled.div`
  position: fixed;
  z-index: 9;
  width: 260px;
  height: 100%;
  background-color: ${colors.sideNavBar};
  transition: transform 250ms ease-in;

  @media only screen and (max-width: ${breakpoints.mobile}) {
    ${(props) =>
      props.isOpen
        ? css`
            transform: translateX(0%);
          `
        : css`
            transform: translateX(-100%);
          `}
  }
`;

const SideNavMainLink = styled(Link)`
  position: relative;
  display: block;
  padding: 25px 35px;
  font-size: 1.6em;
  font-weight: 700;
  color: white;
`;

const NavIcon = styled.img`
  position: absolute;
  right: 35px;
  top: 50%;
  transform: translateY(-50%);
`;

const SideNavHeader = styled.div`
  font-size: 1.6em;
  padding: 25px 0 0 35px;
`;

const HeaderText = styled.div`
  padding-bottom: 10px;
  border-bottom: solid thin white;
  color: white;
`;

const NavLink = styled(Link)`
  display: block;
  margin: 15px auto;
  padding-left: 35px;
  color: white;
  font-weight: 100;
`;
