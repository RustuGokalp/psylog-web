export interface About {
  id: number;
  message: string;
  profileImage: string | null;
  education: string[];
  workingAreas: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateAboutRequest {
  message: string;
  profileImage?: string | null;
  education?: string[];
  workingAreas?: string[];
}

export interface UpdateAboutRequest {
  message: string;
  profileImage?: string | null;
  education?: string[];
  workingAreas?: string[];
}
