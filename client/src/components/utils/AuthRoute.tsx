import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
// import PropTypes from 'prop-types'

const SecureRoute = ({ component: Component, authenticated, ...rest }: any) => (
  <Route
    {...rest}
    render={(props) =>
      authenticated === true ? <Redirect to="/" /> : <Component {...props} />
    }
  />
);

const mapStateToProps = (state: any) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(SecureRoute);
