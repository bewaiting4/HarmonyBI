import React from "react";
import style from "./FilterPanel.css";
import FilterPortlet from "./FilterPortlet";
import LocationFilter from "./LocationFilter"
import TimeFilter from "./TimeFilter"
import SuspectFilter from "./SuspectFilter"


class FilterPanel extends React.Component {
	constructor(props) {
		super(props)

		this.handleSetDateRange = this.handleSetDateRange.bind(this);
		this.handleOpenFilter = this.handleOpenFilter.bind(this);

		this.dftState = {
			onTimeFilter: false,
			onLocationFilter: false,
			onIdNumberFilter: false,
		};
		this.filters = [];
		this.state = _.assignIn({}, this.dftState);
	}

    handleSetDateRange(date1, date2) {
        this.props.onSetDateRange(date1, date2);
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
                            isUnfold={isUnfold}
                            onOpenFilter={this.handleOpenFilter}
                            icon={onTimeFilter ? "date-set": "date-unset"}
                            onFilter={onTimeFilter}
                        >
                            <TimeFilter onSetDateRange={this.handleSetDateRange}/>
                        </FilterPortlet>

                        <FilterPortlet
                            name="Location"
                            text="案发地点"
                            isUnfold={isUnfold}
                            onOpenFilter={this.handleOpenFilter}
                            icon={onLocationFilter ? "map-set": "map-unset"}
                            onFilter={onLocationFilter}                            
                        >
                            <LocationFilter CIData={this.props.CIData}/>
                        </FilterPortlet>

                        <FilterPortlet
                            name="IdNumber"
                            text="案发相关人员"
                            isUnfold={isUnfold}
                            onOpenFilter={this.handleOpenFilter}
                            icon={onIdNumberFilter ? "id-set": "id-unset"}
                            onFilter={onIdNumberFilter}
                        >
                        	<SuspectFilter />
                        </FilterPortlet>
                    </ul>
                </div>
            </div>
		);
	}
}
module.exports = FilterPanel;