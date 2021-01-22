import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useState } from "react";
//material
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./utils/theme";
import { MuiThemeProvider } from "@material-ui/core/styles";
//axios
import axios from "axios";
//
import Home from "./pages/Home";
//
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import store from "./redux/store";
import { connect, Provider } from "react-redux";
import { SET_AUTHENTICATED } from "./redux/types";
import {
  currentuser,
  getUserData,
  logoutUser,
} from "./redux/actions/userActions";
import SecureRoute from "./components/utils/SecureRoute";
import AuthRoute from "./components/utils/AuthRoute";
import { useEffect } from "react";
import Cookies from "js-cookie";
import Test from "./pages/Test";
import Dashboard from "./components/Dashboard";
if (!process.env.REACT_APP_API_URI) {
  throw new Error("REACT_APP_API_URI MUST DEFINE");
}

const theme = createMuiTheme(themeFile);

axios.defaults.baseURL = process.env.API_URI;

if (Cookies.get("express:sess")) {
  store.dispatch({ type: SET_AUTHENTICATED });
  store.dispatch(getUserData() as any);
} else {
  store.dispatch(logoutUser() as any);
}

function App({ user, UI, logoutUser, currentuser }: any) {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Dashboard>
          <Switch>
            <SecureRoute exact path="/" component={Home} />
            <SecureRoute exact path="/test" component={Test} />
            <AuthRoute exact path="/signin" component={Signin} />
            <AuthRoute exact path="/signup" component={Signup} />
            {/* <Route path="/" component={RedirectSignin} /> */}
          </Switch>
        </Dashboard>
      </Router>
    </MuiThemeProvider>
  );
}
const mapStateToProps = (state: any) => ({
  user: state.user,
  UI: state.UI,
});
const mapActionsToProps = {
  logoutUser,
  currentuser,
};
export default connect(mapStateToProps, mapActionsToProps)(App);
