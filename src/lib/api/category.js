import { APIInstance, testAPIInstance } from "./axiosInstance";

export const getMainCategoryAPI = async (type) => {
  return await testAPIInstance.get(`/category/main/list`);
};

export const getSubCategoryAPI = async (type) => {
  return await testAPIInstance.get(`/category/sub/list`);
};
