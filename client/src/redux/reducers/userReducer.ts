import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  REMOVE_LOADING_USER,
} from "../types";
export interface IUserState {
  authenticated: boolean;
  loading: boolean;
  credentials: any;
}
type Action = {
  type: string;
  payload?: any;
};

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
};

export default function (
  state: IUserState = initialState,
  action: Action
): IUserState {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case REMOVE_LOADING_USER:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
