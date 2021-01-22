import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

function ListSingleItem(props: any) {
  const { icon, primary, to } = props;

  const CustomLink = (props: any) => <Link to={to} {...props} />;

  return (
    <li>
      <ListItem button component={CustomLink}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

export default ListSingleItem;
