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

  componentDidUpdate() {}

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

    this.props.reLayout();
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
        <div className="left_col scroll-view">
          {/*nav title, toggler*/}
          <div
            className="navbar nav_title"
            style={{
              border: 0,
              width: "100%"
            }}
          >
            <a className="site_title" onClick={this.handleClick}>
              <FontAwesome name="filter" size="lg" />
            </a>{" "}
          </div>
          {/* pdf export */}
          <div
            className="navbar nav_title"
            style={{
              border: 0
            }}
          >
            <a className="site_title" onClick={this.handleDownload}>
              <FontAwesome name="download" size="lg" />
              <button
                className="btn btn-success"
                style={{
                  marginLeft: "120px"
                }}
              >
              导出分析报告
              </button>
            </a>{" "}
          </div>
          {/*sidebar menu*/}
          <div
            id="sidebar-menu"
            className="main_menu_side hidden-print main_menu"
          >
            <div className="menu_section">
              <h3> 筛选器 </h3>
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
                  name="Mobile"
                  text="嫌疑人电话号码"
                  navSize={navSize}
                  onOpenFilter={this.handleOpenFilter}
                  icon="phone-square"
                  onFilter={onMobileFilter}
                />
                  <FilterPortlet
                      name="IdNumber"
                      text="身份证号码"
                      navSize={navSize}
                      onOpenFilter={this.handleOpenFilter}
                      icon="id-card-o"
                      onFilter={onIdNumberFilter}
                  />
                  <FilterPortlet
                      name="Language"
                      text="语种"
                      navSize={navSize}
                      onOpenFilter={this.handleOpenFilter}
                      icon="calendar-o"
                      onFilter={onLanguageFilter}
                  />
                  <FilterPortlet
                      name="PhoneType"
                      text="机型"
                      navSize={navSize}
                      onOpenFilter={this.handleOpenFilter}
                      icon="superpowers"
                      onFilter={onPhoneTypeFilter}
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