import React from 'react';
import ReactDOM from 'react-dom';

import Menu from './components/Menu';
import FilterBar from './components/FilterBar';
import FilterPanel from './components/FilterPanel';
import DocumentView from './components/DocumentView';
import TabBar from './components/TabBar';

ReactDOM.render(
    <div className='app'>
        <Menu/>
        <FilterBar/>
        <FilterPanel/>
        <DocumentView/>
        <TabBar/>
    </div>,
	
    document.body
);