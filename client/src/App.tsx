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
import Dashboard from "./pages/Dashboard";
//
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import store from "./redux/store";
import { connect, Provider } from "react-redux";
import { SET_AUTHENTICATED } from "./redux/types";
import { currentuser, logoutUser } from "./redux/actions/userActions";
import SecureRoute from "./components/utils/SecureRoute";
import AuthRoute from "./components/utils/AuthRoute";
import { useEffect } from "react";

if (!process.env.REACT_APP_API_URI) {
  throw new Error("REACT_APP_API_URI MUST DEFINE");
}

const theme = createMuiTheme(themeFile);

axios.defaults.baseURL = process.env.API_URI;
const RedirectSignin: React.FunctionComponent = () => (
  <>
    <Redirect to="/signin" />
  </>
);
const RedirectDashboard: React.FunctionComponent = () => (
  <>
    <Redirect to="/" />
  </>
);
function App({ user, UI, logoutUser, currentuser }: any) {
  const [router, setrouter] = useState(
    <Switch>
      <Route exact path="/signin" component={Signin} />
      <Route exact path="/signup" component={Signup} />
      <Route path="/" component={RedirectSignin} />
    </Switch>
  );
  useEffect(() => {
    // const email: string = sessionStorage.email;
    // console.log(email);
    // if (email) {
    //   store.dispatch({ type: SET_AUTHENTICATED });
    //   store.dispatch(getUserData() as any);
    // } else {
    //   store.dispatch(logoutUser() as any);
    // }
    const fetchdata = async () => {
      await currentuser();
      if (user.currentUser) {
        setrouter(
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/" component={RedirectDashboard} />
          </Switch>
        );
      }
    };
    fetchdata();
    // window.location.href = "/";
  }, [user.authenticated]);
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          {router}
          {/* <SecureRoute exact path="/" component={Dashboard} />
          <AuthRoute exact path="/signin" component={Signin} />
          <AuthRoute exact path="/signup" component={Signup} /> */}
        </Switch>
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
