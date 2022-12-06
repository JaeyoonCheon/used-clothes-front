import { APIInstance, testAPIInstance } from "./axiosInstance";

export const getScopeAListAPI = async () => {
  return await testAPIInstance.get(`/location/scope_a/list`);
};

export const getScopeBListAPI = async () => {
  return await testAPIInstance.get(`/location/scope_b/list`);
};

export const getScopeCListAPI = async () => {
  return await testAPIInstance.get(`/location/scope_c/list`);
};
