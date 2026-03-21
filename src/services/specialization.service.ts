import { apiClient } from "@/lib/api";
import { Specialization } from "@/types/specialization";

export interface SpecializationRequest {
  title: string;
  description: string;
  image?: string | null;
  displayOrder?: number | null;
}

export interface DeleteSpecializationResponse {
  success: boolean;
  message: string;
}

export async function getSpecializations(): Promise<Specialization[]> {
  const response = await apiClient.get<Specialization[]>("/api/specializations");
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
): Promise<DeleteSpecializationResponse> {
  const response = await apiClient.delete<DeleteSpecializationResponse>(
    `/api/admin/specializations/${id}`,
  );
  return response.data;
}
