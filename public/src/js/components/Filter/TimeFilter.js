import React from 'react'
import {Tabs, Tab, TabPane} from 'react-bootstrap'
import moment from "moment";
import InputMoment from "input-moment";
import Datetime from "react-datetime";

class TimeFilter extends React.Component {

	constructor(props) {
		super(props);

		this.onPreHoursChange = this.onPreHoursChange.bind(this);
		this.onPostHoursChange = this.onPostHoursChange.bind(this);
		this.onCaseDateChange = this.onCaseDateChange.bind(this);
		this.updateDateRange = this.updateDateRange.bind(this);

		this.state = {
			preHours: 48,
			postHours: 24,
			caseDate: new moment("2016-11-25")
		};
	}

	componentDidMount() {
		var me = this;

		$('#picker6').dateRangePicker({
			inline:true,
			container: '#picker6_container',
			format: 'DD.MM.YYYY HH:mm',
			language: 'cn',
			defaultTime: new Date('2016-11-15'), // TODO get default date
			defaultEndTime: new Date('2016-11-25'), // TODO get default date1
			alwaysOpen:true,
			time: {
				enabled: true
			}
		}).bind('datepicker-change', (function(evt, obj) {
			this.props.onSetDateRange(obj.date1, obj.date2);
		}).bind(this));

		//$('#picker6').data('dateRangePicker').setDateRange('2016-11-15','2016-11-25');
	}

	onPreHoursChange(event) {
		this.setState({
			preHours: event.target.value
		});

		this.updateDateRange();
	}

	onPostHoursChange(event) {
		this.setState({
			postHours: event.target.value
		});

		this.updateDateRange();
	}

	onCaseDateChange(date) {
		this.setState({
			caseDate: date
		});

		this.updateDateRange();
	}

	updateDateRange() {
		this.props.onSetDateRange((new moment(this.state.caseDate)).subtract(this.state.preHours, 'hours').toDate(), (new moment(this.state.caseDate)).add(this.state.postHours, 'hours').toDate());
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
						<Datetime locale="zh-cn" open={true} defaultValue={this.state.caseDate} onChange={this.onCaseDateChange}/>
						<div className="days_delta">
							<label>案发前</label>
							<div className="inputWrap">
								<input value={this.state.preHours} onChange={this.onPreHoursChange}/>
								<div>时</div>
							</div>
						</div>
						<div className="days_delta">
							<label>案发后</label>
							<div className="inputWrap">
								<input value={this.state.postHours} onChange={this.onPostHoursChange}/>
								<div>时</div>
							</div>
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