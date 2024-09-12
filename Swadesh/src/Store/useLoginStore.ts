import { create } from "zustand";
import axios from "axios";

export interface LoginState {
    loginLoading: boolean;
    loginError: string | null;
    loginSuccess: boolean;
    userRole: number | null;
    jwtToken: string | null;
    loginUser: (email: string, password: string) => Promise<boolean>;
    logoutUser: () => void;
    restaurantId: number | null;
}

export const useLoginStore = create<LoginState>((set) => ({
    loginLoading: false,
    loginError: null,
    loginSuccess: false,
    userRole: null,
    jwtToken: null,
    restaurantId: null,

    loginUser: async (email, password) => {
        set({ loginLoading: true, loginError: null, loginSuccess: false });

        try {
            const response = await axios.post('https://localhost:7107/api/Register/login', { email, password });
            
            // Log the API response to inspect its structure
            console.log('API Response:', response.data);

            // Destructure jwtToken and role from the response data
            const { jwtToken, role } = response.data;

            set({ loginLoading: false, loginSuccess: true, userRole: role, jwtToken: jwtToken, restaurantId: userInfo.restaurantId });
            
            return true;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
            set({ loginLoading: false, loginError: errorMessage, loginSuccess: false, userRole: null, jwtToken: null, restaurantId: null});
            return false;
        }
    },

    logoutUser: () => {
        set({ loginSuccess: false, userRole: null, jwtToken: null });
    },
}));
