import _ from 'lodash'
import { combineReducers } from 'redux'
import DefaultFilter from '../model/DefaultFilter'

const dftState = {
	isOn: false
}

const timeFilter = (state = dftState, action = {}) => {
	switch (action.type) {
		case 'TOGGLE_FILTER':
			if (action.name === 'Time') {
				return _.assign({}, state, {isOn: !state.isOn})
			}

			return state
		default:
			return state
	}
}

export default timeFilter
