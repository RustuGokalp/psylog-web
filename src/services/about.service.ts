import { apiClient } from "@/lib/api";
import { About, CreateAboutRequest, UpdateAboutRequest } from "@/types/about";
import { ApiSuccess } from "@/types/common";

export async function getAbout(): Promise<About> {
  const response = await apiClient.get<About>("/api/about");
  return response.data;
}

export async function createAbout(body: CreateAboutRequest): Promise<About> {
  const response = await apiClient.post<About>("/api/admin/about", body);
  return response.data;
}

export async function updateAbout(body: UpdateAboutRequest): Promise<About> {
  const response = await apiClient.put<About>("/api/admin/about", body);
  return response.data;
}

export async function deleteAbout(): Promise<ApiSuccess> {
  const response = await apiClient.delete<ApiSuccess>("/api/admin/about");
  return response.data;
}
