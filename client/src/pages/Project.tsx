import React from "react";
import { Box, Container, Grid, makeStyles, Paper } from "@material-ui/core";
import clsx from "clsx";
import Copyright from "../components/Copyright";
import TableProject from "../components/table/project/TableProject";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));
const Project = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <Grid container spacing={3}>
      {/* Chart */}
      <TableProject />
      <Grid item xs={12} md={8} lg={9}>
        <Paper className={fixedHeightPaper}>{/* <Chart /> */}</Paper>
      </Grid>
      {/* Recent Deposits */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}>{/* <Deposits /> */}</Paper>
      </Grid>
      {/* Recent Orders */}
      <Grid item xs={12}>
        <Paper className={classes.paper}>{/* <Orders /> */}</Paper>
      </Grid>
    </Grid>
  );
};

export default Project;
