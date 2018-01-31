import { combineReducers } from 'redux'
import filter from './filter'
import topNav from './topNav'

const dashboard = combineReducers({
	filter,
	topNav
})

export default dashboard