import { create } from 'zustand';
import axios from 'axios';

// Define types for the state and actions
interface LoginState {
    loginLoading: boolean;
    loginError: string | null;
    loginSuccess: boolean;
    userRole: number | null;
    loginUser: (email: string, password: string) => Promise<boolean>;
  }
  
  export const useLoginStore = create<LoginState>((set) => ({
    loginLoading: false,
    loginError: null,
    loginSuccess: false,
    userRole: null,
  
    loginUser: async (email, password) => {
      set({ loginLoading: true, loginError: null, loginSuccess: false });
  
      try {
        const response = await axios.post('https://localhost:7107/api/Register/login', { email, password });
        const userInfo = response.data; // Assume userInfo contains the role
        console.log(userInfo);
        
        set({ loginLoading: false, loginSuccess: true, userRole: userInfo.role });
        return true; // Indicate success
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
        set({ loginLoading: false, loginError: errorMessage, loginSuccess: false, userRole: null });
        console.error('Login failed:', errorMessage);
        return false; // Indicate failure
      }
    },
  }));
  