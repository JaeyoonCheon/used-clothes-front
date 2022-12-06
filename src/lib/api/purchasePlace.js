import { APIInstance, testAPIInstance } from "./axiosInstance";
import makeQuery from "../utils/makeQuery";

export const listPlaceAPI = async () => {
  return await testAPIInstance.get(`/purchase_place/list`);
};

export const addPlaceAPI = async (name) => {
  return await testAPIInstance.post(`/purchase_place/create`, {
    name,
  });
};
