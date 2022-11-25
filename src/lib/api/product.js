import { APIInstance } from "./axiosInstance";
import makeQuery from "../utils/makeQuery";

export const listProductsAPI = async (options) => {
  const query = makeQuery(options);

  return await APIInstance.get(`/clothe/list?filters=${query}`);
};

export const getProductAPI = async (id) => {
  return await APIInstance.get(`/clothe/read:${id}`);
};

export const testListProductsAPI = async (options) => {
  const query = makeQuery(options);

  return await APIInstance.get(`/unknown`);
};
