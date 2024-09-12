import { create } from 'zustand';
import axios from 'axios';

interface Restaurant {
  id: number;
  uid: string;
  name: string;
  ownerName: string | null;
  logo: string;
  cuisine: string | null;
  contact: string | null;
  active: boolean;
  initialLogin: boolean;
  userId: number;
}

interface RestaurantState {
  restaurant: Restaurant | null;
  loading: boolean;
  error: string | null;

  fetchRestaurant: (restaurantId: string, jwtToken: string | null) => void;
}

const useRestaurantStore = create<RestaurantState>((set) => ({
  restaurant: null,
  loading: false,
  error: null,

  fetchRestaurant: async (restaurantId: string, jwtToken: string | null) => {
    set({ loading: true, error: null });

    try {
      const response = await axios.get<Restaurant>(
        `https://localhost:7107/api/Restaurant/${restaurantId}`);
      set({ restaurant: response.data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useRestaurantStore;
