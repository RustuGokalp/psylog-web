import { apiClient } from "@/lib/api";
import { AuthUser, LoginRequest } from "@/types/auth";

export async function login(body: LoginRequest): Promise<AuthUser> {
  const response = await apiClient.post<AuthUser>("/api/auth/login", body);
  return response.data;
}

export async function logout(): Promise<void> {
  await apiClient.post("/api/auth/logout");
}

export async function validateAuth(): Promise<AuthUser> {
  const response = await apiClient.get<AuthUser>("/api/auth/validate");
  return response.data;
}
