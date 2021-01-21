import { useEffect } from "react";
import { connect } from "react-redux";
import { currentuser } from "../../../redux/actions/userActions";
import Cookies from "js-cookie";
import cookie from "react-cookies";

const GetCurrentUser = ({ children, user, currentuser }: any) => {
  useEffect(() => {
    const fetchDataAsync = () => {
      currentuser();
    };
    if (!user.authenticated) {
      fetchDataAsync();
      if (!user.authenticated) {
      }
    }
  }, []);

  return <>{children}</>;
};
const mapStateToProps = (state: any) => ({
  user: state.user,
});
const mapActionsToProps = {
  currentuser,
};
export default connect(mapStateToProps, mapActionsToProps)(GetCurrentUser);
