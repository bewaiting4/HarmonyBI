import _ from 'lodash'
import { combineReducers } from 'redux'
import Time from './timeFilter'
import Location from './locationFilter'
import IdNumber from './idNumberFilter'

const isUnfold = (state = true, action = {}) => {
	switch (action.type) {
		case 'TOGGLE_MENU':
			return !state
		case 'TOGGLE_FILTER':
			return true
		default:
			return state
	}
}

export default combineReducers({
	isUnfold,
	Time,
	Location,
	IdNumber
})
