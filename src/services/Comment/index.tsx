import axios from "axios";
import Comment from "../../interfaces/Comment";

const BASE_API_URL = `${process.env.REACT_APP_API_URL}/comments`;
const token = localStorage.getItem("accessToken");

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export const createComment = async (
  comment: Omit<Comment, "id" | "created_at" | "updated_at">
) => {
  try {
    const response = await axiosInstance.post("", comment);

    return response?.data?.data;
  } catch (error: any) {
    throw error;
  }
};

export const deleteComment = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/${id}`);

    return response?.data?.data;
  } catch (error: any) {
    throw error;
  }
};
