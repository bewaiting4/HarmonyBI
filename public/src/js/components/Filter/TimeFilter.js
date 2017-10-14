import React from 'react'
import {Tabs, Tab, TabPane} from 'react-bootstrap'
import moment from 'moment'
import InputMoment from 'input-moment'
import Datetime from 'react-datetime'
import DefaultFilter from '../../model/DefaultFilter'

class TimeFilter extends React.Component {

	constructor(props) {
		super(props);

		this.onPreHoursChange = this.onPreHoursChange.bind(this);
		this.onPostHoursChange = this.onPostHoursChange.bind(this);
		this.onCaseDateChange = this.onCaseDateChange.bind(this);
		this.updateDateRange = this.updateDateRange.bind(this);
		this.getTimeFilterContent = this.getTimeFilterContent.bind(this);

		this.dftState = {
			preHours: 48,
			postHours: 24,
			caseDate: moment(DefaultFilter.date_to).subtract(1, 'day')
		};

		this.state = _.assign({}, this.dftState);

		this.filterContent = _.assign({}, this.dftState);
	}

	componentDidMount() {
		var me = this;

		$('#picker6').dateRangePicker({
			inline:true,
			container: '#picker6_container',
			format: 'DD.MM.YYYY HH:mm',
			language: 'cn',
			defaultTime: new Date(DefaultFilter.date_from), // TODO get default date
			defaultEndTime: new Date(DefaultFilter.date_to), // TODO get default date1
			alwaysOpen:true,
			time: {
				enabled: true
			}
		}).bind('datepicker-change', (function(evt, obj) {
			this.filterContent = {
				date_from: obj.date1,
				date_to: obj.date2
			}
			this.updateDateRange({
				date_from: obj.date1,
				date_to: obj.date2	
			});
		}).bind(this));

		//$('#picker6').data('dateRangePicker').setDateRange('2016-11-15','2016-11-25');
	}

	onPreHoursChange(event) {
		this.setState({
			preHours: event.target.value
		});

		this.updateDateRange({
			caseDate: this.state.caseDate, 
			preHours: event.target.value, 
			postHours: this.state.postHours
		});
	}

	onPostHoursChange(event) {
		this.setState({
			postHours: event.target.value
		});

		this.updateDateRange({
			caseDate: this.state.caseDate, 
			preHours: this.state.preHours, 
			postHours: event.target.value
		});
	}

	onCaseDateChange(date) {
		this.setState({
			caseDate: date
		});

		this.updateDateRange({
			caseDate: date,
			preHours: this.state.preHours,
			postHours: this.state.postHours
		});
	}

	updateDateRange(timeFilter) {
		this.props.onUpdateTime(timeFilter);
	}

	getTimeFilterContent() {
		return this.filterContent;
	}

	resetFilter() {
		$('#picker6').data('dateRangePicker').resetMonthsView();

		this.setState(this.dftState);

		this.updateDateRange(this.dftState);
	}

	render() {
		var timeRange = <div className="col-sm-12 bgShadow">
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
						<Datetime locale="zh-cn" open={true} value={this.state.caseDate} onChange={this.onCaseDateChange}/>
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
						<div>
							{timeRange}
						</div>
				</Tab>

			</Tabs>;

		return navRange
	}
}

module.exports = TimeFilter;