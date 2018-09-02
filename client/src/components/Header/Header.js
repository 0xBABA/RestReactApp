import React, { Component } from "react";
import { Nav, NavItem, NavLink, NavbarToggler, NavbarBrand } from "reactstrap";

import UserMenu from "./UserMenu";

class Header extends Component {
  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle("sidebar-hidden");
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle("sidebar-minimized");
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle("sidebar-mobile-show");
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle("aside-menu-hidden");
  }

  render() {
    return (
      <header className="app-header navbar">
        <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
          <span className="navbar-toggler-icon" />
        </NavbarToggler>
        <NavbarBrand href="#" />
        <NavbarToggler
          className="d-md-down-none mr-auto"
          onClick={this.sidebarToggle}
        >
          <span className="navbar-toggler-icon" />
        </NavbarToggler>

        <Nav className="ml-auto" navbar>
          <NavItem className="">
            <UserMenu />
          </NavItem>
        </Nav>

        <NavbarToggler className="d-md-down-none" onClick={this.asideToggle}>
          <span className="navbar-toggler-icon" />
        </NavbarToggler>
      </header>
    );
  }
}

export default Header;
