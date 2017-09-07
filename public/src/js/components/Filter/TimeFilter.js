import React from 'react'
import {Tabs, Tab, TabPane} from 'react-bootstrap'
import moment from "moment";
import InputMoment from "input-moment";
import Datetime from "react-datetime";

class TimeFilter extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		var me = this;

		$('#picker6').dateRangePicker({
			inline:true,
			container: '#picker6_container',
			format: 'DD.MM.YYYY HH:mm',
			language: 'cn',
			defaultTime: new Date('2016-11-15'), // TODO get default date
			defaultEndTime: new Date('2016-11-25'), // TODO get default date
			alwaysOpen:true,
			time: {
				enabled: true
			}
		}).bind('datepicker-change', function(evt, obj) {
			me.props.onSetDateRange(obj.date1, obj.date2);
		});

		//$('#picker6').data('dateRangePicker').setDateRange('2016-11-15','2016-11-25');
	}

	render() {
		var timeRange = <div className="col-sm-12">
				<div className="form-group">
					<input
						className="input-group date hidden"
						id="picker6"
					>
					</input>
					<div id="picker6_container"/>
				</div>
			</div>;

		var navRange = <Tabs defaultActiveKey={1} justified id="tab_time" className="tab_time filter_nav">
				<Tab eventKey={1} title="精确案发时间" bsClass="timetab">
					<div style={{height: "215px"}}>
						<Datetime locale="zh-cn" open={true}/>
						<div className="days_delta">
							<label>案发前</label>
							<input/>
						</div>
						<div className="days_delta">
							<label>案发后</label>
							<input/>
						</div>
					</div>
				</Tab>
				<Tab eventKey={2} title="大致案发时段" bsClass="timetab">
						<div style={{height: "290px"}}>
							{timeRange}
						</div>
				</Tab>

			</Tabs>;

		return navRange
	}
}

module.exports = TimeFilter;