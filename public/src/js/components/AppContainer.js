import React from 'react';
import ReactDOM from 'react-dom';

import Menu from './Menu';
import TopNav from './TopNav';

import DocumentView from './DocumentView';
import TabBar from './TabBar';

import Model from '../model/Model'

import style from './AppContainer.css'

class AppContainer extends React.Component {
	constructor() {
		super();

		this.state = {navSize: false};
		this.handleToggle = this.handleToggle.bind(this);
		this.dataModel = Model();

		this.state = {docData: null};
	}

	componentDidMount() {
		
    	this.dataModel.getVizData(function(data) {
    		this.setState({docData: data});
    	}.bind(this));
  	}

	handleToggle() {
		this.setState(function(prevState, props) {
			return {
		    	navSize: !prevState.navSize
			};
		});
	}

	render() {
		const myData = this.state.docData;
		const navSize = this.state.navSize;

		if (this.state.docData) {
			return <div className={navSize? 'nav-md' : 'nav-sm'}>
					<div className='container body'>
						<div className='main_container'>
							<Menu onToggleChange={this.handleToggle} navSize={navSize}></Menu>
							<TopNav/>
							<DocumentView data={myData}/>
						</div>
					</div>
				</div>			
		} else {
			return <div>Loading...</div>
		}

	}
}
module.exports = AppContainer;