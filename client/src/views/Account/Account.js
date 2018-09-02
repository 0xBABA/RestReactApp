import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import * as actions from "../../actions/index";

import UserCard from "../../components/UserCard";

class Account extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.user) {
      return (
        <div className="animated fadeIn">
          <UserCard user={this.props.user} updateUser={this.props.updateUser} />
        </div>
      );
    }
    return <div>You must be logged in to continue!</div>;
  }
}

Account.propTypes = {};

function mapStateToProps({ user }) {
  return { user };
}

export default connect(
  mapStateToProps,
  actions
)(Account);
