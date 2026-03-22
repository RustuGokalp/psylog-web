export interface Specialization {
  id: number;
  title: string;
  description: string;
  image: string | null;
  displayOrder: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface SpecializationRequest {
  title: string;
  description: string;
  image?: string | null;
  displayOrder?: number | null;
}
