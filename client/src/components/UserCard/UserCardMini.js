import React, { Component } from "react";
import PropTypes from "prop-types";

class UserCardMini extends Component {
  constructor(props) {
    super(props);
  }

  renderAvatar() {
    if (this.props.user) {
      return (
        <img
          style={{ maxHeight: "40px" }}
          src={this.props.user.avatar}
          className="img img-avatar --center-block mt-2"
        />
      );
    }
    return false;
  }

  renderUsername() {
    if (this.props.user.name) {
      return (
        <p
          style={{ overflow: "hidden", textOverflow: "ellipsis" }}
          className=" mt-0 mb-0 text-left"
        >
          {this.props.user.name}
        </p>
      );
    }
    return false;
  }

  renderEmail() {
    if (this.props.user.email) {
      return (
        <p
          style={{ overflow: "hidden", textOverflow: "ellipsis" }}
          className="my-0 text-left small"
        >
          {this.props.user.email}
        </p>
      );
    }
    return false;
  }

  render() {
    return (
      <div
        className="w-100"
        style={{ overflow: "hidden", textOverflow: "ellipsis" }}
      >
        <div className="">{this.renderAvatar()}</div>
        <div className="p-1">
          {this.renderUsername()}
          {this.renderEmail()}
        </div>
      </div>
    );
  }
}

UserCardMini.defaultProps = {
  user: false
};
UserCardMini.propTypes = {
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
};

export default UserCardMini;
