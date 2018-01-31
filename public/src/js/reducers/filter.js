import _ from 'lodash'

const filter = (state = {isUnfold: true}, action) => {
	switch (action.type) {
		case 'TOGGLE_MENU':
			return _.assign({}, state, {isUnfold: !state.isUnfold})
		default:
			return state
	}
}

export default filter