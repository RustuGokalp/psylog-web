import { apiClient } from "@/lib/api";
import { serverFetch } from "@/lib/server-fetch";
import { Specialization, SpecializationRequest } from "@/types/specialization";
import { ApiSuccess } from "@/types/common";

export async function getSpecializations(): Promise<Specialization[]> {
  const data = await serverFetch<Specialization[]>("/api/specializations", {
    next: { revalidate: 300 },
  });
  return data ?? [];
}

export async function getSpecializationBySlug(
  slug: string,
): Promise<Specialization | null> {
  return serverFetch<Specialization>(`/api/specializations/${slug}`, {
    next: { revalidate: 300 },
  });
}

export async function fetchSpecializationBySlug(
  slug: string,
): Promise<Specialization> {
  const response = await apiClient.get<Specialization>(`/api/specializations/${slug}`);
  return response.data;
}

export async function getAdminSpecializations(): Promise<Specialization[]> {
  const response = await apiClient.get<Specialization[]>("/api/admin/specializations");
  return response.data;
}

export async function createSpecialization(
  data: SpecializationRequest,
): Promise<Specialization> {
  const response = await apiClient.post<Specialization>("/api/admin/specializations", data);
  return response.data;
}

export async function updateSpecialization(
  id: number,
  data: SpecializationRequest,
): Promise<Specialization> {
  const response = await apiClient.put<Specialization>(`/api/admin/specializations/${id}`, data);
  return response.data;
}

export async function deleteSpecialization(
  id: number,
): Promise<ApiSuccess> {
  const response = await apiClient.delete<ApiSuccess>(
    `/api/admin/specializations/${id}`,
  );
  return response.data;
}
