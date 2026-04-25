import { apiClient } from "@/lib/api";
import { PagedResponse } from "@/types/common";
import { CommentAdminResponse } from "@/types/post";

export async function getAdminComments(
  page = 0,
  size = 10,
): Promise<PagedResponse<CommentAdminResponse>> {
  const response = await apiClient.get<PagedResponse<CommentAdminResponse>>(
    `/api/admin/comments?page=${page}&size=${size}`,
  );
  return response.data;
}

export async function approveComment(
  id: number
): Promise<CommentAdminResponse> {
  const response = await apiClient.patch<CommentAdminResponse>(
    `/api/admin/comments/${id}/approve`
  );
  return response.data;
}

export async function rejectComment(id: number): Promise<CommentAdminResponse> {
  const response = await apiClient.patch<CommentAdminResponse>(
    `/api/admin/comments/${id}/reject`
  );
  return response.data;
}
