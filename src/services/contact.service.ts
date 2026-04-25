import { apiClient } from "@/lib/api";
import { ApiSuccess, PagedResponse } from "@/types/common";
import { ContactMessage, ContactRequest } from "@/types/contact";

export async function sendContact(body: ContactRequest): Promise<ApiSuccess> {
  const response = await apiClient.post<ApiSuccess>("/api/contact", body);
  return response.data;
}

export async function getAdminContacts(
  page = 0,
  size = 10,
): Promise<PagedResponse<ContactMessage>> {
  const response = await apiClient.get<PagedResponse<ContactMessage>>(
    `/api/admin/contact?page=${page}&size=${size}`,
  );
  return response.data;
}
