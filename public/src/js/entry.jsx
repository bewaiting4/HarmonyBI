import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import dashboard from './reducers'
import AppContainer from './components/AppContainer'

let store = createStore(dashboard)

ReactDOM.render(
	<Provider store={store}>
	    <div className='App'>
	        <AppContainer/>
	    </div>
    </Provider>,
	
    document.getElementById("app")
);