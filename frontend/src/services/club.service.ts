import api from './api';

export interface Club {
  _id?: string;
  name: string;
  logo: string;
  address: string;
  phone: string;
  email: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
    whatsapp: string;
  };
  updatedAt: string;
}

export const clubService = {
  getClubInfo: async (): Promise<Club> => {
    try {
      const response = await api.get('/club');
      return response.data;
    } catch (error) {
      console.error('Error fetching club info:', error);
      throw error;
    }
  },

  updateClubInfo: async (formData: FormData): Promise<{ message: string; club: Club }> => {
    try {
      const response = await api.put('/club', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      localStorage.removeItem('clubInfo');

      return response.data;
    } catch (error) {
      console.error('Error updating club info:', error);
      throw error;
    }
  }
};