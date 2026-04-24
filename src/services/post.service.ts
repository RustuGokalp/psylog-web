import { apiClient, ApiException } from "@/lib/api";
import { serverFetch } from "@/lib/server-fetch";
import { ApiSuccess } from "@/types/common";
import {
  AdminPost,
  Comment,
  CommentAdminResponse,
  CreateCommentRequest,
  CreatePostRequest,
  PaginatedResponse,
  PatchPostRequest,
  Post,
  PostDetail,
  UpdatePostRequest,
} from "@/types/post";

export async function getPosts(params?: {
  keyword?: string;
  tag?: string;
  page?: number;
  size?: number;
}): Promise<PaginatedResponse<Post>> {
  const searchParams = new URLSearchParams();
  if (params?.keyword) searchParams.set("keyword", params.keyword);
  if (params?.tag) searchParams.set("tag", params.tag);
  if (params?.page !== undefined) searchParams.set("page", String(params.page));
  if (params?.size !== undefined) searchParams.set("size", String(params.size));

  const query = searchParams.toString();
  const path = query ? `/api/posts?${query}` : "/api/posts";

  const data = await serverFetch<PaginatedResponse<Post>>(path, {
    next: { revalidate: 60 },
  });
  return data ?? { content: [], page: 0, size: 10, totalElements: 0, totalPages: 0, last: true };
}

export async function fetchPublicPosts(params?: {
  keyword?: string;
  tag?: string;
  page?: number;
  size?: number;
}): Promise<PaginatedResponse<Post>> {
  const searchParams = new URLSearchParams();
  if (params?.keyword) searchParams.set("keyword", params.keyword);
  if (params?.tag) searchParams.set("tag", params.tag);
  if (params?.page !== undefined) searchParams.set("page", String(params.page));
  if (params?.size !== undefined) searchParams.set("size", String(params.size));

  const query = searchParams.toString();
  const response = await apiClient.get<PaginatedResponse<Post>>(
    query ? `/api/posts?${query}` : "/api/posts"
  );
  return response.data;
}

export async function getPost(slug: string): Promise<PostDetail | null> {
  return serverFetch<PostDetail>(`/api/posts/${encodeURIComponent(slug)}`, {
    next: { revalidate: 60 },
  });
}

export async function fetchPostDetailBySlug(
  slug: string,
): Promise<PostDetail | null> {
  try {
    const response = await apiClient.get<PostDetail>(
      `/api/posts/${encodeURIComponent(slug)}`,
    );
    return response.data;
  } catch (err) {
    if (err instanceof ApiException && err.error.status === 404) return null;
    throw err;
  }
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

export async function getAdminPosts(params?: {
  page?: number;
  size?: number;
}): Promise<PaginatedResponse<AdminPost>> {
  const searchParams = new URLSearchParams();
  if (params?.page !== undefined) searchParams.set("page", String(params.page));
  if (params?.size !== undefined) searchParams.set("size", String(params.size));
  const query = searchParams.toString();
  const response = await apiClient.get<PaginatedResponse<AdminPost>>(
    query ? `/api/admin/posts?${query}` : "/api/admin/posts"
  );
  return response.data;
}

export async function fetchAdminPostById(id: number): Promise<PostDetail> {
  const response = await apiClient.get<PostDetail>(`/api/admin/posts/${id}`);
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

export async function patchPost(
  id: number,
  body: PatchPostRequest
): Promise<PostDetail> {
  const response = await apiClient.patch<PostDetail>(
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
