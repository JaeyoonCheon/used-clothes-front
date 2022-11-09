import { APIInstance } from "../utils/axiosInstance";

export const loginAPI = async (formData) => {
  const { email, password } = formData;

  if (!email || !password) {
    return null;
  }

  try {
    const response = await APIInstance.post(`user/login`, {
      email: email,
      password: password,
    });

    if (response && response.status === 200) {
      sessionStorage.setItem("email", response.email);
      return response.data;
    } else {
      throw new Error(response);
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const registerAPI = async (formData) => {
  const { email, username, password, phonenumber } = formData;

  if (!email || !username || !password || !phonenumber) {
    return null;
  }

  try {
    const response = await APIInstance.post(`user/create`, {
      email,
      name: username,
      password,
      phone: phonenumber,
    });

    if (response !== 500) {
      return response.status;
    } else {
      throw new Error(response);
    }
  } catch (e) {
    console.log(e);
  }
};

export const getUserInfoAPI = async (formData) => {};
