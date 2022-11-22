import axios from "axios";

const axiosInstance = (options) => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    ...options,
  });
  return instance;
};

export const APIInstance = axiosInstance();
