import _ from 'lodash'
import { combineReducers } from 'redux'
import DefaultFilter from '../model/DefaultFilter'

const dftState = {
	isOn: false
}

const idNumberFilter = (state = dftState, action = {}) => {
	switch (action.type) {
		case 'TOGGLE_FILTER':
			if (action.name === 'IdNumber') {
				return _.assign({}, state, {isOn: !state.isOn})
			}

			return state
		default:
			return state
	}
}

export default idNumberFilter
