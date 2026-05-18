import { apiClient } from "@/lib/api";
import { serverFetch } from "@/lib/server-fetch";
import {
  ContactInfo,
  CreateContactInfoRequest,
  UpdateContactInfoRequest,
} from "@/types/contact-info";
import { ApiSuccess } from "@/types/common";

// ── Public (server-side, ISR) ──────────────────────────────────────────────

export async function getContactInfo(): Promise<ContactInfo | null> {
  return serverFetch<ContactInfo>("/api/contact-info", {
    next: { revalidate: 0 },
  });
}

// ── Admin (client-side, Axios) ─────────────────────────────────────────────

export async function getContactInfoAdmin(): Promise<ContactInfo | null> {
  try {
    const response = await apiClient.get<ContactInfo>("/api/contact-info");
    return response.data;
  } catch {
    return null;
  }
}

export async function createContactInfo(
  body: CreateContactInfoRequest,
): Promise<ContactInfo> {
  const response = await apiClient.post<ContactInfo>(
    "/api/admin/contact-info",
    body,
  );
  return response.data;
}

export async function updateContactInfo(
  body: UpdateContactInfoRequest,
): Promise<ContactInfo> {
  const response = await apiClient.put<ContactInfo>(
    "/api/admin/contact-info",
    body,
  );
  return response.data;
}

export async function deleteContactInfo(): Promise<ApiSuccess> {
  const response = await apiClient.delete<ApiSuccess>("/api/admin/contact-info");
  return response.data;
}
