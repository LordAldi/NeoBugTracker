import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  CLEAR_ERRORS,
  SET_ERRORS,
  LOADING_UI,
  REMOVE_LOADING_USER,
} from "../types";
import axios from "axios";

export const loginUser =
  (userData: loginProps, redirect: Function) => (dispatch: any) => {
    dispatch({ type: LOADING_UI });
    axios
      .post("/api/users/signin", {
        email: userData.email,
        password: userData.password,
      })
      .then(async (res) => {
        sessionStorage.setItem("email", userData.email);
        await dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS });
        redirect();
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data.errors,
        });
      });
  };
export const signupUser =
  (userData: signupProps, redirect: Function) => async (dispatch: any) => {
    dispatch({ type: LOADING_UI });
    try {
      const res = await axios.post("/api/users/signup", {
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
      });
      sessionStorage.setItem("email", userData.email);

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

export const logoutUser = () => (dispatch: any) => {
  axios.post("/api/users/signout").then((res) => {
    sessionStorage.removeItem("email");
    dispatch({ type: SET_UNAUTHENTICATED });
  });
};
export const currentuser = () => async (dispatch: any) => {
  dispatch({ type: LOADING_UI });

  try {
    dispatch(await getUserData());
    dispatch({ type: CLEAR_ERRORS });
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.response.data.errors,
    });
  }
};
export const getUserData = () => (dispatch: any) => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/api/users/currentuser")
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: { ...res.data },
      });
    })
    .catch((err) => {
      console.log(err);
    });
  // try {
  //   console.log("masukcekuser");

  //   const { data } = await axios.get("/api/users/currentuser");
  //   console.log(data);

  //   dispatch({
  //     type: SET_USER,
  //     payload: { ...data },
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
};

export type loginProps = {
  email: string;
  password: string;
};
export type signupProps = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};
