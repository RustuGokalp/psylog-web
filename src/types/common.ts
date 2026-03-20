export interface ApiError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}

export interface ApiSuccess {
  success: boolean;
  message: string;
}
