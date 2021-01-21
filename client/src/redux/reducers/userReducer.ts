import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  REMOVE_LOADING_USER,
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
};

export default function (state = initialState, action: Action) {
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

type Action = {
  type: string;
  payload: any;
};
