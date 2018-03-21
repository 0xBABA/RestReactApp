import React, { Component } from "react";
import UserCardMini from "../UserCard/UserCardMini";

import PropTypes from "prop-types";

class SidebarHeader extends Component {
  renderUserCardMini() {
    return (
      <div className="pb-2">
        <UserCardMini user={this.props.user} />
      </div>
    );
  }

  render() {
    if (this.props.user) {
      return (
        <div className="sidebar-header text-center p-1">
          {this.props.user ? this.renderUserCardMini() : false}
        </div>
      );
    }
    return false;

    // Uncomment following code lines to add Sidebar Header
    // return (
    //   <div className="sidebar-header"></div>
    // )
  }
}

SidebarHeader.defaultProps = {
  user: false
};

SidebarHeader.propTypes = {
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
};

export default SidebarHeader;
