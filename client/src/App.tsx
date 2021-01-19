import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//material
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./utils/theme";
import { MuiThemeProvider } from "@material-ui/core/styles";
//axios
import axios from "axios";
//redux
import { Provider } from "react-redux";
import store from "./redux/store";
import Dashboard from "./pages/Dashboard";
//
import Signin from "./pages/Signin";

const theme = createMuiTheme(themeFile);

if (!process.env.REACT_APP_API_URI) {
  throw new Error("REACT_APP_API_URI MUST DEFINE");
}
axios.defaults.baseURL = process.env.API_URI;
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/signin" component={Signin} />
          </Switch>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
