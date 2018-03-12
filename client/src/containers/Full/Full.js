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

import * as actions from "../../actions/index";

import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";
const userIsAuthenticated = connectedRouterRedirect({
  //if login fail go here
  redirectPath: "/signup",
  authenticatedSelector: (state, ownProps) =>
    state.user !== false && state.user !== null,
  authenticatingSelector: state => state.isLoading,
  //nice dispaly name
  wrapperDisplayName: "UserIsAuthenticated"
});

import createHistory from "history/createBrowserHistory";

const history = createHistory();

class Full extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };

    this.updateLoading = this.updateLoading.bind(this);
  }

  updateLoading(state) {
    this.setState({ isLoading: state });
  }

  componentWillMount() {
    const localJWT = localStorage.getItem("jwt");

    //if not a user in states
    if (!this.props.user && localJWT) {
      this.updateLoading(true);
      this.props.readUser(() => {
        this.props.history.push("/account");
        this.updateLoading(false);
      });
    }
  }

  isAuthed() {
    //console.log("is auth", this.props.user);
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
