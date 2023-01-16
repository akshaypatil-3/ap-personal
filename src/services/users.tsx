import axiosRequest from "../utils/axiosRequest";
import { endPoints } from "../utils/endpoints";
import { User } from "./types";

export const searchUser = () => {
  return axiosRequest({
    url: endPoints.users.search,
    options: { method: "GET" },
  }).then((res: { data: User[] }) => {
    return res;
  });
};
