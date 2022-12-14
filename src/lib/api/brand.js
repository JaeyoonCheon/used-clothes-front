import { APIInstance } from "./axiosInstance";

export const getBrandListAPI = async (name = "") => {
  return await APIInstance.get(`/brand/list?name=${name}`);
};

export const addBrandAPI = async (name) => {
  return await APIInstance.post(`/brand/create`, { name });
};
