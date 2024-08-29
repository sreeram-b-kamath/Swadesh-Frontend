// useLoginStore.ts
import { create } from 'zustand';
import axios from 'axios'; // or any other HTTP library you prefer

// Define types for the state and actions
interface LoginState {
  loginLoading: boolean;
  loginError: string | null;
  loginSuccess: boolean;
  loginUser: (email: string, password: string) => Promise<void>;
}

export const useLoginStore = create<LoginState>((set) => ({
  loginLoading: false,
  loginError: null,
  loginSuccess: false,

  loginUser: async (email, password) => {
    set({ loginLoading: true, loginError: null, loginSuccess: false });

    try {
      const response = await axios.post('https://localhost:7107/api/Register/login', { email, password });
      set({ loginLoading: false, loginSuccess: true });
      // Handle successful login response here, like storing the token or user info
      console.log('Login successful:', response.data);
    } catch (error : any) {
      set({ loginLoading: false, loginError: error.message, loginSuccess: false });
      console.error('Login failed:', error.message);
    }
  },
}));
