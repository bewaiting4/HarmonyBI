import React from 'react'
import FilterPortlet from './FilterPortlet'
import LocationFilter from './LocationFilter'
import TimeFilter from './TimeFilter'
import SuspectFilter from './SuspectFilter'


class FilterPanel extends React.Component {
	constructor(props) {
		super(props)

		this.handleSetDateRange = this.handleSetDateRange.bind(this);
		this.handleUpdateSuspect = this.handleUpdateSuspect.bind(this);
		this.handleUpdateLocation = this.handleUpdateLocation.bind(this);

		this.handleOpenFilter = this.handleOpenFilter.bind(this);

        this.resetAllFilters = this.resetAllFilters.bind(this);
        this.resetTimeFilter = this.resetTimeFilter.bind(this);
        this.resetLocFilter = this.resetLocFilter.bind(this);
        this.resetSusFilter = this.resetSusFilter.bind(this);

        this.getTimeFilterContent = this.getTimeFilterContent.bind(this);

		this.dftState = {
			onTimeFilter: false,
			onLocationFilter: false,
			onIdNumberFilter: false,
		};
		this.filters = [];
		this.state = _.assignIn({}, this.dftState);
	}

	componentDidUpdate() {
		this.props.onUpdateFP();
	}

    handleSetDateRange(date1, date2) {
        this.props.onSetDateRange(date1, date2);
    }

    handleUpdateLocation(filter) {
    	this.props.onUpdateLocation(filter);
    }

    handleUpdateSuspect(list) {
    	this.props.onUpdateSuspect(list);
    }

    componentDidMount() {
        if (!this.props.isUnfold) {
            this.setState(_.assign({}, this.dftState));
        }
    }

    handleOpenFilter(name) {
        this.setState(function(prevState, props) {
            let res = {}; 
            const prop = "on" + name + "Filter";
            res[prop] = !prevState[prop];

            return res;
        });

        this.props.onOpenFilter();
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
    }

    resetSusFilter() {
        this.refs.susFilter.resetFilter();
    }

    getTimeFilterContent() {
        return this.refs.timeFilter.getTimeFilterContent();
    }

    getCurrentDateRange() {
        return this.props.currFilter.date_from.toLocaleString('zh') + '-' + this.props.currFilter.date_to.toLocaleString('zh')
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
                            onOpenFilter={this.handleOpenFilter}
                            icon={onTimeFilter ? "date-set": "date-unset"}
                            onFilter={onTimeFilter}
                            onResetFilter={this.resetTimeFilter}
                        >
                            <TimeFilter ref="timeFilter" onSetDateRange={this.handleSetDateRange}/>
                        </FilterPortlet>

                        <FilterPortlet
                            name="Location"
                            text="案发地点"
                            isUnfold={isUnfold}
                            onOpenFilter={this.handleOpenFilter}
                            icon={onLocationFilter ? "map-set": "map-unset"}
                            onFilter={onLocationFilter}
                            onResetFilter={this.resetLocFilter}                           
                        >
                            <LocationFilter ref="locFilter" onUpdateLocation={this.handleUpdateLocation}/>
                        </FilterPortlet>

                        <FilterPortlet
                            name="IdNumber"
                            text="案发相关人员"
                            isUnfold={isUnfold}
                            onOpenFilter={this.handleOpenFilter}
                            icon={onIdNumberFilter ? "id-set": "id-unset"}
                            onFilter={onIdNumberFilter}
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