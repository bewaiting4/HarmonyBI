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
		$('#picker6').dateRangePicker({
			inline:true,
			container: '#picker6_container',
			format: 'DD.MM.YYYY HH:mm',
			language: 'cn',
			alwaysOpen:true,
			time: {
				enabled: true
			}
		});
	}

	render() {
			var timeRange = <div className="col-sm-12">
						<div className="form-group">
							<input
								className="input-group date"
								id="picker6"
							>
							</input>
							<div id="picker6_container"/>
						</div>
					</div>;
			var navRange = <Tabs defaultActiveKey={1} justified id="tab_time">
			<Tab eventKey={1} title="精确案发时间" bsClass="timetab">
				<div style={{height: "250px"}}>
					<Datetime input={false}/>
				</div>
			</Tab>
			<Tab eventKey={2} title="模糊案发时间" bsClass="timetab">
					<div style={{height: "250px"}}>

					{timeRange}
					</div>
			</Tab>

		</Tabs>;
		return navRange
	}
}

module.exports = TimeFilter;