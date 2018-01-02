import React from 'react'
import FileDialog from './FileDialog'
import Model from '../model/Model'

import FontAwesome from 'react-fontawesome'

class NavSetting extends React.Component {
    constructor() {
        super();
        this.expandMenu = this.expandMenu.bind(this);
        this.openFileDialog = this.openFileDialog.bind(this);
        this.closeFileDialog = this.closeFileDialog.bind(this);
        this.state = {
            isShow: false,
            fileList: []
        };
    }

    expandMenu() {
        this.props.handleExpandMenu(this.props.name);
    }

    openFileDialog() {
        Model().getFilterList(function(res) {
            this.refs.fileDlg.setState({
                isShow: true,
                fileList: res
            });
        }.bind(this));
    }

    closeFileDialog() {
        this.refs.fileDlg.setState({isShow: false, title: this.props.menuItem});
    }

    render() {
        const openUserMenu = this.props.selected === this.props.name;
        const icon = this.props.icon;

        return (
            <li ref="dropdown" className={openUserMenu ? "open" : ""}>
                <a
                    className="settings dropdown-toggle"
                    data-toggle="dropdown"
                    aria-expanded={openUserMenu ? "true" : "false"}
                    onClick={this.expandMenu}
                >
                    <span className='fa-stack fa-lg'>
                        <FontAwesome name='circle' stack='2x'/>
                        <FontAwesome name={this.props.icon} stack='1x'/>
                    </span>
                    
                </a>

                <ul className="dropdown-menu dropdown-usermenu pull-right">
                    <li onClick={this.openFileDialog}>
                        <a href="javascript:;">
                            {this.props.menuItem}
                        </a>
                    </li>
                </ul>

                <FileDialog
                    ref='fileDlg'
                    onClose={this.closeFileDialog}
                    type={this.props.name}
                />
            </li>
        );
    }
}

module.exports = NavSetting;