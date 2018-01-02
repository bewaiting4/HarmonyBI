import React from 'react'
import _ from 'lodash'
import Model from '../model/Model'
import {Modal, Button, Label, ControlLabel, Grid, Row, Col, Thumbnail, Checkbox, FormControl, ListGroup, ListGroupItem} from 'react-bootstrap'

class FileDialog extends React.Component {
	constructor(props) {
		super(props);

		this.handleClose = this.handleClose.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.handlePrimary = this.handlePrimary.bind(this);
		this.handleClickListItem = this.handleClickListItem.bind(this);
		this.handleFileNameChange = this.handleFileNameChange.bind(this);

		this.fileList = [];
		this.fileName = "";

		this.state = {
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
		if (this.fileName) {
			
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
			title = (this.props.type === "Save" ? "保存" : "打开") + "分析报告";
		this.fileName = this.state.selected >= 0 && this.state.fileList.length > 0 ? this.state.fileList[this.state.selected].name : this.fileName;
		this.fileList = (this.state.fileList || []).map(function(item, idx) {
				var dd = new Date(item.create_date);
				return <ListGroupItem className={me.state.selected === idx ? "selected" : ""} onClick={me.handleClickListItem(idx)}>
					<div className="justify-content-between">
					    <h5>{item.name}</h5>
					</div>
					<div className="fileInfo">
					    <small className="date">{dd.toLocaleDateString() + " " + dd.toLocaleTimeString()}</small>
					   	<small className="user">{item.user}</small>
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
						<Modal.Title>{this.props.title}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<ListGroup className="fileList" componentClass="ul">
							{this.fileList}
						</ListGroup>
						<div className="newfile">
							<Col componentClass={ControlLabel} sm={2}>
								文件名
							</Col>
							<Col sm={10} className="fileInput">
								<FormControl id="fileName" inputRef={ref => { this.input = ref; }} type="filename" placeholder="" value={this.fileName} onChange={this.handleFileNameChange}/>
							</Col>						  
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.handleClose}>取消</Button>
						<Button bsStyle="primary" className="save" onClick={this.handlePrimary(this.props.type)}>保存</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}

module.exports = FileDialog;