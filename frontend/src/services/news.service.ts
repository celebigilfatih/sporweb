import api from './api';

export interface News {
  _id?: string;
  title: string;
  content: string;
  image?: string;
  category: 'Genel' | 'Turnuva' | 'Eğitim' | 'Başarı' | 'Diğer';
  author: string;
  isPublished: boolean;
  publishDate: string;
  tags: string[];
}

export const newsService = {
  getAll: async (): Promise<News[]> => {
    try {
      const response = await api.get('/news');
      return response.data;
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { status?: number; statusText?: string; data?: unknown } };
        if (axiosError.response) {
          throw new Error(`Failed to fetch news: ${axiosError.response.status} ${axiosError.response.statusText}`);
        }
      }
      throw new Error('Failed to fetch news');
    }
  },

  getById: async (id: string): Promise<News> => {
    try {
      const response = await api.get(`/news/${id}`);
      return response.data;
    } catch (error: unknown) {
      console.error('Error in newsService.getById:', error);
      throw error;
    }
  },

  create: async (data: Omit<News, '_id'>): Promise<News> => {
    try {
      const response = await api.post('/news', data);
      return response.data;
    } catch (error: unknown) {
      console.error('Error in newsService.create:', error);
      throw error;
    }
  },

  update: async (id: string, data: Partial<News>): Promise<News> => {
    try {
      const response = await api.put(`/news/${id}`, data);
      return response.data;
    } catch (error: unknown) {
      console.error('Error in newsService.update:', error);
      throw error;
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/news/${id}`);
    } catch (error: unknown) {
      console.error('Error in newsService.delete:', error);
      throw error;
    }
  }
};

export const getNews = async (): Promise<News[]> => {
  try {
    const response = await api.get('/news');
    return response.data;
  } catch (error) {
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { status?: number; statusText?: string; data?: unknown } };
      if (axiosError.response) {
        throw new Error(`Failed to fetch news: ${axiosError.response.status} ${axiosError.response.statusText}`);
      }
    }
    throw new Error('Failed to fetch news');
  }
};