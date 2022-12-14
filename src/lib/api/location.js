import { APIInstance } from "./axiosInstance";

export const getScopeAListAPI = async () => {
  return await APIInstance.get(`/location/scope_a/list`);
};

export const getScopeBListAPI = async () => {
  return await APIInstance.get(`/location/scope_b/list`);
};

export const getScopeCListAPI = async () => {
  return await APIInstance.get(`/location/scope_c/list`);
};
