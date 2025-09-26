import api from './api';

export interface Match {
  _id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  location: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  score?: {
    homeTeam: number;
    awayTeam: number;
  };
  createdAt: string;
  updatedAt: string;
}

export const matchService = {
  getAll: async (): Promise<Match[]> => {
    try {
      const response = await api.get('/matches');
      return response.data;
    } catch (error) {
      console.error('Error fetching matches:', error);
      throw error;
    }
  },

  getUpcoming: async (): Promise<Match[]> => {
    try {
      const response = await api.get('/matches/upcoming');
      return response.data;
    } catch (error) {
      console.error('Error fetching upcoming matches:', error);
      throw error;
    }
  },

  getById: async (id: string): Promise<Match> => {
    try {
      const response = await api.get(`/matches/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching match:', error);
      throw error;
    }
  },

  create: async (data: Omit<Match, '_id'>): Promise<Match> => {
    try {
      const response = await api.post('/matches', data);
      return response.data;
    } catch (error) {
      console.error('Error creating match:', error);
      throw error;
    }
  },

  update: async (id: string, data: Partial<Match>): Promise<Match> => {
    try {
      const response = await api.put(`/matches/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating match:', error);
      throw error;
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/matches/${id}`);
    } catch (error) {
      console.error('Error deleting match:', error);
      throw error;
    }
  }
};