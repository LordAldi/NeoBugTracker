import React, { useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { getProject } from "../redux/actions/projectActions";

const SingleProject = ({ match, project }: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProject(match.params.id));
  }, []);
  console.log(project);

  return <div>{match.params.id}</div>;
};

const mapStateToProps = (state: any) => ({
  project: state.Project.project,
});

export default connect(mapStateToProps)(SingleProject);
