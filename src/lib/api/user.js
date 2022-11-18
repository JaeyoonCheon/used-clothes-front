import { APIInstance } from "../utils/axiosInstance";

export const loginAPI = async (payload) => {
  const { email, password } = payload;

  try {
    const response = await APIInstance.post(`user/login`, {
      email: email,
      password: password,
    });

    return response.data;
  } catch (e) {
    console.log(e);
    if (e.response && e.response.status === 404) {
      console.log("404 Not Found");
    } else {
      console.log("500 Server error");
    }
  }
};

export const registerAPI = async (payload) => {
  const { email, username, password, phonenumber } = payload;

  try {
    await APIInstance.post(`user/create`, {
      email,
      name: username,
      password,
      phone: phonenumber,
    });
  } catch (e) {
    console.log(e);
    if (e.response && e.response.status === 404) {
      console.log("404 Not Found");
    } else {
      console.log("500 Server error");
    }
  }
};

export const getUserInfoAPI = async (payload) => {};
