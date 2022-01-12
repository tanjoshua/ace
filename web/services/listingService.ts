import axiosBase from "./base";

export const getListings = (params?) => {
  return axiosBase.get("/listing", { params });
};

export const createListing = (data) => {
  return axiosBase.post("/listing", data);
};

export const uploadListingImage = (id, image) => {
  let data = new FormData();
  data.append("image", image);
  return axiosBase.post(`/listing/${id}/image`, data);
};

export const updateListing = (data) => {
  return axiosBase.put("/listing", data);
};

export const getListingById = (id) => {
  return axiosBase.get(`/listing/${id}`);
};

export const deleteListingById = (id) => {
  return axiosBase.delete(`/listing/${id}`);
};

export const getLevels = () => {
  return axiosBase.get(`/listing/levels`);
};

export const getSubjects = () => {
  return axiosBase.get(`/listing/subjects`);
};

export default {
  getListings,
  createListing,
  uploadListingImage,
  updateListing,
  getListingById,
  deleteListingById,
  getLevels,
  getSubjects,
};
