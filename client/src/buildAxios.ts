import axios from "axios";

const builClient = ({ req }: any) => {
  return axios.create({
    baseURL: process.env.REACT_APP_API_URI,
    headers: req.headers,
  });
};
export default builClient;
