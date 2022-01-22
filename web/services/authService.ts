import axiosBase from "./base";

const register = ({ email, password }) => {
  return axiosBase.post("/auth/register", { email, password });
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

export default { register, login, logout, forgotPassword, resetPassword };
