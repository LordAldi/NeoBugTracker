import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  CLEAR_ERRORS,
  SET_ERRORS,
  LOADING_UI,
} from "../types";
import axios from "axios";
import { useHistory } from "react-router-dom";

export const loginUser = (userData: loginProps, redirect: Function) => async (
  dispatch: any
) => {
  dispatch({ type: LOADING_UI });
  try {
    const res = await axios.post("/api/users/signin", {
      email: userData.email,
      password: userData.password,
    });
    console.log(res);

    dispatch(await getUserData());
    dispatch({ type: CLEAR_ERRORS });
    redirect();
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.response.data.errors,
    });
  }
};
export const getUserData = async () => async (dispatch: any) => {
  dispatch({ type: LOADING_USER });
  try {
    const { data } = await axios.get("/api/users/currentuser");
    dispatch({
      type: SET_USER,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export type loginProps = {
  email: string;
  password: string;
};
