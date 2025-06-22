/// <reference types="vite/client" />

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
  };
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const handleResponse = async (response: Response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "An error occurred");
  }

  return data;
};

export const authAPI = {
  signup: async (userData: SignupData): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await handleResponse(response);

    if (data.success && data.data.token) {
      localStorage.setItem("token", data.data.token);
    }

    return data;
  },

  login: async (credentials: LoginData): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await handleResponse(response);

    if (data.success && data.data.token) {
      localStorage.setItem("token", data.data.token);
    }

    return data;
  },

  getProfile: async (): Promise<ProfileResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    return handleResponse(response);
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  isAuthenticated: (): boolean => {
    const token = localStorage.getItem("token");
    return !!token;
  },

  getToken: (): string | null => {
    return localStorage.getItem("token");
  },
};
