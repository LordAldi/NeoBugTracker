import { Breadcrumbs, Grid, Link, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, connect } from "react-redux";

const SingleProject = ({ match, project }: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getProject(match.params.id));
  }, []);
  console.log(project);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Breadcrumbs aria-label="breadcrumbs">
          <Link color="inherit" href="/">
            Home
          </Link>
          <Link color="inherit" href="/project">
            Project
          </Link>
          <Typography color="textPrimary">{project.name}</Typography>
        </Breadcrumbs>
      </Grid>

      <Typography variant="h5">Name: {project.name}</Typography>
    </Grid>
  );
};

const mapStateToProps = (state: any) => ({
  project: state.Project.project,
});

export default connect(mapStateToProps)(SingleProject);
