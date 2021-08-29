import React, { useEffect } from "react";
import {
  Breadcrumbs,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { DataGrid, GridColDef, GridCellParams } from "@material-ui/data-grid";
import Link from "@material-ui/core/Link";
import clsx from "clsx";
import { useSelector } from "react-redux";
import CustomNoRowsOverlay from "../components/utils/CustomNoRowsOverlay";
import { useHistory } from "react-router";
import { IRootState } from "../redux/store";
import { IProjectState } from "../redux/reducers/projectReducer";

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
  fixedHeightTable: {
    height: 420,
  },
  header: {
    marginBottom: 20,
  },
}));
interface IProjectProps {
  Project: {
    projects: any[];
    loading: boolean;
  };
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", hide: true },
  { field: "name", headerName: "Name", width: 200 },
  { field: "description", headerName: "Description", width: 350 },
  { field: "created", headerName: "Created At", width: 250, type: "date" },
  { field: "createdBy", headerName: "Created By", width: 200 },
  { field: "modified", headerName: "Modified At", width: 250 },
  { field: "modifiedBy", headerName: "Modified By", width: 200 },
];
const Project: React.FC<IProjectProps> = (): JSX.Element => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const history = useHistory();
  const Project: IProjectState = useSelector(
    (state: IRootState) => state.Project
  );
  const { projects, loading } = Project;
  useEffect(() => {
    const fetchProjects = () => {};
    fetchProjects();
  }, []);

  return (
    <Grid container spacing={3}>
      {/* Chart */}
      {/* <TableProject /> */}
      <Grid item xs={12}>
        <Breadcrumbs aria-label="breadcrumbs">
          <Link color="inherit" href="/">
            Home
          </Link>
          <Typography color="textPrimary">Project</Typography>
        </Breadcrumbs>
      </Grid>

      <Typography variant="h3" component="h3" className={classes.header}>
        Project
      </Typography>
      <Grid item xs={12}>
        <Paper className={(classes.paper, classes.fixedHeightTable)}>
          <DataGrid
            components={{ NoRowsOverlay: CustomNoRowsOverlay }}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            columns={columns}
            rows={projects}
            onRowDoubleClick={(param: any) => {
              console.log(param.row.id);
              history.push(`/project/${param.row.id}`);
            }}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Project;
