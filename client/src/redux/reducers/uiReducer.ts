import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
} from "../types";

export interface IUIState {
  loading: boolean;
  errors: any;
  openDialog: boolean;
}
const initialState = {
  loading: false,
  errors: null,
  openDialog: false,
};
type Action = { type: string; payload?: any };

export default function (state: IUIState = initialState, action: Action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null,
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
