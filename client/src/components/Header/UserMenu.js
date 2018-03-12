import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions/index";

import {
  Nav,
  NavbarToggler,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from "reactstrap";

class UserMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
    this.toggle = this.toggle.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.user !== this.props.user) {
      this.renderMenu();
    }
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle("aside-menu-hidden");
  }

  logoutUser() {
    this.props.logoutUser();
  }

  renderUserMenu() {
    // Add this into the right side once its built
    //<NavbarToggler className="d-md-down-none" type="button" onClick={this.asideToggle}>&#9776;</NavbarToggler>
    //

    const user = this.props.user;

    return [
      <NavItem key="0">
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle className="nav-link dropdown-toggle mr-4">
            <img
              src={user.avatar}
              className="img-avatar"
              alt={user.name ? user.name : "n/a"}
            />
            <span className="d-md-down-none">{user.name}</span>
          </DropdownToggle>
          <DropdownMenu
            id="userMenu"
            right
            className={this.state.dropdownOpen ? "show dropdown-menu-lg " : ""}
          >
            <DropdownItem header tag="div" className="bg-default  text-center">
              <b>Account:</b>
            </DropdownItem>

            <DropdownItem header tag="div" className="bg-default  text-center">
              <b>Settings:</b>
            </DropdownItem>

            <Link to="/account">
              <DropdownItem>
                <i className="fa fa-user-circle" />Account Settings
              </DropdownItem>
            </Link>

            <DropdownItem header tag="div" className="bg-default text-center">
              <b>Sign Out</b>
            </DropdownItem>

            <a className="text-right" href="#" onClick={this.logoutUser}>
              <DropdownItem className="text-left">
                <span className="mx-2">
                  <i className="fa fa-sign-out" />Sign Out:
                </span>
              </DropdownItem>
            </a>
          </DropdownMenu>
        </Dropdown>
      </NavItem>
    ];
  }

  renderLoginLink() {
    return (
      <NavItem className="px-3">
        <NavLink
          href="/api/authentication/google/start"
          title="Sign in using Youtube"
        >
          <span>
            Sign-in using: <i className="fa fa-youtube fa-2x" />
          </span>
        </NavLink>
      </NavItem>
    );
  }

  renderMenu() {
    const user = this.props.user;
    if (user) {
      return this.renderUserMenu();
    }
    return this.renderLoginLink();
  }

  render() {
    return <Nav>{this.renderMenu()}</Nav>;
  }
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps, actions)(UserMenu);
