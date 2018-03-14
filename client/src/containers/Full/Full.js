import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Link, Switch, Route, Redirect } from "react-router-dom";
import { Container } from "reactstrap";
import Header from "../../components/Header/";
import Sidebar from "../../components/Sidebar/";
import Breadcrumb from "../../components/Breadcrumb/";
import Aside from "../../components/Aside/";
import Footer from "../../components/Footer/";

import Dashboard from "../../views/Dashboard/";
import Account from "../../views/Account/";
import Login from "../../views/Login/";

import * as actions from "../../actions/index";

import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";
const userIsAuthenticated = connectedRouterRedirect({
  redirectPath: "/login",
  authenticatedSelector: (state, ownProps) =>
    state.user !== false && state.user !== null,
  authenticatingSelector: state => state.isLoading,
  wrapperDisplayName: "UserIsAuthenticated"
});

//  AUTH "NON" route check sounds back to query param or "homepage <-maybe dashboard"
import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
const locationHelper = locationHelperBuilder({});
const userIsNotAuthenticated = connectedRouterRedirect({
  //user is actually logged in so, if they have redirect send there else go to account
  redirectPath: (state, ownProps) => {
    return locationHelper.getRedirectQueryParam(ownProps) || "/account";
  },
  authenticatedSelector: (state, ownProps) =>
    state.user == false || state.user == null,
  //prevent addingg query param when sending user away from rsource page
  allowRedirectBack: false,
  wrapperDisplayName: "UserIsNotAuthenticated"
});

import createHistory from "history/createBrowserHistory";

const history = createHistory();

class Full extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const localJWT = localStorage.getItem("jwt");

    //if not a user in states
    if (!this.props.user && localJWT) {
      this.props.readUser(() => {
        this.props.history.push("/account");
      });
    }
  }

  isAuthed() {
    if (!this.props.user) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props} />
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              <Switch>
                <Route
                  path="/login"
                  name="Login"
                  component={userIsNotAuthenticated(Login)}
                />
                <Route
                  path="/account"
                  name="Account"
                  component={userIsAuthenticated(Account)}
                />
                <Route
                  path="/dashboard"
                  name="Dashboard"
                  component={Dashboard}
                />
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </Container>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
}

Full.defaultProps = {
  user: false
};

function mapStateToProps({ user }) {
  return { user };
}
//export default Full;
export default connect(mapStateToProps, actions)(Full);
