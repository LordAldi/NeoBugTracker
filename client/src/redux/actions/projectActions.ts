import {
  SET_PROJECT,
  SET_PROJECTS,
  CREATE_PROJECT,
  EDIT_PROJECT,
  LOADING_PROJECT,
} from "../types";

import axios from "axios";
import {
  createData,
  ServerUsersData,
} from "../../components/table/project/utils";

export const getProjects = () => (dispatch: any) => {
  console.log("loll");

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
