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

export interface Post {
  id: number;
  title: string;
  slug: string;
  summary: string;
  coverImage: string | null;
  tags: string[];
  published: boolean;
  createdAt: string;
}

export interface PostDetail extends Post {
  content: string;
  updatedAt: string;
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
}

export interface UpdatePostRequest {
  title: string;
  summary: string;
  content: string;
  coverImage?: string | null;
  tags: string[];
  published: boolean;
  publishAt?: string | null;
}

export interface CreateCommentRequest {
  author: string;
  email?: string;
  content: string;
}
