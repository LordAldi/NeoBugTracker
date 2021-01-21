import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
// import PropTypes from 'prop-types'

const SecureRoute = ({ component: Component, authenticated, ...rest }: any) => (
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

const mapStateToProps = (state: any) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(SecureRoute);
