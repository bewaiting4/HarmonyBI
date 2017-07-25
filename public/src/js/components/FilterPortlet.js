import React from 'react'
import FontAwesome from 'react-fontawesome'
import Datetime from 'react-datetime'
import moment from 'moment'
import InputMoment from 'input-moment'


class FilterPortlet extends React.Component {
	constructor() {
		super();

		this.openFilter = this.openFilter.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSave = this.handleSave.bind(this);
  this.state = {
    m: moment()
  };
	}

	openFilter() {
		this.props.onOpenFilter(this.props.name)
	}

	componentDidMount() {
		$('#datetimepicker6').datetimepicker();
        $('#datetimepicker7').datetimepicker({
            useCurrent: false //Important! See issue #1075
        });
        $("#datetimepicker6").on("dp.change", function (e) {
            $('#datetimepicker7').data("DateTimePicker").minDate(e.date);
        });
        $("#datetimepicker7").on("dp.change", function (e) {
            $('#datetimepicker6').data("DateTimePicker").maxDate(e.date);
        });
  	}

  handleChange(m) {
    this.setState({ m: m });
  }

  handleSave() {
    console.log('saved', this.state.m.format('llll'));
  }

	render() {

		return <li>
	        <a onClick={this.openFilter}>
	          <i className={"fa fa-" + this.props.icon}></i>
	          {this.props.text}
	          <span className="fa fa-chevron-down" style={this.props.navSize ? {} : {display:"none"}}></span>
	        </a>
	        <ul className="nav child_menu" style={this.props.onFilter ? {display:"block"} : {display:"none"}}>
			    <div className='col-sm-12'>
		            <div className="form-group">
		                <div className='input-group date' id='datetimepicker6'>
		                    <input type='text' className="form-control" />
		                    <span className="input-group-addon">
		                        <span className="glyphicon glyphicon-calendar"></span>
		                    </span>
		                </div>
		            </div>
		        </div>
			    <div className='col-sm-12'>
		            <div className="form-group">
		                <div className='input-group date' id='datetimepicker7'>
		                    <input type='text' className="form-control" />
		                    <span className="input-group-addon">
		                        <span className="glyphicon glyphicon-calendar"></span>
		                    </span>
		                </div>
		            </div>
		        </div>		        
	        </ul>
	    </li>		
	}
}
module.exports = FilterPortlet;