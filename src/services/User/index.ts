import axios from "axios";
import User from "../../interfaces/User";

const BASE_API_URL = `${process.env.REACT_APP_API_URL}/users`;
const token = localStorage.getItem("accessToken");

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export const createUser = async (
  user: Pick<User, "name" | "email" | "roles"> & { password: string }
) => {
  try {
    const response = await axiosInstance.post("", user);

    return response?.data?.data;
  } catch (error: any) {
    throw error;
  }
};

export const fetchUsers = async () => {
  try {
    const response = await axiosInstance.get("");

    return response?.data?.data;
  } catch (error: any) {
    throw error;
  }
};

export const fetchUser = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/${id}`);

    return response?.data?.data;
  } catch (error: any) {
    throw error;
  }
};

export const updateUser = async (
  id: number,
  user: Pick<User, "name" | "email" | "roles">
) => {
  try {
    const response = await axiosInstance.put(`/${id}`, user);

    return response?.data?.data;
  } catch (error: any) {
    throw error;
  }
};

export const deleteUser = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/${id}`);

    return response?.data?.data;
  } catch (error: any) {
    throw error;
  }
};
