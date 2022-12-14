import { APIInstance } from "./axiosInstance";

export const loginAPI = async (payload) => {
  return await APIInstance.post(`user/login`, payload);
};

export const registerAPI = async (payload) => {
  const { email, name, password, phone } = payload;

  return await APIInstance.post(
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
  return await APIInstance.get(`user/logout`);
};

export const deleteUserAPI = async () => {
  return await APIInstance.delete(`user/delete`);
};

export const editUserAPI = async (payload) => {
  return await APIInstance.put(`user/update`, payload);
};

export const checkAPI = async (payload) => {};
