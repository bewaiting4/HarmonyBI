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
            onIdNumberFilter: false,
        };
        this.filters = [];
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
        if (!this.props.isUnfold) {
            this.setState(_.assign({}, this.dftState));
        }
    }

    handleOpenFilter(name) {
        if (!this.props.isUnfold) {
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
        const onIdNumberFilter = this.state.onIdNumberFilter;
        const isUnfold = this.props.isUnfold;

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

                            <img src={"../icons/svg/filtericon/" + (isUnfold? "unfold" : "fold") + "@1x.svg"} className="logo"/>
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
                            {/*<FontAwesome name="download"/>*/}
                            <img src="../icons/svg/filtericon/download@1x.svg" className="logo"/>
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
                                    isUnfold={isUnfold}
                                    onOpenFilter={this.handleOpenFilter}
                                    icon={onTimeFilter ? "date-set": "date-unset"}
                                    onFilter={onTimeFilter}
                                >
                                    <TimeFilter/>
                                </FilterPortlet>

                                <FilterPortlet
                                    name="Location"
                                    text="案发地点"
                                    isUnfold={isUnfold}
                                    onOpenFilter={this.handleOpenFilter}
                                    icon={onLocationFilter ? "map-set": "map-unset"}
                                    onFilter={onLocationFilter}
                                >
                                    <LocationFilter/>
                                </FilterPortlet>

                                <FilterPortlet
                                    name="IdNumber"
                                    text="案发相关人员"
                                    isUnfold={isUnfold}
                                    onOpenFilter={this.handleOpenFilter}
                                    icon={onIdNumberFilter ? "id-set": "id-unset"}
                                    onFilter={onIdNumberFilter}
                                />
                            </ul>
                        </div>
                    </div>
                    {/*sidebar menu*/}

                    {/*sidebar menu*/}
                    <div id="sidebar-footer" className="sidebar-footer">
                        <span className="content">重置所有筛选条件</span>
                        <span className="resetall"><img src={"../icons/svg/filtericon/resetall" + (this.filters.length > 0 ? "-active" : "") + "@1x.svg"} className="logo"/></span>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = Menu;