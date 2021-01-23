import {
  SET_PROJECT,
  SET_PROJECTS,
  CREATE_PROJECT,
  EDIT_PROJECT,
  LOADING_PROJECT,
} from "../types";
import produce from "immer";

interface IProjectState {
  projects: any[];
  project: any;
  loading: boolean;
}
const initialState: IProjectState = {
  projects: [],
  project: {},
  loading: false,
};
type Action = {
  type: string;
  payload: any;
};

export default function (state = initialState, action: Action) {
  let index, nextState;
  switch (action.type) {
    case LOADING_PROJECT:
      return {
        ...state,
        loading: true,
      };
    case SET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        loading: false,
      };
    case SET_PROJECT:
      return {
        ...state,
        project: action.payload,
      };
    case CREATE_PROJECT:
      nextState = produce(state, (draftState) => {
        draftState.projects.unshift(action.payload);
      });
      return nextState;
    default:
      return state;
  }
}
