import _ from 'lodash'

const topNav = (state = {}, action) => {
	switch (action.type) {
		case 'CLICK_MENU':
			return _.assign({}, state, {
				selected: action.selected
			})
		default:
			return state
	}
}

export default topNav