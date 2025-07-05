export interface User {
  id: number;
  name: string;
  created_at: Date | null;
  updated_at: Date | null;
  _count?: {
    tasks: number;
  };
}

export interface CreateUserData {
  name: string;
}

export interface UpdateUserData {
  name: string;
}

export interface ValidationError {
  field: string;
  message: string;
}