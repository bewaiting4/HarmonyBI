import _ from 'lodash'
import { combineReducers } from 'redux'
import moment from 'moment'
import DefaultFilter from '../model/DefaultFilter'

const dftState = {
	isOn: false,
	activeTab: 1,
	preHours: 48,
	postHours: 24,
	caseDate: moment(DefaultFilter.date_to).subtract(1, 'day'),		
	date_from: moment(DefaultFilter.date_from),
	date_to: moment(DefaultFilter.date_to),
	outputTime: {
		date_from: moment(DefaultFilter.date_from),
		date_to: moment(DefaultFilter.date_to)
	}
}

const timeFilter = (state = dftState, action = {}) => {
	let update = {}

	switch (action.type) {
		case 'UPDATE_DATE_RANGE':
			['preHours', 'postHours', 'caseDate', 'date_from', 'date_to'].forEach((prop) => {
				if (prop in action) {
					update[prop] = action[prop]
				}
			})

			return _.assign({}, state, update)
		case 'UPDATE_TIME':
			update = _.assign({}, action.time);
			
			if (action.time.caseDate) {
				update.outputTime = {
					date_from: moment(action.time.caseDate).subtract(action.time.preHours, 'hours'),
					date_to: moment(action.time.caseDate).add(action.time.postHours, 'hours')
				}
			} else if (action.time.date_from) {
				update.outputTime = _.assign({}, action.time)
			}

			return _.assign({}, state, update)
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
