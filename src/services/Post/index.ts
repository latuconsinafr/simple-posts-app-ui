import axios from "axios";
import Post from "../../interfaces/Post";

const BASE_API_URL = `${process.env.REACT_APP_API_URL}/posts`;
const token = localStorage.getItem("accessToken");

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export const createPost = async (
  post: Omit<Post, "id" | "created_at" | "updated_at">
) => {
  try {
    const response = await axiosInstance.post("", post);

    return response?.data?.data;
  } catch (error: any) {
    throw error;
  }
};

export const fetchPosts = async () => {
  try {
    const response = await axiosInstance.get("");

    return response?.data?.data;
  } catch (error: any) {
    throw error;
  }
};

export const fetchPost = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/${id}`);

    return response?.data?.data;
  } catch (error: any) {
    throw error;
  }
};

export const updatePost = async (
  id: number,
  post: Omit<Post, "id" | "created_at" | "updated_at">
) => {
  try {
    const response = await axiosInstance.put(`/${id}`, post);

    return response?.data?.data;
  } catch (error: any) {
    throw error;
  }
};

export const deletePost = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/${id}`);

    return response?.data?.data;
  } catch (error: any) {
    throw error;
  }
};
