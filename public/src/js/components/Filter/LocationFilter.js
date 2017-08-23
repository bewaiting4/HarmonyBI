import React from 'react'
import {Tabs, Tab, ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap'
import EChartsWrapper from '../EChartsWrapper'

class LocationFilter extends React.Component {
	constructor(props) {
		super(props);

		this.wrapper = new EChartsWrapper(this);
		this.id = 'locFilter';
	}

	componentDidMount() {
		this.filterInstance = this.wrapper.renderChart(this.id, "map", this.filterInstance);
	}

	render() {
		return (
			<Tabs defaultActiveKey={1} id="loc_filter">
				<Tab eventKey={1} title="地图定位">
					<div>
						<div id={this.id} style={{width: "200px", height: "200px"}}/>
					</div>
				</Tab>
				<Tab eventKey={2} title="CI基站定位">
					<div>
						<div  style={{width: "200px", height: "200px"}}>
							<div>主叫方</div>
						    <div className="input-group">
            					<input type="text" className="form-control" placeholder="搜索CI基站" name="q"/>
            					<div className="input-group-btn">
                					<button className="btn btn-default" type="submit"><i className="glyphicon glyphicon-search"></i></button>
            					</div>
        					</div>
        					<div>并且</div>
        					<div>被叫方</div>
        					<div className="input-group">
            					<input type="text" className="form-control" placeholder="搜索CI基站" name="q"/>
            					<div className="input-group-btn">
                					<button className="btn btn-default" type="submit"><i className="glyphicon glyphicon-search"></i></button>
            					</div>
        					</div>

						</div>
					</div>
				</Tab>
				<Tab eventKey={3} title="行政区划定位">
					<div>
						<div  style={{width: "300px", height: "200px"}}>
						<div>案发地点</div>
						  <ButtonToolbar>
						    <DropdownButton title="province" id="bg-vertical-dropdown-1">
						      <MenuItem eventKey="1">新疆自治区</MenuItem>
						      <MenuItem eventKey="2">西藏自治区</MenuItem>
						    </DropdownButton>
						    <DropdownButton title="city" id="bg-vertical-dropdown-2">
						      <MenuItem eventKey="1">乌鲁木齐</MenuItem>
						      <MenuItem eventKey="2">和田</MenuItem>
						    </DropdownButton>
						    <DropdownButton title="town" id="bg-vertical-dropdown-3">
						      <MenuItem eventKey="1">皮山</MenuItem>
						      <MenuItem eventKey="2">天山</MenuItem>
						    </DropdownButton>
						  </ButtonToolbar>
						</div>
					</div>
				</Tab>

		</Tabs>);
	}
}

module.exports = LocationFilter;