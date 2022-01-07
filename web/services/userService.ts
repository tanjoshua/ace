import axiosBase from "./base";

const getCurrentUser = () => {
  return axiosBase.get("/user/me");
};

const getUserById = (userId) => {
  return axiosBase.get(`/user/${userId}`);
};

export default { getCurrentUser, getUserById };
