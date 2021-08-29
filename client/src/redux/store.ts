import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducer, { IUserState } from "./reducers/userReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import uiReducer, { IUIState } from "./reducers/uiReducer";
import projectReducer, { IProjectState } from "./reducers/projectReducer";

export interface IRootState {
  User: IUserState;
  UI: IUIState;
  Project: IProjectState;
}
const reducers = combineReducers({
  User: userReducer,
  UI: uiReducer,
  Project: projectReducer,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
