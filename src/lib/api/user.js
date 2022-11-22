import { APIInstance, testAPIInstance } from "./axiosInstance";

export const loginAPI = async (payload) => {
  return await testAPIInstance.post(`user/login`, payload);
};

export const registerAPI = async (payload) => {
  const { email, name, password, phone } = payload;

  return await testAPIInstance.post(
    `user/create`,
    {
      email,
      name,
      password,
      phone,
    },
    { withCredentials: true }
  );
};

export const getUserInfoAPI = async (payload) => {};
