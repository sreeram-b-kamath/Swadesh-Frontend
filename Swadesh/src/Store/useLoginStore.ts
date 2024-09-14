import { create } from 'zustand';
import axios from 'axios';

interface LoginState {
  loginLoading: boolean;
  loginError: string | null;
  loginSuccess: boolean;
  userRole: number | null;
  jwtToken: string | null;
  restaurantId: string | number | null;
  otp: string;
  setOtp: (otp: string) => void;
  loginUser: (email: string, password: string) => Promise<boolean>;
  verifyOtpAndCompleteLogin: (otp: string, email: string) => Promise<boolean>;
  logoutUser: () => void;
  checkLoginState: () => void;
}

export const useLoginStore = create<LoginState>((set, get) => ({
  loginLoading: false,
  loginError: null,
  loginSuccess: false,
  userRole: null,
  jwtToken: localStorage.getItem('jwtToken') || null,
  restaurantId: localStorage.getItem('restaurantId') || null,
  otp: '',

  setOtp: (otp: string) => set({ otp }),

  loginUser: async (email, password) => {
    set({ loginLoading: true, loginError: null, loginSuccess: false });

    try {
      // Call API to initiate login with email and password
      const response = await axios.post('https://localhost:7107/api/Register/initiate-login', { email, password });

      console.log('Login API Response:', response.data);

      // Save the email and OTP for OTP verification
      const { otp } = response.data;
      localStorage.setItem('email', email);
      set({ otp });

      // Redirect handled in component upon success
      return true;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      set({ loginLoading: false, loginError: errorMessage, loginSuccess: false });
      return false;
    }
  },

  verifyOtpAndCompleteLogin: async (otp: string, email: string) => {
    if (!email || !otp) {
      set({ loginError: 'Email or OTP not set' });
      return false;
    }

    set({ loginLoading: true, loginError: null });

    try {
      // Call the API to verify OTP and complete login
      const response = await axios.post('https://localhost:7107/api/Register/verify-login-otp', { email, otp });

      const userInfo = response.data;
      console.log('Verify OTP API Response:', response.data);

      const { jwtToken, role, restaurantId } = userInfo;

      // Store JWT and user info in localStorage
      localStorage.setItem('jwtToken', jwtToken);
      localStorage.setItem('role', role);
      localStorage.setItem('restaurantId', restaurantId);

      // Update the store state
      set({
        loginLoading: false,
        loginSuccess: true,
        userRole: role,
        jwtToken: jwtToken,
        restaurantId: restaurantId,
      });

      return true;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to verify OTP';
      set({ loginLoading: false, loginError: errorMessage, loginSuccess: false });
      return false;
    }
  },

  logoutUser: () => {
    // Clear localStorage on logout
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('role');
    localStorage.removeItem('restaurantId');
    localStorage.removeItem('email');
    set({ jwtToken: null, userRole: null, restaurantId: null, otp: '' });
  },

  checkLoginState: () => {
    const jwtToken = localStorage.getItem('jwtToken');
    const restaurantId = localStorage.getItem('restaurantId');
    const role = localStorage.getItem('role');

    if (jwtToken && restaurantId && role) {
      set({ loginSuccess: true, jwtToken, restaurantId, userRole: Number(role) });
    }
  },
}));
