"use client";
import { GetUserToken } from "@/libs/repo/auth";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URI || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});


axiosClient.interceptors.request.use(
  function (config) {
    const token = GetUserToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
