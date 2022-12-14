import axios from "axios";

const axiosInstance = (options) => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    ...options,
  });
  return instance;
};

const testAxiosInstance = () => {
  const instance = axios.create();

  return instance;
};

export const APIInstance =
  process.env.NODE_ENV === "development"
    ? testAxiosInstance()
    : axiosInstance();
