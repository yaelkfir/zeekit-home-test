/**
 * Created by yaelo on 4/12/17.
 */
import { createStore, combineReducers } from 'redux';

import testReducer from './reducers/testReducer';
import searchData from './reducers/searchData';

const reducer = combineReducers({
  testReducer,
  searchData
});

const store = createStore(reducer);


export default store;
