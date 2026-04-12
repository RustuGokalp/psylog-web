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

// Base fields shared by public and admin list shapes
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

// Public list endpoint: GET /api/posts
export interface Post extends PostBase {}

// Admin list endpoint: GET /api/admin/posts
export interface AdminPost extends PostBase {
  updatedAt: string;
  comments: CommentAdminResponse[];
}

// Public + admin detail: GET /api/posts/{slug}, GET /api/admin/posts/{id}
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

export interface CreateCommentRequest {
  author: string;
  email?: string;
  content: string;
}
