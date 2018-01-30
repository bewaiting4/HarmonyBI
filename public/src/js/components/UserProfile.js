import React from 'react'
import FontAwesome from 'react-fontawesome'
import {ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap'
import Model from '../model/Model'

class UserProfile extends React.Component {
    constructor() {
        super();
        this.expandMenu = this.expandMenu.bind(this);
    }

    expandMenu() {
        this.props.handleExpandMenu(this.props.name);
    }

    handleLogout() {
        Model().logout();
    }

    render() {
        const openUserMenu = this.props.selected === this.props.name;
        const user = window.appConfig && window.appConfig.user || "" ;

        return (
            <li className={openUserMenu ? "open" : ""}>
{/*                <a
                    className="user-profile dropdown-toggle"
                    data-toggle="dropdown"
                    aria-expanded={openUserMenu ? "true" : "false"}
                    onClick={this.expandMenu}
                >

                    <span className='fa-stack fa-lg'>
                        <FontAwesome name='circle' stack='2x'/>
                        <FontAwesome name="user" stack='1x' style={{left: '-2px'}}/>
                        <FontAwesome name="angle-down" stack='1x'style={{left: '6px', "fontSize": '10px'}}/>
                    </span>

                </a>
*/}                
                <ButtonToolbar>
                    <DropdownButton
                        title={                    <span className='fa-stack fa-lg'>
                        <FontAwesome name='circle' stack='2x'/>
                        <FontAwesome name="user" stack='1x' style={{left: '-2px'}}/>
                        <FontAwesome name="angle-down" stack='1x'style={{left: '6px', "fontSize": '10px'}}/>
                    </span>
}
                        id={"dropdown-" + this.props.name}
                        noCaret
                        className="settings dropdown-toggle"

                    >

                        <MenuItem onClick={this.handleLogout} eventKey="1">                            <span>{user}</span>
                            <span style={{"float": "right"}}>
                                <FontAwesome name="sign-out"/>
                                登出
                            </span>
                        </MenuItem>                    
                    </DropdownButton>
                </ButtonToolbar>                


                <ul className="dropdown-menu dropdown-usermenu pull-right">
                    <li>
                        <a 
                            href="javascript:;"
                            onClick={this.handleLogout}
                        >
                            <span>{user}</span>
                            <span style={{"float": "right"}}>
                                <FontAwesome name="sign-out"/>
                                登出
                            </span>
                        </a>
                    </li>
                </ul>
            </li>
        );
    }
}

UserProfile.defaultProps = {
    userName: "admin"
}

module.exports = UserProfile;