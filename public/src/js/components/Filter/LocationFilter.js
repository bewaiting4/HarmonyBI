import React from 'react'
import {Tabs, Tab, ButtonGroup, DropdownButton, MenuItem} from 'react-bootstrap'
import Select from 'react-select';

import EChartsWrapper from '../EChartsWrapper'

import style from 'react-select/dist/react-select.css';


class LocationFilter extends React.Component {
	constructor(props) {
		super(props);

		this.wrapper = new EChartsWrapper(this);
		this.id = 'locMap';
	}

	componentDidMount() {
		this.filterInstance = this.wrapper.renderChart(this.id, "map", this.filterInstance);
	}

	render() {
		return (
			<Tabs defaultActiveKey={1} id="loc_filter" justified className="tab_loc filter_nav">
				<Tab eventKey={1} title="地图定位" className="tab_map">
					<div className="map_container">
						<label>案发地点及敏感区</label>
						<div id={this.id} style={{width: "100%", height: "358px"}}/>
					</div>
				</Tab>
				<Tab eventKey={2} title="CI基站定位" className="tab_CI">
					<div className="CI_container">
						<label>主叫方</label>
					    <div className="input-group">
        					<input type="text" className="form-control" placeholder="搜索CI基站" name="q"/>
        					<div className="input-group-btn">
            					<button className="btn btn-default" type="submit"><i className="glyphicon glyphicon-search"></i></button>
        					</div>
    					</div>
    					<div className="separator">并且</div>
    					<label>被叫方</label>
    					<div className="input-group">
        					<input type="text" className="form-control" placeholder="搜索CI基站" name="q"/>
        					<div className="input-group-btn">
            					<button className="btn btn-default" type="submit"><i className="glyphicon glyphicon-search"></i></button>
        					</div>
    					</div>
					</div>
				</Tab>
				<Tab eventKey={3} title="行政区划定位" className="tab_region">
					<div className="region_container">
						<label>案发地点</label>
						<ButtonGroup justified>
							<DropdownButton title="新疆自治区" id="bg-vertical-dropdown-1">
								<MenuItem eventKey="1">新疆自治区</MenuItem>
								<MenuItem eventKey="2">西藏自治区</MenuItem>
							</DropdownButton>
							<DropdownButton title="和田" id="bg-vertical-dropdown-2">
								<MenuItem eventKey="1">乌鲁木齐</MenuItem>
								<MenuItem eventKey="2">和田</MenuItem>
							</DropdownButton>
							<DropdownButton title="皮山" id="bg-vertical-dropdown-3">
								<MenuItem eventKey="1">皮山</MenuItem>
								<MenuItem eventKey="2">天山</MenuItem>
							</DropdownButton>
						</ButtonGroup>	
						<div className="separator">并且</div>					  
						<ButtonGroup justified>
							<DropdownButton title="新疆自治区" id="bg-vertical-dropdown-1">
								<MenuItem eventKey="1">新疆自治区</MenuItem>
								<MenuItem eventKey="2">西藏自治区</MenuItem>
							</DropdownButton>
							<DropdownButton title="乌鲁木齐" id="bg-vertical-dropdown-2">
								<MenuItem eventKey="1">乌鲁木齐</MenuItem>
								<MenuItem eventKey="2">和田</MenuItem>
							</DropdownButton>
							<DropdownButton title="天山" id="bg-vertical-dropdown-3">
								<MenuItem eventKey="1">皮山</MenuItem>
								<MenuItem eventKey="2">天山</MenuItem>
							</DropdownButton>
						</ButtonGroup>
					</div>
				</Tab>

		</Tabs>);
	}
}

module.exports = LocationFilter;