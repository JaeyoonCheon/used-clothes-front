import { APIInstance } from "./axiosInstance";

export const loginAPI = async (payload) =>
  APIInstance.post(`user/login`, payload, { withCredentials: true });

export const registerAPI = async (payload) => {
  const { email, name, password, phone } = payload;

  return APIInstance.post(
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
