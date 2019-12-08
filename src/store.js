import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
//import rootReducer from './reducers';
import staffReducer from './reducers';

const initialState ={};

const middleware = [thunk];

const store = createStore(staffReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)) );

export default store;
