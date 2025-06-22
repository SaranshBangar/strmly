const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export interface VideoUploader {
  id: string;
  name: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  fileSize: number;
  uploader: VideoUploader;
  uploadDate: string;
}

export interface VideoUploadData {
  title: string;
  description: string;
  video: File;
}

export interface VideoResponse {
  success: boolean;
  message: string;
  data: {
    video: Video;
  };
}

export interface VideosResponse {
  success: boolean;
  message: string;
  data: {
    videos: Video[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalVideos: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
}

export interface RecommendedVideosResponse {
  success: boolean;
  message: string;
  data: {
    videos: Video[];
    count: number;
  };
}

export interface VideosQueryParams {
  page?: number;
  limit?: number;
}

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const getAuthHeadersForFormData = () => {
  const token = localStorage.getItem("token");
  return {
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

export const videoAPI = {
  uploadVideo: async (videoData: VideoUploadData): Promise<VideoResponse> => {
    const formData = new FormData();
    formData.append("title", videoData.title);
    formData.append("description", videoData.description);
    formData.append("video", videoData.video);

    const response = await fetch(`${API_BASE_URL}/api/upload`, {
      method: "POST",
      headers: getAuthHeadersForFormData(),
      body: formData,
    });

    return handleResponse(response);
  },

  getVideos: async (params: VideosQueryParams = {}): Promise<VideosResponse> => {
    const { page = 1, limit = 10 } = params;
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    const response = await fetch(`${API_BASE_URL}/api/videos?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
    });

    return handleResponse(response);
  },

  getVideoById: async (videoId: string): Promise<VideoResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/${videoId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
    });

    return handleResponse(response);
  },

  getRecommendedVideos: async (): Promise<RecommendedVideosResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/recommended`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
    });

    return handleResponse(response);
  },
};
