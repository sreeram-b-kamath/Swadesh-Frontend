import create from 'zustand';

interface RegistrationState {
  email: string;
  otp: string;
  restaurantName: string;
  password: string;
  logo: string;
  setEmail: (email: string) => void;
  setOtp: (otp: string) => void;
  setRestaurantName: (name: string) => void;
  setPassword: (password: string) => void;
  setLogo: (logo: string) => void;
  registerUser: () => Promise<void>;
}

export const useRegistrationStore = create<RegistrationState>((set, get) => ({
  email: '',
  otp: '',
  restaurantName: '',
  password: '',
  logo: '',
  setEmail: (email) => set({ email }),
  setOtp: (otp) => set({ otp }),
  setRestaurantName: (name) => set({ restaurantName: name }),
  setPassword: (password) => set({ password }),
  setLogo: (logo) => set({ logo }),
  registerUser: async () => {
    const { email, otp, restaurantName, password, logo } = get();

    const requestBody = {
      email,
      otp,
      registerDto: {
        restaurantName,
        email,
        password,
        logo,
      },
    };

    try {
      const response = await fetch('https://localhost:7107/api/Register/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      // Handle successful registration
      console.log('Registration successful:', data);
    } catch (error) {
      // Handle errors
      console.error('Error during registration:', error);
    }
  },
}));


