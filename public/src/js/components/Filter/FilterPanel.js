import React from 'react'
import FilterPortlet from './FilterPortlet'
import LocationFilter from './LocationFilter'
import TimeFilter from './TimeFilter'
import SuspectFilter from './SuspectFilter'


class FilterPanel extends React.Component {
	constructor(props) {
		super(props)

        this.handleUpdateTime = this.handleUpdateTime.bind(this);
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
            isLocationSet: false,
            numPersonelSet: 0
		};
		this.filters = [];
		this.state = _.assignIn({}, this.dftState);
	}

	componentDidUpdate() {
		this.props.onUpdateFP();
	}

    handleUpdateTime(filter) {
        this.props.onUpdateTime(filter);
    }

    handleUpdateLocation(filter) {
    	this.props.onUpdateLocation(filter);
        this.setState({isLocationSet: true});
    }

    handleUpdateSuspect(list) {
    	this.props.onUpdateSuspect(list);
        this.setState({numPersonelSet: (list && list.length || 0)});
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
        this.setState({isLocationSet: false});
    }

    resetSusFilter() {
        this.refs.susFilter.resetFilter();
        this.setState({numPersonelSet: 0});
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

    getCurrentPersonel() {
        return this.state.numPersonelSet ? <span>{this.state.numPersonelSet.length + "个"}</span> : "";
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
                            <TimeFilter ref="timeFilter" onUpdateTime={this.handleUpdateTime}/>
                        </FilterPortlet>

                        <FilterPortlet
                            name="Location"
                            text="案发地点"
                            currSel={this.getCurrentLocation()}
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
                            currSel={this.getCurrentPersonel()}
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