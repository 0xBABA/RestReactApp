import React, { Component } from "react";
import PropTypes from "prop-types";

import { Card } from "reactstrap";

class UserCard extends Component {
  constructor(props) {
    super(props);
  }

  renderAvatar() {
    if (this.props.user) {
      return <img src={this.props.user.avatar} className="img center-block" />;
    }
    return false;
  }

  renderUsername() {
    if (this.props.user.name) {
      return <h1 className="mt-1 text-left">{this.props.user.name}</h1>;
    }
    return false;
  }

  renderEmail() {
    if (this.props.user.email) {
      return <h6 className="mt-1 text-left ml-1">{this.props.user.email}</h6>;
    }
    return false;
  }

  render() {
    return (
      <Card>
        <div className="d-flex justify-content-start flex-wrap">
          <div className="mr-2 align-self-center ">{this.renderAvatar()}</div>
          <div className="ml-2 mr-auto align-self-center ">
            {this.renderUsername()}
            {this.renderEmail()}
          </div>
        </div>
      </Card>
    );
  }
}

UserCard.propTypes = {
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
};

export default UserCard;
