import React from 'react'
import FilterPortlet from './FilterPortlet'
import LocationFilter from './LocationFilter'
import TimeFilter from './TimeFilter'
import SuspectFilter from './SuspectFilter'


class FilterPanel extends React.Component {
	constructor(props) {
		super(props)

		this.handleUpdateSuspect = this.handleUpdateSuspect.bind(this);
		this.handleUpdateLocation = this.handleUpdateLocation.bind(this);

        this.resetAllFilters = this.resetAllFilters.bind(this);
        this.resetTimeFilter = this.resetTimeFilter.bind(this);
        this.resetLocFilter = this.resetLocFilter.bind(this);
        this.resetSusFilter = this.resetSusFilter.bind(this);

        this.getTimeFilterContent = this.getTimeFilterContent.bind(this);

		this.dftState = {
            isLocationSet: false
		};
		this.filters = [];
		this.state = _.assignIn({}, this.dftState);
	}

	componentDidUpdate() {
		this.props.onUpdateFP();
	}

    handleUpdateLocation(filter) {
    	this.props.onUpdateLocation(filter);
        this.setState({isLocationSet: true});
    }

    handleUpdateSuspect(list) {
    	this.props.onUpdateSuspect(list);
    }

    componentDidMount() {
        if (!this.props.isUnfold) {
            this.setState(_.assign({}, this.dftState));
        }
    }

    // TODO rewrite with Flux
    resetAllFilters() {
        this.resetTimeFilter();
        this.resetLocFilter();
        this.resetSusFilter();
    }

    resetTimeFilter() {
        this.refs.timeFilter.resetFilter();        
    }

    resetLocFilter() {
        this.refs.locFilter.resetFilter();
        this.setState({isLocationSet: false});
    }

    resetSusFilter() {
        this.refs.susFilter.resetFilter();
    }

    getTimeFilterContent() {
        return this.refs.timeFilter.getTimeFilterContent();
    }

    getCurrentDateRange() {
        return moment(this.props.currFilter.date_from).format("YYYY/MM/DD H:mm") + ' - ' + moment(this.props.currFilter.date_to).format("YYYY/MM/DD H:mm")
    }

    getCurrentLocation() {
        return this.state.isLocationSet ? <span>已设置</span> : "";
    }

	render() {
        const onTimeFilter = this.state.onTimeFilter;
        const onLocationFilter = this.state.onLocationFilter;
        const onIdNumberFilter = this.state.onIdNumberFilter;
        const isUnfold = this.props.isUnfold;

		return (
            <div
                id="sidebar-menu"
                className="main_menu_side hidden-print main_menu"
            >
                <div className="menu_section">
                    <ul className="nav side-menu">
                        <FilterPortlet
                            name="Time"
                            text="案发时间"
                            currSel={this.getCurrentDateRange()}
                            isUnfold={isUnfold}
                            onResetFilter={this.resetTimeFilter}
                        >
                            <TimeFilter ref="timeFilter"/>
                        </FilterPortlet>

                        <FilterPortlet
                            name="Location"
                            text="案发地点"
                            currSel={this.getCurrentLocation()}
                            isUnfold={isUnfold}
                            onResetFilter={this.resetLocFilter}                           
                        >
                            <LocationFilter ref="locFilter" onUpdateLocation={this.handleUpdateLocation}/>
                        </FilterPortlet>

                        <FilterPortlet
                            name="IdNumber"
                            text="案发相关人员"
                            isUnfold={isUnfold}
                            onResetFilter={this.resetSusFilter}
                        >
                        	<SuspectFilter ref="susFilter" suspects={this.props.suspects} onUpdateSuspect={this.handleUpdateSuspect}/>
                        </FilterPortlet>
                    </ul>
                </div>
            </div>
		);
	}
}
module.exports = FilterPanel;