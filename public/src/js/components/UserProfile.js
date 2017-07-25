import React from 'react'

import FontAwesome from 'react-fontawesome';

class UserProfile extends React.Component {
  constructor() {
      super();
      this.expandMenu = this.expandMenu.bind(this);
  }

  expandMenu() {
    this.props.handleExpandMenu(this.props.name);
  }

  render() {
    const openUserMenu = this.props.selected === this.props.name;
    
    return <li className={openUserMenu? 'open' : ''}>
        <a className="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded={openUserMenu? 'true' : 'false'} onClick={this.expandMenu}>
            <FontAwesome name="user" size='2x'/>
            李佳
            <FontAwesome name="angle-down"/>
        </a>
        <ul className="dropdown-menu dropdown-usermenu pull-right">
          <li><a href="javascript:;">帮助</a></li>
          <li><a href="javascript:;">
            <FontAwesome name='sign-out'/>登出</a>
          </li>
        </ul>
    </li>
  }
}
module.exports = UserProfile;
