import axiosBase from "./base";

const getListings = () => {
  const params = {};
  return axiosBase.get("/listing", { params });
};

const createListing = (data) => {
  return axiosBase.post("/listing", data);
};

const updateListing = (data) => {
  return axiosBase.put("/listing", data);
};

const getListingById = (id) => {
  return axiosBase.get(`/listing/${id}`);
};

const deleteListingById = (id) => {
  return axiosBase.delete(`/listing/${id}`);
};

const getLevels = () => {
  return axiosBase.get(`/listing/levels`);
};

export default {};
