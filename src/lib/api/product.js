import { APIInstance, testAPIInstance } from "./axiosInstance";
import makeQuery from "../utils/makeQuery";

export const listProductsAPI = async (options) => {
  const query = makeQuery(options);

  return await testAPIInstance.get(`/clothe/list?filters=${query}`);
};

export const getProductAPI = async (id) => {
  return await testAPIInstance.get(`/clothe/read:${id}`);
};
