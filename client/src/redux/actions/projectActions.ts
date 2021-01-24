import {
  SET_PROJECT,
  SET_PROJECTS,
  CREATE_PROJECT,
  EDIT_PROJECT,
  LOADING_PROJECT,
  CLEAR_ERRORS,
} from "../types";

import axios from "axios";
import {
  createData,
  ServerUsersData,
} from "../../components/table/project/utils";

export const getProjects = () => (dispatch: any) => {
  dispatch({ type: LOADING_PROJECT });
  axios
    .get("/api/projects")
    .then((res) => {
      let data: any[] = [];
      res.data.forEach((e: ServerUsersData) => {
        const {
          name,
          description,
          createdBy,
          modified,
          created,
          modifiedBy,
          id,
        } = e;
        data = [
          ...data,
          createData(
            name,
            description,
            createdBy,
            modifiedBy,
            created,
            modified,
            id
          ),
        ];
      });

      dispatch({
        type: SET_PROJECTS,
        payload: data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_PROJECTS,
        payload: [],
      });
    });
};

export const getProject = (id: string) => (dispatch: any) => {
  dispatch({ type: LOADING_PROJECT });
  axios
    .get(`/api/projects/${id}`)
    .then((res) => {
      dispatch({ type: SET_PROJECT, payload: res.data });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => console.log(err));
};
