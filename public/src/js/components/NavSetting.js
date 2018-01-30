import React from 'react'
import FileDialog from './FileDialog'
import Model from '../model/Model'
import {MenuItem, ButtonToolbar, DropdownButton} from 'react-bootstrap'
import { BeatLoader } from 'react-spinners'

import FontAwesome from 'react-fontawesome'

class NavSetting extends React.Component {
    constructor() {
        super();
        this.expandMenu = this.expandMenu.bind(this);
        this.openFileDialog = this.openFileDialog.bind(this);
        this.closeFileDialog = this.closeFileDialog.bind(this);
        this.handleOpenFilter = this.handleOpenFilter.bind(this);
        this.state = {
            isShow: false,
            loading: false,
            fileList: []
        };
    }

    expandMenu() {
        this.props.handleExpandMenu(this.props.name);
    }

    openFileDialog() {
        this.refs.fileDlg.setState({
            isShow: true,
            loading: true
        })

        Model().getFilterList(function(res) {
            this.refs.fileDlg.setState({
                isShow: true,
                loading: false,
                fileList: res
            });
        }.bind(this));
    }

    closeFileDialog() {
        this.refs.fileDlg.setState({isShow: false, title: this.props.menuItem});
    }

    handleOpenFilter(resData) {
        this.props.onOpenFilter(resData);
    }

    render() {
        const openUserMenu = this.props.selected === this.props.name;
        const icon = this.props.icon;
        const isLoading = true;//this.state.loading;

        return (
            <li ref="dropdown" className={openUserMenu ? "open" : ""}>
{/*                <a
                    id={"dropdown-" + this.props.name}
                    className="settings dropdown-toggle"
                    data-toggle="dropdown"
                    aria-expanded={openUserMenu ? true : false}
                    onClick={this.expandMenu}
                >
                    <span className='fa-stack fa-lg'>
                        <FontAwesome name='circle' stack='2x'/>
                        <FontAwesome name={this.props.icon} stack='1x'/>
                    </span>
                    
                </a>
            */}
                <ButtonToolbar>
                    <DropdownButton
                        title={<span className='fa-stack fa-lg'>
                            <FontAwesome name='circle' stack='2x'/>
                            <FontAwesome name={this.props.icon} stack='1x'/>
                        </span>
}
                        id={"dropdown-" + this.props.name}
                        noCaret
                        className="settings"

                    >

                        <MenuItem onClick={this.openFileDialog} eventKey="1">{this.props.menuItem}</MenuItem>                    </DropdownButton>
                </ButtonToolbar>                

{/*                <ul className="dropdown-menu dropdown-usermenu pull-right">
                    <li onClick={this.openFileDialog}>
                        <a href="javascript:;">
                            {this.props.menuItem}
                        </a>
                    </li>
                </ul>

                <div className={isLoading ? 'curtain' : ''}>
                    <div className='spinner' style={{left: document.body.clientWidth/2, top: '60px', position: 'relative'}}>
                        <BeatLoader
                            color={'#123abc'} 
                            loading={isLoading}
                        />
                        数据加载中     
                    </div>
                </div>         
*/}                
                <FileDialog
                    ref='fileDlg'
                    onClose={this.closeFileDialog}
                    onOpenFilter={this.handleOpenFilter}
                    type={this.props.name}
                />
            </li>
        );
    }
}

module.exports = NavSetting;