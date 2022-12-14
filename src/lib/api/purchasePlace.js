import { APIInstance } from "./axiosInstance";
import makeQuery from "../utils/makeQuery";

export const listPlaceAPI = async () => {
  return await APIInstance.get(`/purchase_place/list`);
};

export const addPlaceAPI = async (name) => {
  return await APIInstance.post(`/purchase_place/create`, {
    name,
  });
};
