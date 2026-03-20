import { ApiError } from "@/types/common";
import axios, { AxiosError } from "axios";

export class ApiException extends Error {
  constructor(public readonly error: ApiError) {
    super(error.message);
    this.name = "ApiException";
  }
}

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    const data = error.response?.data;

    if (data && typeof data === "object" && "message" in data) {
      throw new ApiException(data as ApiError);
    }

    throw new ApiException({
      timestamp: new Date().toISOString(),
      status: error.response?.status ?? 0,
      error: error.response?.statusText ?? "Unknown Error",
      message: error.message ?? "An unexpected error occurred",
      path: error.config?.url ?? "",
    });
  }
);
