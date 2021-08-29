import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import Dashboard from "../Dashboard";
import { IRootState } from "../../redux/store";
import { IUserState } from "../../redux/reducers/userReducer";
// import PropTypes from 'prop-types'

const SecureRoute = ({ component: Component, ...rest }: any) => {
  const authenticated: boolean = useSelector(
    (state: IRootState) => state.User.authenticated
  );
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
};

export default SecureRoute;
