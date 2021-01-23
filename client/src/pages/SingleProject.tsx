import React from "react";

const SingleProject = ({ match }: any) => {
  return <div>{match.params.id}</div>;
};

export default SingleProject;
