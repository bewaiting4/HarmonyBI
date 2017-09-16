import React from "react"
import _ from "lodash"
import FontAwesome from "react-fontawesome"
import FilterPanel from "./Filter/FilterPanel"

import style from "./Menu.css"

class Menu extends React.Component {
    constructor() {
        super();

        this.handleClick = this.handleClick.bind(this);
        this.handleOpenFilter = this.handleOpenFilter.bind(this);
        this.handleDownload = this.handleDownload.bind(this);

        this.handleSetDateRange = this.handleSetDateRange.bind(this);
        this.handleSetCIs = this.handleSetCIs.bind(this);
        this.handleSetPin = this.handleSetPin.bind(this);
        this.handleSetDistrict = this.handleSetDistrict.bind(this);
        this.handleSetPersonnel = this.handleSetPersonnel.bind(this);
        this.handleApplyFilter = this.handleApplyFilter.bind(this);

        this.filters = {};
        this.timeFilter = {};
        this.locFilter = {};
    }

    handleClick(e) {
        e.preventDefault();
        this.props.onToggleChange();
    }

    handleDownload() {
        this.props.onOpenExport();
    }

    handleOpenFilter(name) {
        if (!this.props.isUnfold) {
            this.props.onToggleChange();
        }
    }

    handleSetDateRange(date1, date2) {
        //this.props.onSetDateRange(date1, date2);

        this.timeFilter = {
            'date_from': new Date(date1),
            'date_to': new Date(date2)
        };
    }

    handleSetCIs(from, to) {
        this.locFilter = {
            ci_from: from,
            ci_to: to
        };
    }

    handleSetPin(lat, long, radius) {
        this.locFilter = {
            lat: lat,
            long: long,
            radius: radius
        };
    }

    handleSetDistrict(district) {
        this.locFilter = {
            district: district
        }
    }

    handleSetPersonnel(list) {
        this.pplFilter = {
            numbers: JSON.stringify(list)
        }
    }

    handleApplyFilter() {
        this.props.onApplyFilter(_.assign({}, this.timeFilter, this.locFilter, this.pplFilter));
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
                        <a className="site_title">
                            {/*<FontAwesome name="download"/>*/}
                            <img src="../icons/svg/filtericon/download@1x.svg" className="logo" onClick={this.handleDownload}/>

                            <button
                                className="btn btn-success"
                                onClick={this.handleApplyFilter}                                
                            >
                                生成分析报告
                            </button>

                            <button
                                className="btn btn-success"
                                onClick={this.handleDownload}
                            >
                                导出分析报告
                            </button>
                        </a>
                    </div>

                    <div className="clearfix"/>

                    <FilterPanel 
                        isUnfold={isUnfold} 
                        onOpenFilter={this.handleOpenFilter} 
                        onSetDateRange={this.handleSetDateRange} 
                        onUpdateSuspect={this.handleSetPersonnel}
                        CIData={this.props.CIData}/>

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