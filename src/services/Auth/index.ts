import axios from "axios";

const BASE_API_URL = `${process.env.REACT_APP_API_URL}/auth`;

export const me = async () => {
  try {
    const response = await axios.get(BASE_API_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    });

    return response.data?.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_API_URL}/login`, {
      email,
      password,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(`${BASE_API_URL}/register`, {
      name,
      email,
      password,
      password_confirmation: password,
    });

    return response;
  } catch (error) {
    throw error;
  }
};
