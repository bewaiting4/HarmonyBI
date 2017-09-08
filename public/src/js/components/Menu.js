import React from "react";
import _ from "lodash";
import FontAwesome from "react-fontawesome";

import FilterPanel from './Filter/FilterPanel'

import style from "./Menu.css";

class Menu extends React.Component {
    constructor() {
        super();

        this.handleClick = this.handleClick.bind(this);
        this.handleOpenFilter = this.handleOpenFilter.bind(this);
        this.handleDownload = this.handleDownload.bind(this);
        this.handleSetDateRange = this.handleSetDateRange.bind(this);

        this.filters = [];
    }

    handleClick(e) {
        e.preventDefault();
        this.props.onToggleChange();
    }

    handleDownload() {
        this.props.onExport();
    }

    handleOpenFilter(name) {
        if (!this.props.isUnfold) {
            this.props.onToggleChange();
        }
    }

    handleSetDateRange(date1, date2) {
        this.props.onSetDateRange(date1, date2);
    }

    render() {
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

                    <FilterPanel isUnfold={isUnfold} onOpenFilter={this.handleOpenFilter} onSetDateRange={this.handleSetDateRange} CIData={this.props.CIData}/>

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