import axiosBase from "./base";

const register = ({ name, email, password }) => {
  return axiosBase.post("/auth/register", { name, email, password });
};

const login = ({ email, password }) => {
  return axiosBase.post("/auth/login", { email, password });
};

const logout = () => {
  return axiosBase.post("/auth/logout");
};

const forgotPassword = ({ email }) => {
  return axiosBase.post("/auth/forgotPassword", { email });
};

const resetPassword = ({ token, password }) => {
  return axiosBase.post("/auth/resetPassword", { token, password });
};

const changeEmail = ({ password, newEmail }) => {
  return axiosBase.post("/auth/changeEmail", { newEmail, password });
};

const changePassword = ({ oldPassword, newPassword }) => {
  return axiosBase.post("/auth/changeEmail", { oldPassword, newPassword });
};

export default {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  changeEmail,
  changePassword,
};
