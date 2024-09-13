import { create } from "zustand";
import axios from "axios";

export interface LoginState {
    loginLoading: boolean;
    loginError: string | null;
    loginSuccess: boolean;
    userRole: number | null;
    jwtToken: string | null;
    restaurantId: string | number | null;
    loginUser: (email: string, password: string) => Promise<boolean>;
    logoutUser: () => void;
    checkLoginState: () => void;
}

export const useLoginStore = create<LoginState>((set) => ({
    loginLoading: false,
    loginError: null,
    loginSuccess: false,
    userRole: null,
    jwtToken: localStorage.getItem('jwtToken') || null,
    restaurantId: localStorage.getItem('restaurantId') || null,

    loginUser: async (email, password) => {
        set({ loginLoading: true, loginError: null, loginSuccess: false });

        try {
            const response = await axios.post('https://localhost:7107/api/Register/login', { email, password });
            
            const userInfo = response.data;
            console.log('API Response:', response.data);

            // Destructure jwtToken and role from the response data
            const { jwtToken, role } = response.data;

            localStorage.setItem('jwtToken', jwtToken);
            localStorage.setItem('restaurantId', userInfo.restaurantId);
            localStorage.setItem('role', role);
            set({ loginLoading: false, loginSuccess: true, userRole: role, jwtToken: jwtToken, restaurantId: userInfo.restaurantId });
            
            return true;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
            set({ loginLoading: false, loginError: errorMessage, loginSuccess: false, userRole: null, jwtToken: null, restaurantId: null});
            return false;
        }
    },

    logoutUser: () => {
        
    },

    checkLoginState: () => {
        if (localStorage.getItem('jwtToken') && localStorage.getItem('restaurantId')) {
            set({ loginSuccess: true, jwtToken: localStorage.getItem('jwtToken'), restaurantId: localStorage.getItem('restaurantId') });
        }
    },
}));