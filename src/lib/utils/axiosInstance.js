import axios from "axios";

const axiosInstance = (baseURL, options) => {
  const instance = axios.create({
    baseURL,
    ...options,
  });
  return instance;
};

export const APIInstance = axiosInstance(process.env.REACT_APP_BASE_URL);
