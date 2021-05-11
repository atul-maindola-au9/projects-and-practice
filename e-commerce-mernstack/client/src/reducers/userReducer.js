export const userReducer = (state = null, action) => {
	console.log('action', action);
	switch (action.type) {
		case 'LOGGED_IN_USER':
			return action.payload;
		case 'LOGOUT':
			return action.payload;
		default:
			return state;
	}
};
