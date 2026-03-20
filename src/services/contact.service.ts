import { apiClient } from "@/lib/api";
import { ApiSuccess } from "@/types/common";
import { ContactRequest } from "@/types/contact";

export async function sendContact(body: ContactRequest): Promise<ApiSuccess> {
  const response = await apiClient.post<ApiSuccess>("/api/contact", body);
  return response.data;
}
