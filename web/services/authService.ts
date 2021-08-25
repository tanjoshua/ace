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

export default { register, login, logout };