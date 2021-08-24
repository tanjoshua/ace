import axiosBase from "./base";

const getUser = () => {
  return axiosBase.get("/user");
};

export default { getUser };
