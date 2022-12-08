import {createStore, combineReducers} from "redux"
import favoritesReducer from './reducers/reducers'

const rootReducer = combineReducers({
    user: favoritesReducer,
});

export const store = createStore(rootReducer);