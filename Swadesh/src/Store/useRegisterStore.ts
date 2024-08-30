import { create } from 'zustand';

interface RegistrationState {
  email: string;
  otp: string;
  restaurantName: string;
  password: string;
  logo: string;
  ownerName: string;
  contact: string;
  address: string;
  setEmail: (email: string) => void;
  setOtp: (otp: string) => void;
  setRestaurantName: (name: string) => void;
  setPassword: (password: string) => void;
  setLogo: (logo: string) => void;
  setOwnerName: (ownerName: string) => void;
  setContact: (contact: string) => void;
  setAddress: (address: string) => void;
  registerUser: () => Promise<void>;
}

export const useRegistrationStore = create<RegistrationState>((set, get) => ({
  email: '',
  otp: '',
  restaurantName: '',
  password: '',
  logo: '',
  ownerName: '',
  contact: '',
  address: '',
  setEmail: (email) => set({ email }),
  setOtp: (otp) => set({ otp }),
  setRestaurantName: (name) => set({ restaurantName: name }),
  setPassword: (password) => set({ password }),
  setLogo: (logo) => set({ logo }),
  setOwnerName: (ownerName) => set({ ownerName }),
  setContact: (contact) => set({ contact }),
  setAddress: (address) => set({ address }),
  registerUser: async () => {
    const { email, otp, restaurantName, password, logo, ownerName, contact, address } = get();

    const requestBody = {
      email,
      otp,
      registerDto: {
        restaurantName,
        email,
        password,
        logo,
        ownerName,
        contact,
        address
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
        const errorText = await response.text();
        throw new Error(`Registration failed: ${errorText}`);
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
