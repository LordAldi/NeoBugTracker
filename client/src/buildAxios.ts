import axios from "axios";

const builClient = ({ req }: any) => {
  return axios.create({
    baseURL: "http://localhost:3001/api",
    headers: req.headers,
  });
};
export default builClient;
