import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk as thunkMiddleWare } from 'redux-thunk'

import rootReducer from "../reducer/rootReducer";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleWare))

const store = createStore(rootReducer, composedEnhancer);

export default store;
