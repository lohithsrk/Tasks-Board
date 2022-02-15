const ListReducer = (state = null, action) => {
	switch (action.type) {
		case 'SAVE_USER':
			return action.payload;
		case 'REMOVE_USER':
			return action.payload.user;
		default:
			return state;
	}
};

export default ListReducer;
