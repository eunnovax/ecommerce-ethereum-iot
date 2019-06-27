import React, { Component } from "react";
import { Link } from "react-router-dom";
import diamond from "../diamond.svg";
import styled from "styled-components";
import { ButtonContainer } from "./Button";

export default class Navbar extends Component {
  render() {
    return (
      <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
        <Link to="/">
          <img
            src={diamond}
            alt="store"
            width="40px"
            className="navbar-brand"
          />
        </Link>
        <ul className="navbar-nav align-items-center">
          <li className="nav-item ml-5">
            <Link to="/" className="nav-Link">
              products
            </Link>
          </li>
          <li className="nav-item ml-5">
            <Link to="/manage" className="nav-Link">
              manage
            </Link>
          </li>
          <li className="nav-item ml-5">
            <Link to="/tracking" className="nav-Link">
              tracking order
            </Link>
          </li>
        </ul>
        <Link to="/cart" className="ml-auto">
          <ButtonContainer>
            <span className="mr-2">
              <i className="fas fa-cart-plus" />
            </span>
            My cart
          </ButtonContainer>
        </Link>
      </NavWrapper>
    );
  }
}

const NavWrapper = styled.nav`
  background: var(--darkOcean);
  .nav-Link {
    color: var(--mainWhite) !important;
    font-size: 1.3rem;
    text-transform: capitalize;
  }
`;
