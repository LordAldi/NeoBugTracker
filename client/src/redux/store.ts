import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducer from "./reducers/userReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import uiReducer, { IUIState } from "./reducers/uiReducer";
import projectReducer from "./reducers/projectReducer";

const initialState = {};
const middleware = [thunk];
interface IReducer {
  user: any;
  UI: IUIState;
}

const reducers = combineReducers({
  user: userReducer,
  UI: uiReducer,
  Project: projectReducer,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
