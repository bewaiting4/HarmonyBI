import React from 'react'
import ReactDOM from 'react-dom'
import { Modal, ListGroup, ListGroupItem, Button } from 'react-bootstrap'
import { BeatLoader } from 'react-spinners'
import Model from './model/Model'
import UserProfile from './components/UserProfile'

import style from './build/scss/app.scss'

class TopNav extends React.Component {
    constructor() {
        super()

        this.handleExpandMenu = this.handleExpandMenu.bind(this)
        this.state = {
            on: "",
            isLoading: true
        }
    }

    handleExpandMenu(name) {
        this.setState(function(prevState, props) {
            return {
                // 如果选中该选项且下拉菜单确实打开
                on: prevState.on === name ? ""  : name
            }
        })
    }

    render() {
        const selected = this.state.on

        return (
            <div className="top_nav">
                <div className="nav_menu">
                    <nav>
                        <ul className="nav navbar-nav navbar-right">
                            {/* user profile */}
                            <UserProfile
                                name="Profile"
                                handleExpandMenu={this.handleExpandMenu}
                                selected={selected}
                            />
                        </ul>
                    </nav>

                    {/* title of main content */}
                    <h3 className="menu_title" style={{ marginLeft: "20px" }}>管理员页面</h3>
                </div>
            </div>
        )
    }
}

class FileManager extends React.Component {
    constructor() {
        super()

        this.handleDeleteListItem = this.handleDeleteListItem.bind(this)
        this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this)
        this.handleCancelDelete = this.handleCancelDelete.bind(this)

        this.state = {
            isLoading: false,
            showConfirm: false,
            selected: -1,
            fileList: []
        }
    }

    componentDidMount() {
        this.setState({isLoading: true})

        Model().getFilterList(function(res) {
            this.setState({
                isLoading: false,
                fileList: res
            });
        }.bind(this));        
    }

    handleDeleteListItem(idx) {
        return function(item) {
            this.setState({
                selected: idx,
                showConfirm: true
            })
        }.bind(this)        
    }

    handleDeleteConfirm() {
        this.setState({
            showConfirm: false,
            isLoading: true
        })

        Model().deleteFilter(this.state.fileList[this.state.selected].id, function(res) {
            console.log(res)

            this.setState(function(prevState, props) {
                let list = this.state.fileList.slice()

                if (prevState.fileList[prevState.selected].id === res._id) {
                    list.splice(prevState.selected, 1)
                }
                return {
                    selected: -1,
                    isLoading: false,
                    fileList: list
                }                
            })
        }.bind(this))
    }

    handleCancelDelete() {
        this.setState({
            showConfirm: false,
            selected: -1
        })
    }

    render() {
        let isLoading = this.state.isLoading

        this.fileList = (this.state.fileList || []).map(function(item, idx) {
                var dd = new Date(item.create_date);
                return <ListGroupItem key={idx} className={this.state.selected === idx ? "selected" : ""}>
                    <div className="justify-content-between">
                        <h5>{item.name}</h5>
                        <ul className="nav navbar-right panel_toolbox">
                            <li onClick={this.handleDeleteListItem(idx)}>
                                <a className="collapse-link">
                                    <i className="fa fa-close"></i>
                                </a>
                            </li>
                        </ul>                        
                    </div>
                    <div className="fileInfo">
                        <small className="date">{dd.toLocaleDateString() + " " + dd.toLocaleTimeString()}</small>
                        <small className="user">{item.user &&item.user.name}</small>
                    </div>              
                </ListGroupItem>
            }.bind(this));

        return (
            <div className="file_manager">
                <label>文件管理</label>
                <div className="fileList_wrapper">
                    <ListGroup className="fileList" componentClass="ul">
                        {isLoading ? <div className='spinner'><BeatLoader
                        color={'#1A66D9'} 
                        loading={isLoading}
                    />数据加载中</div>
                        : this.fileList}
                    </ListGroup>
                </div>
                <Modal show={this.state.showConfirm}>
                    <Modal.Header>
                        <Modal.Title>确定要删除该文件吗？</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button onClick={this.handleCancelDelete}>取消</Button>
                        <Button onClick={this.handleDeleteConfirm} bsStyle="primary">确定</Button>
                    </Modal.Footer>
                </Modal>                    
            </div>
        )
    }
}

ReactDOM.render(
    <div className="admin">
        <TopNav/>
        <div className="container">
            <FileManager/>
        </div>
    </div>,
    
    document.getElementById("admin")
);