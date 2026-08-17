import { ApiError } from "@/types/common";
import axios, { AxiosError } from "axios";

export class ApiException extends Error {
  constructor(public readonly error: ApiError) {
    super(error.message);
    this.name = "ApiException";
  }
}

const TOO_MANY_REQUESTS = 429;

const TOO_MANY_REQUESTS_FALLBACK =
  "Çok fazla istek gönderdiniz. Lütfen bir süre sonra tekrar deneyin.";

/**
 * Kullanıcıya gösterilecek hata mesajını belirler.
 * Backend'in Türkçe `message` alanı varsa o kullanılır; yoksa hız sınırı (429)
 * için anlaşılır bir uyarıya, diğer durumlarda verilen genel mesaja düşer.
 */
export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof ApiException) {
    const message = error.error.message?.trim();
    if (message) return message;
    if (error.error.status === TOO_MANY_REQUESTS) {
      return TOO_MANY_REQUESTS_FALLBACK;
    }
  }
  return fallback;
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
