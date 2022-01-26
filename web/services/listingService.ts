import axiosBase from "./base";

export const getListings = (params?) => {
  return axiosBase.get("/listing", { params });
};

export const createListing = (data) => {
  const { pricing, pricingDetails, ...body } = data;

  // restructure body
  return axiosBase.post("/listing", {
    ...body,
    pricing: { rate: pricing, details: pricingDetails },
  });
};

export const uploadListingImage = (id, image) => {
  let formData = new FormData();
  formData.append("image", image);
  return axiosBase.post(`/listing/${id}/image`, formData);
};

export const updateListing = (id, data) => {
  const { pricing, pricingDetails, ...body } = data;
  return axiosBase.put(`/listing/${id}`, {
    ...body,
    pricing: { rate: pricing, details: pricingDetails },
  });
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

export const getRegions = () => {
  return axiosBase.get(`/listing/regions`);
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
  getRegions,
};
