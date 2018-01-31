import _ from 'lodash'

const filter = (state = {isUnfold: true}, action) => {
	switch (action.type) {
		case 'TOGGLE_MENU':
			return _.assign({}, state, {isUnfold: !state.isUnfold})
		case 'TOGGLE_FILTER':
			let prop = 'on' + action.name + 'Filter',
				update = {};
			
			update[prop] = !state[prop]
			if (!state.isUnfold && !state[prop]) {
				update.isUnfold = !state.isUnfold
			}
			return _.assign({}, state, update)
		default:
			return state
	}
}

export default filter