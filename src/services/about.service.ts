import { apiClient } from "@/lib/api";
import { serverFetch } from "@/lib/server-fetch";
import { About, CreateAboutRequest, UpdateAboutRequest } from "@/types/about";
import { ApiSuccess } from "@/types/common";

// ── Public (server-side, ISR) ──────────────────────────────────────────────

export async function getAbout(): Promise<About | null> {
  return serverFetch<About>("/api/about", {
    next: { revalidate: 3600 },
  });
}

// ── Admin (client-side, Axios) ─────────────────────────────────────────────

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
