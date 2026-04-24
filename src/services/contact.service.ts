import { apiClient } from "@/lib/api";
import { ApiSuccess } from "@/types/common";
import { ContactMessage, ContactRequest } from "@/types/contact";

export async function sendContact(body: ContactRequest): Promise<ApiSuccess> {
  const response = await apiClient.post<ApiSuccess>("/api/contact", body);
  return response.data;
}

export async function getAdminContacts(): Promise<ContactMessage[]> {
  const response = await apiClient.get<ContactMessage[]>("/api/admin/contact");
  return response.data;
}
