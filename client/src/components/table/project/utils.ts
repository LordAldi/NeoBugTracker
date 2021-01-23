import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export type Order = "asc" | "desc";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
  })
);

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
export interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}
export interface ServerUsersData {
  name: string;
  description: string;
  createdBy: UserData;
  modifiedBy: UserData;
  created: string;
  modified: string;
}
interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  id: string;
}
export interface Data {
  name: string;
  description: string;
  createdBy: string;
  modifiedBy: string;
  created: string;
  modified: string;
}
export function createData(
  name: string,
  description: string,
  createdBy: UserData,
  modifiedBy: UserData,
  created: string,
  modified: string
): Data {
  let cLastName: string;
  let cFirstName: string;
  let mLastName: string;
  let mFirstName: string;

  if (!createdBy) {
    cLastName = "user";
    cFirstName = "unknown";
  } else {
    cLastName = createdBy.lastName;
    cFirstName = createdBy.firstName;
  }
  if (!createdBy) {
    mLastName = "user";
    mFirstName = "unknown";
  } else {
    mLastName = modifiedBy.lastName;
    mFirstName = modifiedBy.firstName;
  }
  return {
    name,
    description,
    created,
    createdBy: `${cFirstName} ${cLastName}`,
    modified,
    modifiedBy: `${mFirstName} ${mLastName}`,
  };
}
