import { APIInstance } from "./axiosInstance";

export const getMainCategoryAPI = async (type) => {
  return await APIInstance.get(`/category/main/list`);
};

export const getSubCategoryAPI = async (type) => {
  return await APIInstance.get(`/category/sub/list`);
};
