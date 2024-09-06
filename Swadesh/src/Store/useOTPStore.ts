

import {create} from 'zustand';

import axios from 'axios';

interface AuthState {
  email: string;
  setEmail: (email: string) => void;
  signUpWithEmail: (email: string) => Promise<void>;
}

export const useOTPStore = create<AuthState>((set) => ({
  email: '',
  setEmail: (email: string) => set({ email }),
  signUpWithEmail: async (email: string) => {
    try {
      // Replace with your API endpoint
      const response = await axios.post('https://localhost:7107/api/Register/send-otp', { email });
      console.log('Sign-up successful:', response.data);
      set({ email });
    } catch (error) {
      console.error('Error signing up:', error);
    }
  },
}));
