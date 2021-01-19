import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducer from "./reducers/userReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {};
const middleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
});

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
