import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//material
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./utils/theme";
import { MuiThemeProvider } from "@material-ui/core/styles";
//axios
import axios from "axios";
//redux
import { Provider, connect } from "react-redux";
import store from "./redux/store";
import Dashboard from "./pages/Dashboard";
//
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

import GetCurrentUser from "./components/utils/hoc/GetCurrentUser";
if (!process.env.REACT_APP_API_URI) {
  throw new Error("REACT_APP_API_URI MUST DEFINE");
}

const theme = createMuiTheme(themeFile);

axios.defaults.baseURL = process.env.API_URI;
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <GetCurrentUser>
        <Router>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signup" component={Signup} />
          </Switch>
        </Router>
      </GetCurrentUser>
    </MuiThemeProvider>
  );
}

export default App;
