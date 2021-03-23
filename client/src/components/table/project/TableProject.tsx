import { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import CircularProgress from "@material-ui/core/CircularProgress";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import {
  createData,
  Order,
  useStyles,
  stableSort,
  getComparator,
  ServerUsersData,
  Data,
} from "./utils";
import TableProjectToolbar from "./TableProjectToolbar";
import TableProjectHead from "./TableProjectHead";
import axios from "axios";
import { getProjects } from "../../../redux/actions/projectActions";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

// import { ServerUsersData } from "./utils";
// const projects = [
//   createData(
//     "new Project",
//     "this is project we are looking for",
//     {
//       firstName: "aldi",
//       lastName: "anugea",
//       email: "yeee@google.com",
//       role: "admin",
//       id: "aefuafefao",
//     },
//     {
//       firstName: "aldi",
//       lastName: "anugea",
//       email: "yeee@google.com",
//       role: "admin",
//       id: "aefuafefao",
//     },
//     "april 20123",
//     "maret 29300"
//   ),
// ];
interface ITableProjectProps {
  Project: {
    projects: any[];
    loading: boolean;
  };
}
const TableProject: React.FC<ITableProjectProps> = ({
  Project,
}): JSX.Element => {
  const classes = useStyles();
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("name");
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [rows, setRows] = React.useState<Data[]>([]);
  const history = useHistory();
  const { projects, loading } = Project;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProjects = () => {
      dispatch(getProjects());
    };
    fetchProjects();
  }, []);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = projects.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    console.log(id);
    history.push(`/project/${id}`);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, projects.length - page * rowsPerPage);

  let projectMarkup = !loading ? (
    stableSort(projects, getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((project: any, index) => {
        const isItemSelected = isSelected(project.name);
        const labelId = `enhanced-table-checkbox-${index}`;

        return (
          <TableRow
            hover
            onClick={(event) => handleClick(event, project.id)}
            role="checkbox"
            // aria-checked={isItemSelected}
            tabIndex={-1}
            key={project.id}
            // selected={isItemSelected}
          >
            {/* <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell> */}

            <TableCell align="left">{project.name}</TableCell>
            <TableCell align="left">{project.description}</TableCell>
            <TableCell align="left">{project.created}</TableCell>
            <TableCell align="left">{project.createdBy}</TableCell>
            <TableCell align="left">{project.modified}</TableCell>
            <TableCell align="left">{project.modifiedBy}</TableCell>
          </TableRow>
        );
      })
  ) : (
    <CircularProgress />
  );

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableProjectToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <TableProjectHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={projects.length}
            />
            <TableBody>
              {projectMarkup}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={projects.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  Project: state.Project,
});

export default connect(mapStateToProps)(TableProject);
