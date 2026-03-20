import { apiClient } from "@/lib/api";
import { ApiSuccess } from "@/types/common";
import {
  Comment,
  CommentAdminResponse,
  CreateCommentRequest,
  CreatePostRequest,
  Post,
  PostDetail,
  UpdatePostRequest,
} from "@/types/post";

// ── Public ────────────────────────────────────────────────────────────────────

export async function getPosts(params?: {
  keyword?: string;
  tag?: string;
}): Promise<Post[]> {
  const response = await apiClient.get<Post[]>("/api/posts", { params });
  return response.data;
}

export async function getPost(slug: string): Promise<PostDetail> {
  const response = await apiClient.get<PostDetail>(`/api/posts/${slug}`);
  return response.data;
}

export async function submitComment(
  postId: number,
  body: CreateCommentRequest
): Promise<Comment> {
  const response = await apiClient.post<Comment>(
    `/api/posts/${postId}/comments`,
    body
  );
  return response.data;
}

// ── Admin ─────────────────────────────────────────────────────────────────────

export async function getAdminPosts(): Promise<Post[]> {
  const response = await apiClient.get<Post[]>("/api/admin/posts");
  return response.data;
}

export async function createPost(body: CreatePostRequest): Promise<PostDetail> {
  const response = await apiClient.post<PostDetail>("/api/admin/posts", body);
  return response.data;
}

export async function updatePost(
  id: number,
  body: UpdatePostRequest
): Promise<PostDetail> {
  const response = await apiClient.put<PostDetail>(
    `/api/admin/posts/${id}`,
    body
  );
  return response.data;
}

export async function deletePost(id: number): Promise<ApiSuccess> {
  const response = await apiClient.delete<ApiSuccess>(
    `/api/admin/posts/${id}`
  );
  return response.data;
}

// ── Admin Comments ────────────────────────────────────────────────────────────

export async function getPendingComments(): Promise<CommentAdminResponse[]> {
  const response = await apiClient.get<CommentAdminResponse[]>(
    "/api/admin/comments"
  );
  return response.data;
}

export async function getPostComments(
  postId: number
): Promise<CommentAdminResponse[]> {
  const response = await apiClient.get<CommentAdminResponse[]>(
    `/api/admin/posts/${postId}/comments`
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

export async function rejectComment(
  id: number
): Promise<CommentAdminResponse> {
  const response = await apiClient.patch<CommentAdminResponse>(
    `/api/admin/comments/${id}/reject`
  );
  return response.data;
}

export async function deleteComment(id: number): Promise<ApiSuccess> {
  const response = await apiClient.delete<ApiSuccess>(
    `/api/admin/comments/${id}`
  );
  return response.data;
}
