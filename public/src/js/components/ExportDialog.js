import React from 'react'
import {Modal, Button, Label, Grid, Row, Col, Thumbnail, Checkbox, FormControl} from 'react-bootstrap'

class ExportDialog extends React.Component {

	constructor(props) {
		super(props);

		this.handleTitleChange =this.handleTitleChange.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.hanldeExport = this.hanldeExport.bind(this);

		this.state = {
			showExport: false
		}
	}

	handleTitleChange(val) {
		this.title = val;
	}

	handleClose() {
		this.props.onClose();
	}

	hanldeExport() {
		this.props.onClose();
		this.props.onExport({title: this.title});
	}

	render() {
		return (
			<div>
			<Modal
				show={this.state.showExport}
				onHide={this.handleClose}
				container={this}
				aria-labelledby="contained-modal-title"
				backdrop="static"
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title">输出分析报告</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Label>报告标题</Label>
					<FormControl
			            type="text"
			            placeholder="输入标题"
			            onChange={this.handleTitleChange}
			        />
			        <Label>报告图表选择</Label>
					<Grid>
					    <Row>
						    <Col xs={6}>
						    	<Thumbnail src="/assets/thumbnaildiv.png" alt="242x200">
						    		<Checkbox checked>
	      								分析页面
	    							</Checkbox>
						      	</Thumbnail>
						    </Col>
						    <Col xs={6}>
						      	<Thumbnail src="/assets/thumbnaildiv.png" alt="242x200">
						        	<Checkbox>
	      								话单页面
	    							</Checkbox>
						      	</Thumbnail>
						    </Col>
					    </Row>
					</Grid>			        
					<Button className="success" onClick={this.hanldeExport}>保存并输出</Button>
				</Modal.Body>
			</Modal>
			</div>
		);
	}
	
}

module.exports = ExportDialog;