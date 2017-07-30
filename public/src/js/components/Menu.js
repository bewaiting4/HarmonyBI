import React from 'react'
import _ from 'lodash'
import FontAwesome from 'react-fontawesome';

import FilterPortlet from './FilterPortlet'

import style from './Menu.css'




class Menu extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.handleOpenFilter = this.handleOpenFilter.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
    this.dftState = {
        onTimeFilter: false,
        onLocationFilter: false,
        onPhoneFilter: false
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

  componentDidUpdate() {
  }


  handleOpenFilter(name) {
    if (!this.props.navSize) {
      this.props.onToggleChange();  
    }
    
    this.setState(function(prevState, props) {      
      let res = _.assign({}, this.dftState);
      let prop = "on" + name + "Filter";
      res[prop] = !prevState[prop];

      return res;
    });
  }

	render() {
    const onTimeFilter = this.state.onTimeFilter;
    const onLocationFilter = this.state.onLocationFilter;
    const onPhoneFilter = this.state.onPhoneFilter;
    const navSize = this.props.navSize;

		return <div className='col-md-3 left_col'>
        <div className="left_col scroll-view">
          {/*nav title, toggler*/}
          <div className="navbar nav_title" style={{border: 0}}>
              <a className="site_title" onClick={this.handleClick}>
                <FontAwesome name="filter" size="lg">
                </FontAwesome>
              </a>
          </div>

          {/* pdf export */}
          <div className="navbar nav_title" style={{border: 0}}>
              <a className="site_title" onClick={this.handleDownload}>
                <FontAwesome name="download" size="lg">
                </FontAwesome>
                
                <button className="btn btn-success" style={{"marginLeft": "120px"}}>导出分析报告</button>
              </a>
          </div>

          {/*sidebar menu*/}
            <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
              <div className="menu_section">
                <h3>筛选器</h3>
                <ul className="nav side-menu">
                
                  <FilterPortlet name="Time" text="案发时间" navSize={navSize} onOpenFilter={this.handleOpenFilter} icon='map-marker' onFilter={onTimeFilter}/>

                  <FilterPortlet name="Location" text="案发地点" navSize={navSize} onOpenFilter={this.handleOpenFilter} icon='puzzle-piece' onFilter={onLocationFilter}/>

                  <FilterPortlet name="Phone" text="嫌疑人电话号码" navSize={navSize} onOpenFilter={this.handleOpenFilter} icon='phone-square' onFilter={onPhoneFilter}/>                 

                </ul>
              </div>
            </div>
           {/*sidebar menu*/}                   
        </div>
		  </div>
	}
}
module.exports = Menu;