import { apiClient } from "@/lib/api";
import { CommentAdminResponse } from "@/types/post";

export async function getAdminComments(): Promise<CommentAdminResponse[]> {
  const response = await apiClient.get<CommentAdminResponse[]>(
    "/api/admin/comments"
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
