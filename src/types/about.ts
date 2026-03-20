export interface About {
  id: number;
  message: string;
  profileImage: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAboutRequest {
  message: string;
  profileImage?: string | null;
}

export interface UpdateAboutRequest {
  message: string;
  profileImage?: string | null;
}
