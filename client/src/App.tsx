import { BrowserRouter as Router, Switch } from "react-router-dom";
import { useEffect } from "react";
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
import { useDispatch } from "react-redux";
import { SET_AUTHENTICATED } from "./redux/types";
import { currentuser, logoutUser } from "./redux/actions/userActions";
import SecureRoute from "./components/utils/SecureRoute";
import AuthRoute from "./components/utils/AuthRoute";
import Cookies from "js-cookie";
import Dashboard from "./components/Dashboard";
import Project from "./pages/Project";
import SingleProject from "./pages/SingleProject";
if (!process.env.REACT_APP_API_URI) {
  throw new Error("REACT_APP_API_URI MUST DEFINE");
}

const theme = createMuiTheme(themeFile);

axios.defaults.baseURL = process.env.API_URI;

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (Cookies.get("express:sess")) {
      dispatch({ type: SET_AUTHENTICATED });
      dispatch(currentuser());
    } else {
      dispatch(logoutUser());
    }
  }, []);
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          <AuthRoute exact path="/signin" component={Signin} />
          <AuthRoute exact path="/signup" component={Signup} />
          <Dashboard>
            <SecureRoute exact path="/" component={Home} />
            <SecureRoute exact path="/project" component={Project} />
            <SecureRoute exact path="/project/:id" component={SingleProject} />
          </Dashboard>
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
