import axiosBase from "./base";

const getCurrentUser = () => {
  return axiosBase.get("/user/me");
};

export default { getCurrentUser };
