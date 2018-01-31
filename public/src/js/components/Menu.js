import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome'
import FilterPanel from './Filter/FilterPanel'
import DefaultFilter from '../model/DefaultFilter'
import { toggleMenu } from '../actions'

class Menu extends React.Component {
    constructor() {
        super();

        this.handleUpdateFP = this.handleUpdateFP.bind(this);

        this.handleOpenFilter = this.handleOpenFilter.bind(this);
        this.handleDownload = this.handleDownload.bind(this);

        this.handleSetTime = this.handleSetTime.bind(this);
        this.handleSetPersonnel = this.handleSetPersonnel.bind(this);
        this.handleSetLocation = this.handleSetLocation.bind(this);
        this.handleApplyFilter = this.handleApplyFilter.bind(this);

        this.resetAllFilters = this.resetAllFilters.bind(this);

        this.filters = _.assign({}, DefaultFilter);
        this.timeFilter = {
            preHours: 48,
            postHours: 24,
            caseDate: moment(DefaultFilter.date_to).subtract(1, 'day')
        };
        this.locFilter = {
            ci_from: DefaultFilter.ci_from,
            ci_to: DefaultFilter.ci_to
        };
        this.pplFilter = {
            numbers: DefaultFilter.numbers
        };

        this.state = {
            filter: _.assign({}, this._transformTime(), this.locFilter, this.pplFilter)
        }
    }

    handleUpdateFP() {
        // sync side bar with main content
        this.refs.sideBar.style.height = this.refs.main.scrollHeight + "px";   
    }

    handleDownload() {
        this.props.onOpenExport();
    }

    handleOpenFilter(name) {
        if (!this.props.isUnfold) {
            this.props.onToggleChange();
        }
    }

    handleSetTime(time) {
        this.timeFilter = time;

        this.setState({
            filter: _.assign({}, this._transformTime(), this.locFilter, this.pplFilter)
        });        
    }

    _calcDateRange(caseDate, preHours, postHours) {
        this.filterContent = {
            caesDate: caseDate,
            preHours: preHours,
            postHours: postHours
        };

        return [(new moment(caseDate)).subtract(preHours, 'hours').toDate(), (new moment(caseDate)).add(postHours, 'hours').toDate()]
    }

    _transformTime() {
        if (this.timeFilter.caseDate) {
            return {
                date_from: (new moment(this.timeFilter.caseDate)).subtract(this.timeFilter.preHours, 'hours').toDate(),
                date_to: (new moment(this.timeFilter.caseDate)).add(this.timeFilter.postHours, 'hours').toDate()
            };
        } else {
            return this.timeFilter;
        }
    }

    handleSetLocation(loc) {
        this.locFilter = loc;
    }

    handleSetPersonnel(list) {
        this.pplFilter = {
            numbers: JSON.stringify(list)
        };
    }

    handleApplyFilter() {
        this.props.onApplyFilter(_.assign({}, this._transformTime(), this.locFilter, this.pplFilter));
    }

    // TODO rewrite with Flux
    resetAllFilters() {
        this.refs.fp.resetAllFilters();
    }

    render() {
        const isUnfold = this.props.isUnfold;

        return (
            <div className="col-md-3 left_col" style={{height: this.props.dim.height+'px', 'overflow': 'auto'}}>
                <div className="side_bar" ref="sideBar"/>
                <div className="filter_bg"/>
                <div className="left_col scroll-view" ref="main">

                    {/*nav title, toggler*/}
                    <div
                        className="navbar nav_title"
                    >
                        <a 
                            className="site_title" 
                            onClick= e => {
                                e.preventDefault();
                                this.props.onToggleMenu();
                            }
                        >
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
                        ref="fp"
                        currFilter={this.state.filter}
                        suspects={this.props.suspects}
                        isUnfold={isUnfold} 
                        onOpenFilter={this.handleOpenFilter}
                        onUpdateTime={this.handleSetTime}
                        onUpdateLocation={this.handleSetLocation}
                        onUpdateSuspect={this.handleSetPersonnel}
                        onUpdateFP={this.handleUpdateFP}
                        CIData={this.props.CIData}/>

                    {/*sidebar menu*/}
                    <div id="sidebar-footer" className="sidebar-footer">
                        <span className="content">重置所有筛选条件</span>
                        <span className="resetall"><img onClick={this.resetAllFilters} src={"../icons/svg/filtericon/resetall" + (this.filters.length > 0 ? "-active" : "") + "@1x.svg"} className="logo"/></span>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isUnfold: state.filter.isUnfold
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onToggleMenu: () => {
            dispatch(toggleMenu())
        }
    }
}

Menu = connect(mapStateToProps, mapDispatchToProps)(Menu)

module.exports = Menu;