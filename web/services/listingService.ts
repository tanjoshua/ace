import axiosBase from "./base";

const getListings = () => {
  const params = {};
  return axiosBase("/listing", { params });
};

const createListing = () => {};

export default {};
