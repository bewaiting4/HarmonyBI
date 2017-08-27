import React from "react";
import _ from "lodash";
import FontAwesome from "react-fontawesome";

import FilterPortlet from "./Filter/FilterPortlet";
import LocationFilter from "./Filter/LocationFilter"
import TimeFilter from "./Filter/TimeFilter"

import style from "./Menu.css";

class Menu extends React.Component {
    constructor() {
        super();

        this.handleClick = this.handleClick.bind(this);
        this.handleOpenFilter = this.handleOpenFilter.bind(this);
        this.handleDownload = this.handleDownload.bind(this);
        this.dftState = {
            onTimeFilter: false,
            onLocationFilter: false,
            onMobileFilter: false,
            onIdNumberFilter: false,
            onLanguageFilter: false,
            onPhoneTypeFilter: false
        };
        this.state = _.assignIn({}, this.dftState);
    }

    handleClick(e) {
        e.preventDefault();
        this.props.onToggleChange();
    }

    handleDownload() {
        this.props.onExport();
    }

    componentDidMount() {
        if (!this.props.navSize) {
            this.setState(_.assign({}, this.dftState));
        }
    }

    handleOpenFilter(name) {
        if (!this.props.navSize) {
            this.props.onToggleChange();
        }

        this.setState(function(prevState, props) {
            let res = {}; 
            const prop = "on" + name + "Filter";
            res[prop] = !prevState[prop];

            return res;
        });
    }

    render() {
        const onTimeFilter = this.state.onTimeFilter;
        const onLocationFilter = this.state.onLocationFilter;
        const onMobileFilter = this.state.onMobileFilter;
        const onIdNumberFilter = this.state.onIdNumberFilter;
        const onPhoneTypeFilter = this.state.onPhoneTypeFilter;
        const onLanguageFilter = this.state.onLanguageFilter;
        const navSize = this.props.navSize;

        return (
            <div className="col-md-3 left_col" style={{height: this.props.dim.height+'px', 'overflow': 'auto'}}>
                <div className="side_bar"/>
                <div className="filter_bg"/>
                <div className="left_col scroll-view">
                    {/*nav title, toggler*/}
                    <div
                        className="navbar nav_title"
                    >
                        <a className="site_title" onClick={this.handleClick}>
                            {/*<FontAwesome name="filter"/>*/}

                            <img src="../icons/svg/filtericon/fold@1x.svg" className="logo"/>
                            {/*<object type="image/svg+xml" data="../icons/svg/filtericon/fold@1x.svg" className="logo"></object>*/}
                            
                            <h3>话单分析系统</h3>

                        </a>
                    </div>

                    {/* pdf export */}
                    <div
                        className="navbar nav_title export"
                        style={{
                            border: 0
                        }}
                    >
                        <a className="site_title" onClick={this.handleDownload}>
                            <FontAwesome name="download"/>
                                <button
                                    className="btn btn-success"
                                >
                                    输出分析报告
                                </button>
                        </a>
                    </div>

                    <div className="clearfix"/>

                    {/*sidebar menu*/}
                    <div
                        id="sidebar-menu"
                        className="main_menu_side hidden-print main_menu"
                    >
                        <div className="menu_section">
                            <ul className="nav side-menu">
                                <FilterPortlet
                                    name="Time"
                                    text="案发时间"
                                    navSize={navSize}
                                    onOpenFilter={this.handleOpenFilter}
                                    icon="map-marker"
                                    onFilter={onTimeFilter}
                                >
                                    <TimeFilter/>
                                </FilterPortlet>

                                <FilterPortlet
                                    name="Location"
                                    text="案发地点"
                                    navSize={navSize}
                                    onOpenFilter={this.handleOpenFilter}
                                    icon="puzzle-piece"
                                    onFilter={onLocationFilter}
                                >
                                    <LocationFilter/>
                                </FilterPortlet>

                                <FilterPortlet
                                    name="IdNumber"
                                    text="案发相关人员"
                                    navSize={navSize}
                                    onOpenFilter={this.handleOpenFilter}
                                    icon="id-card-o"
                                    onFilter={onIdNumberFilter}
                                />
                            </ul>
                        </div>
                    </div>
                    {/*sidebar menu*/}
                </div>
            </div>
        );
    }
}

module.exports = Menu;