import { Route, Redirect } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
// import PropTypes from 'prop-types'

const SecureRoute = ({ component: Component, ...rest }: any) => {
  const authenticated: boolean = useSelector(
    (state: IRootState) => state.User.authenticated
  );
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default SecureRoute;
