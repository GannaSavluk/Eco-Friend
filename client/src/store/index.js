import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk"

import { user } from "./user/reducers";


const reducers = combineReducers({
  user,
});

const composeEnhancer =
  process.env.NODE_ENV === "production"
    ? applyMiddleware(thunk)
    : composeWithDevTools(applyMiddleware(thunk));


export const store = createStore(reducers, composeEnhancer);

