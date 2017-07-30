import React from "react";

import FontAwesome from "react-fontawesome";

class NavSetting extends React.Component {
  constructor() {
      super();
      this.expandMenu = this.expandMenu.bind(this);
  }

  expandMenu() {
      this.props.handleExpandMenu(this.props.name);
  }

  render() {
      const openUserMenu = this.props.selected === this.props.name;
      const icon = this.props.icon;

      return (
          <li className={openUserMenu ? "open" : ""}>
              <a
                  className="user-profile dropdown-toggle"
                  data-toggle="dropdown"
                  aria-expanded={openUserMenu ? "true" : "false"}
                  onClick={this.expandMenu}
              >

                  <FontAwesome name={this.props.icon} size="2x" />

                  <FontAwesome name="angle-down" />
              </a>
              <ul className="dropdown-menu dropdown-usermenu pull-right">
                  <li>
                      <a href="javascript:;">
                          {this.props.menuItem}
                      </a>
                  </li>
              </ul>
          </li>
    );
  }
}
module.exports = NavSetting;