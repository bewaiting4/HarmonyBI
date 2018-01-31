export const toggleMenu = () => {
	return {
		type: 'TOGGLE_MENU'
	}
}

export const toggleFilter = (name) => {
	return {
		type: 'TOGGLE_FILTER',
		name
	}
}