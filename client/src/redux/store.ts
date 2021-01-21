import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducer from "./reducers/userReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import uiReducer, { IUIState } from "./reducers/uiReducer";

const initialState = {};
const middleware = [thunk];
interface IReducer {
  user: any;
  UI: IUIState;
}

const reducers = combineReducers({
  user: userReducer,
  UI: uiReducer,
});

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
