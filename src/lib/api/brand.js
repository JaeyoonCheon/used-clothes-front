import { APIInstance, testAPIInstance } from "./axiosInstance";

export const getBrandListAPI = async (name = "") => {
  return await testAPIInstance.get(`/brand/list?name=${name}`);
};

export const addBrandAPI = async (name) => {
  return await testAPIInstance.post(`/brand/create`, { name });
};
