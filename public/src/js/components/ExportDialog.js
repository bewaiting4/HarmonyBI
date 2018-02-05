import React from 'react'
import { BeatLoader } from 'react-spinners'
import {Modal, Button, Label, Grid, Row, Col, Thumbnail, Checkbox, FormControl} from 'react-bootstrap'

class ExportDialog extends React.Component {

	constructor(props) {
		super(props);

		this.handleTitleChange =this.handleTitleChange.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.hanldeExport = this.hanldeExport.bind(this);

		this.handleCheckCallList = this.handleCheckCallList.bind(this);

		this.state = {
			isLoading: false,
			showExport: false,
			callList: false,
			title: "皮山县2017年2.14暴恐案件话单分析报告"
		}
	}

	handleTitleChange(e) {
		this.setState({
			title: e.target.value
		});
	}

	handleClose() {
		this.props.onClose();
	}

	hanldeExport() {
		this.props.onExport({title: this.state.title, callback: function() {
			this.setState({isLoading: false})
			this.props.onClose()
		}.bind(this)})

		this.setState({isLoading: true})
	}

	handleCheckCallList(e) {
		this.setState({
			callList: e.target.checked
		});
	}

	render() {
		const isLoading = this.state.isLoading

		return (
			<div>
			<Modal
				className="exportDialog"
				show={this.state.showExport}
				onHide={this.handleClose}
				container={this}
				aria-labelledby="contained-modal-title"
				backdrop="static"
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title">导出分析报告</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Label>报告标题</Label>
					<FormControl
			            type="text"
			            placeholder="输入标题"
			            value={this.state.title}
			            onChange={this.handleTitleChange}
			        />
			        <Label className="chartsel">报告图表选择</Label>
					<Grid>
					    <Row>
						    <Col xs={6}>
						    	<div className="thumbContainer">
							    	<Thumbnail src="../icons/png/defaultimage/network@1x.png" alt="242x200"/>
							    	<Thumbnail src="../icons/png/defaultimage/network@1x.png" alt="242x200"/>
							    	<Thumbnail src="../icons/png/defaultimage/map1@1x.png"/>
							    	<Thumbnail src="../icons/png/defaultimage/map1@1x.png"/>
	    						</div>
	    						<Checkbox disabled checked>
	      							分析页面
	    						</Checkbox>

						    </Col>
						    <Col xs={6}>
						    	<div className="thumbContainer">
							      	<Thumbnail className="callList" src="../icons/png/defaultimage/table@1x.png" alt="242x200"/>
							     </div>
					        	<Checkbox disabled onChange={this.handleCheckCallList}>
      								话单页面
    							</Checkbox>						      	
						    </Col>
					    </Row>
					</Grid>
					{isLoading ? <div className='spinner'><BeatLoader
                            color={'#1A66D9'} 
                            loading={isLoading}
                        />文件生成中</div>     
					: <Button className="success" onClick={this.hanldeExport}>保存并输出</Button>}
				</Modal.Body>
			</Modal>
			</div>
		);
	}
	
}

module.exports = ExportDialog;