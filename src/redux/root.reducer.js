import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import ListReducer from './list/list.reducer.js';
import userReducer from './user.reducer.js';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['lists', 'user']
};

const rootReducer = combineReducers({
	lists: ListReducer,
	user: userReducer
});

export default persistReducer(persistConfig, rootReducer);
