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
			fromCI: DefaultFilter.ci_from,
			toCI: DefaultFilter.ci_to
		};

		this.district1 = {};
		this.district2 = {};
	}

	componentDidMount() {
		this.filterInstance = this.wrapper.renderChart(this.mapLocId, "map", this.filterInstance, null, {
			subtype: 3, // map as filter
			long: 78.274895,//78.274895, 37.617298
			lat: 37.617298,
			mapCenter: {
				long: 78.274895,
				lat: 37.617298
			},
			callback: function(lat, long, radius) {
				this.handleSetPin(lat, long, radius);
			}.bind(this)
		});
	}

	onFromCIChange(val) {
		this.setState({
			fromCI: val,
			toCI: val
		});

		this.handleSetCIs(val, val);
	}

	onToCIChange(val) {
		this.setState({
			fromCI: val,
			toCI: val
		});

		this.handleSetCIs(val, val);
	}

	handleSetCIs(from, to) {
        this.props.onUpdateLocation({
            ci_from: from ? from.split(",").join(";") : "",
            ci_to: to ? to.split(",").join(";") : ""
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
            district: (district.province || "") + " " + (district.city || "") + " " + (district.county || "") // TODO add district2
        });
    }

    handleSetDistrict2(district) {
    	this.district2 = district;
        this.props.onUpdateLocation({
            district: (district.province || "") + " " + (district.city || "") + " " + (district.county || "") // TODO add district1
        });
    }

    resetFilter() {
    	// reset CI filter
    	this.setState({
    		fromCI: DefaultFilter.ci_from,
    		toCI: DefaultFilter.ci_to
    	});

    	// reset Administration filter
    	this.refs.location1.resetFilter();
    	this.refs.location2.resetFilter();

    	// reset map filter
    	this.wrapper.resetChart(this.mapLocId, "map", this.filterInstance, null, {
			subtype: 3, // map as filter
			mapCenter: {
				long: 78.274895,
				lat: 37.617298
			},
			long: 78.274895,
			lat: 37.617298
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
						<RegionDropdownGroup ref="location1" id="location1" onUpdateRegion={this.handleSetDistrict1}/>
						<div className="separator"><span>并且</span></div>				  
						<RegionDropdownGroup ref="location2" id="location2" onUpdateRegion={this.handleSetDistrict2}/>
					</div>
				</Tab>

			</Tabs>
		);
	}
}

module.exports = LocationFilter;