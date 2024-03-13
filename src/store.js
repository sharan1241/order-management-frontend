import { createStore, combineReducers, applyMiddleware } from "redux";

import {thunk} from "redux-thunk";
import {compose} from 'redux'
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./rootReducer";

const finalReducer = combineReducers({
  rootReducer,
});

const intialState = {
  rootReducer: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};
const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  finalReducer,
  intialState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;