import React from 'react'
import EChartsWrapper from './EChartsWrapper.js'


class ChartContainer extends React.Component {
	constructor() {
		super();

		this.wrapper = new EChartsWrapper();
	}

	componentDidMount() {

		this.componentDidUpdate();

  	}

  	componentDidUpdate(prevProps, prevState) {
		this.wrapper.renderChart(this.props.id, this.props.type || "bar"); 		
  	}

	render() {
		const myId = this.props.id || "mainb";
		const title = this.props.title || "图表"


		return <div className="col-md-4 col-sm-4 col-xs-12">
            <div className="x_panel">
              <div className="x_title">
                <h2>{title}</h2>
                <ul className="nav navbar-right panel_toolbox">
                  <li><a className="collapse-link"><i className="fa fa-chevron-up"></i></a>
                  </li>
                  <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i className="fa fa-wrench"></i></a>
                    <ul className="dropdown-menu" role="menu">
                      <li><a href="#">Settings 1</a>
                      </li>
                      <li><a href="#">Settings 2</a>
                      </li>
                    </ul>
                  </li>
                  <li><a className="close-link"><i className="fa fa-close"></i></a>
                  </li>
                </ul>
                <div className="clearfix"></div>
              </div>
              <div className="x_content">

                <div id={myId} style={{height: "200px"}}></div>

              </div>
            </div>
	    </div>
	}
}
module.exports = ChartContainer;