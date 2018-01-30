import React from 'react'
import _ from 'lodash'
import Model from '../model/Model'
import {Modal, Button, Label, ControlLabel, Grid, Row, Col, Thumbnail, Checkbox, FormControl, ListGroup, ListGroupItem} from 'react-bootstrap'
import { BeatLoader } from 'react-spinners'

class FileDialog extends React.Component {
	constructor(props) {
		super(props);

		this.handleClose = this.handleClose.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.handleOpen = this.handleOpen.bind(this);
		this.handlePrimary = this.handlePrimary.bind(this);
		this.handleClickListItem = this.handleClickListItem.bind(this);
		this.handleFileNameChange = this.handleFileNameChange.bind(this);

		this.fileList = [];
		this.fileName = "";

		this.state = {
			loading: false,
			isShow: false,
			selected: -1,
			fileList: []
		};
	}

	handleClose() {
		this.props.onClose();
	}

	handlePrimary(type) {
		if (type === "Save") {
			return this.handleSave;	
		} else {
			return this.handleOpen;
		}
		
	}

	handleOpen() {
		if (this.state.selected >= 0) {
			Model().openFilter(this.state.fileList[this.state.selected].id, function(resData) {
				this.props.onOpenFilter(resData);
			}.bind(this));
			this.props.onClose();
		}
	}

	handleSave() {
		if (this.fileName) {
			if (this.state.selected >= 0) {

			} else {
				Model().saveNewFilter({
					name: this.fileName
				}, function() {
					this.props.onClose();
					//TODO pop up save successful dialog
				}.bind(this));				
			}
		}
	}

	handleClickListItem(idx) {
		return function(item) {
			this.setState({selected: idx});
		}.bind(this);
	}

	handleFileNameChange(e) {
		this.fileName = e.target.value;
		this.setState({selected: -1});
	}
	
	render() {
		var me = this,
			typeName = this.props.type === "Save" ? "保存" : "打开",
			title = typeName + "分析报告",
			isLoading = this.state.loading;

		this.fileName = this.state.selected >= 0 && this.state.fileList.length > 0 ? this.state.fileList[this.state.selected].name : this.fileName;
		this.fileList = (this.state.fileList || []).map(function(item, idx) {
				var dd = new Date(item.create_date);
				return <ListGroupItem key={idx} className={me.state.selected === idx ? "selected" : ""} onClick={me.handleClickListItem(idx)}>
					<div className="justify-content-between">
					    <h5>{item.name}</h5>
					</div>
					<div className="fileInfo">
					    <small className="date">{dd.toLocaleDateString() + " " + dd.toLocaleTimeString()}</small>
					   	<small className="user">{item.user &&item.user.name}</small>
				    </div>				
				</ListGroupItem>
			});

		return (
			<div>
				<Modal
					className="fileDialog"
					show={this.state.isShow}
					onHide={this.handleClose}
					container={this}
				>
					<Modal.Header closeButton>
						<Modal.Title>{title}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<ListGroup className="fileList" componentClass="ul">
							{isLoading ? <div className='spinner'><BeatLoader
                            color={'#1A66D9'} 
                            loading={isLoading}
                        />数据加载中</div>
							: this.fileList}
						</ListGroup>
						{this.props.type === "Save" ?
						<div className="newfile">
							<Col componentClass={ControlLabel} sm={2}>
								文件名
							</Col>
							<Col sm={10} className="fileInput">
								<FormControl id="fileName" inputRef={ref => { this.input = ref; }} type="filename" placeholder="" value={this.fileName} onChange={this.handleFileNameChange}/>
							</Col>						  
						</div>
						: <div/>}
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.handleClose}>取消</Button>
						<Button bsStyle="primary" className="save" onClick={this.handlePrimary(this.props.type)}>{typeName}</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}

module.exports = FileDialog;