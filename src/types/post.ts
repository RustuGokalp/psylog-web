export interface Comment {
  id: number;
  author: string;
  content: string;
  createdAt: string;
}

export interface CommentAdminResponse {
  id: number;
  postId: number;
  postTitle: string;
  postSlug: string;
  author: string;
  email: string | null;
  content: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
}

interface PostBase {
  id: number;
  title: string;
  slug: string;
  summary: string;
  coverImage: string | null;
  tags: string[];
  published: boolean;
  publishAt?: string | null;
  createdAt: string;
  readingTime: number | null;
}

export type Post = PostBase

export interface AdminPost extends PostBase {
  updatedAt: string;
  comments: CommentAdminResponse[];
}

export interface PostDetail extends PostBase {
  content: string;
  updatedAt: string;
  publishAt?: string | null;
  comments: Comment[];
}

export interface CreatePostRequest {
  title: string;
  summary: string;
  content: string;
  coverImage?: string | null;
  tags: string[];
  published: boolean;
  publishAt?: string | null;
  readingTime?: number | null;
}

export interface UpdatePostRequest {
  title: string;
  summary: string;
  content: string;
  coverImage?: string | null;
  tags: string[];
  published: boolean;
  publishAt?: string | null;
  readingTime?: number | null;
}

export interface PatchPostRequest {
  title?: string;
  summary?: string;
  content?: string;
  coverImage?: string | null;
  tags?: string[];
  published?: boolean;
  publishAt?: string | null;
  readingTime?: number | null;
}

export interface PaginatedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface CreateCommentRequest {
  author: string;
  email?: string;
  content: string;
}
