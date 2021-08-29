import { Box, Container, Grid, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import clsx from "clsx";
import Copyright from "../components/Copyright";

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

const Home = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return <h1>Homes</h1>;
};

export default Home;
