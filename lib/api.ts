import axios, { AxiosError } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const errorMessage =
      (error.response?.data as { message: string })?.message || error.message;

    // console.log("axios error >>>", error);
    // console.log("axios error >>>", errorMessage);

    return Promise.reject({ message: errorMessage });
  }
);
