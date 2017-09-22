import React from 'react'
import _ from 'lodash'
import {Tabs, Tab} from 'react-bootstrap'
import Select from 'react-select'
import EChartsWrapper from '../Viz/EChartsWrapper'
import RegionList from './RegionList'
import RegionDropdownGroup from './RegionDropdownGroup'
import DefaultFilter from '../../model/DefaultFilter'
import CIList from './CIList'

import style from 'react-select/dist/react-select.css'

class LocationFilter extends React.Component {
	constructor(props) {
		super(props);

		this.wrapper = new EChartsWrapper(this);
		this.onFromCIChange = this.onFromCIChange.bind(this);
		this.onToCIChange = this.onToCIChange.bind(this);

        this.handleSetCIs = this.handleSetCIs.bind(this);
        this.handleSetPin = this.handleSetPin.bind(this);
        this.handleSetDistrict1 = this.handleSetDistrict1.bind(this);
        this.handleSetDistrict2 = this.handleSetDistrict2.bind(this);
		
		this.mapLocId = 'locMap';

		this.optionsCI = _.map(CIList, function(o) {return {value: o, label: o}});

		this.state = {
			fromCI: DefaultFilter.ci_from
		};

		this.district1 = {};
		this.district2 = {};
	}

	componentDidMount() {
		this.filterInstance = this.wrapper.renderChart(this.mapLocId, "map", this.filterInstance, null, {
			subtype: 3, // map as filter
			lat: 78.274895,//78.274895, 37.617298
			long: 37.617298,
			mapCenter: {
				lat: 78.274895,
				long: 37.617298
			},
			callback: function(lat, long, radius) {
				this.handleSetPin(lat, long, radius);
			}.bind(this)
		});
	}

	onFromCIChange(val) {
		this.setState({
			fromCI: val
		});

		this.handleSetCIs(val, this.state.toCI);
	}

	onToCIChange(val) {
		this.setState({
			toCI: val
		});

		this.handleSetCIs(this.state.fromCI, val);
	}

	handleSetCIs(from, to) {
        this.props.onUpdateLocation({
            ci_from: from ? from.split(",").join(";") : "",
            ci_to: ""
        });
    }

    handleSetPin(lat, long, radius) {
        this.props.onUpdateLocation({
            lat: lat,
            long: long,
            radius: radius
        });
    }

    handleSetDistrict1(district) {
    	this.district1 = district;
        this.props.onUpdateLocation({
            district: this.district1 // TODO add district2
        });
    }

    handleSetDistrict2(district) {
    	this.district2 = district;
        this.props.onUpdateLocation({
            district: district2 // TODO add district1
        });
    }

    resetFilter() {
    	this.setState({
    		fromCI: DefaultFilter.ci_from,
    		toCI: ""
    	});
    }

	render() {
		let optionsCI = this.optionsCI;//_.map(this.props.CIData, function(value, key) {return {value: key, label: key}});

		return (
			<Tabs defaultActiveKey={2} id="loc_filter" justified className="tab_loc filter_nav">
				<Tab eventKey={1} title="地图定位" className="tab_map">
					<div className="map_container">
						<label>案发地点及敏感区</label>
						<div id={this.mapLocId} style={{width: "100%", height: "358px"}}/>
					</div>
				</Tab>
				<Tab eventKey={2} title="CI基站定位" className="tab_CI">
					<div className="CI_container">
						<label>主叫方</label>
						<Select multi simpleValue name="fromCI" options={optionsCI} placeholder="搜索CI基站" value={this.state.fromCI} onChange={this.onFromCIChange} />	

    					<div className="separator"><span>并且</span></div>

    					<label>被叫方</label>
    					<Select multi simpleValue name="toCI" options={optionsCI} placeholder="搜索CI基站" value={this.state.toCI} onChange={this.onToCIChange} />
					</div>
				</Tab>
				<Tab eventKey={3} title="行政区划定位" className="tab_region">
					<div className="region_container">
						<label>案发地点</label>
						<RegionDropdownGroup id="location1" onUpdateRegion={this.handleSetDistrict1}/>
						<div className="separator"><span>并且</span></div>				  
						<RegionDropdownGroup id="location2" onUpdateRegion={this.handleSetDistrict2}/>
					</div>
				</Tab>

			</Tabs>
		);
	}
}

module.exports = LocationFilter;