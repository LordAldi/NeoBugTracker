import { useEffect } from "react";
import { connect } from "react-redux";
import { currentuser } from "../../../redux/actions/userActions";

const GetCurrentUser = ({ children, user, currentuser }: any) => {
  useEffect(() => {
    const fetchDataAsync = () => {
      currentuser();
    };
    if (!user.currentUser) {
      fetchDataAsync();
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
