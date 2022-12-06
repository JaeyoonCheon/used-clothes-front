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

export const logoutAPI = async () => {
  return await testAPIInstance.get(`user/logout`);
};

export const deleteUserAPI = async () => {
  return await testAPIInstance.delete(`user/delete`);
};

export const editUserAPI = async (payload) => {
  return await testAPIInstance.put(`user/update`, payload);
};

export const checkAPI = async (payload) => {};
