import { create } from "zustand";
import axios, { AxiosError } from "axios";

// Define types for your state and API response
interface Restaurant {
  id: number;
  name: string;
  email: string;
  logo: string;
  isActive: boolean;
}

interface ApiResponse {
  isSuccess: boolean;
  result: Restaurant[];
  statusCode: number;
  errorMessages: string[] | null;
}

interface restrictionResponse {
  isSuccess: boolean;
  result: string[];
  statusCode: number;
  errorMessages: string[] | null;
}

interface RestaurantStore {
  restaurants: Restaurant[];
  page: number;
  hasMore: boolean;
  loading: boolean;
  error: string | null;
  restrictions: string[];
  fetchRestaurants: (jwtToken: string | null) => Promise<void>;
  deleteRestaurant: (id: number, jwtToken: string | null) => void;
  updateRestaurantState: (id: number, isActive: boolean, jwtToken: string | null) => void;
  searchRestaurants: (searchString: string, jwtToken: string | null) => Promise<void>;
  filterRestaurants: (searchArray: string[], jwtToken: string | null) => Promise<void>;
  fetchRestrictions: (jwtToken: string | null) => Promise<void>;
}

// Create the Zustand store
export const useRestaurantStore = create<RestaurantStore>((set, get) => ({
  restaurants: [],
  restrictions: [],
  page: 1,
  hasMore: true,
  loading: false,
  error: null,
  fetchRestaurants: async (jwtToken: string | null) => {
    if (!jwtToken) return;
    
    const { page, hasMore, loading } = get();
    if (loading && !hasMore) return;

    set({ loading: true, error: null, restaurants: [] });

    try {
      const response = await axios.get<ApiResponse>(
        "https://localhost:7107/Admin/GetAllRestaurants",
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          params: {
            page,
            pageSize: 10,
          },
        }
      );

      if (response.data.isSuccess) {
        set((state) => ({
          restaurants: [...state.restaurants, ...response.data.result],
          page: state.page + 1,
          hasMore: false,
          loading: false,
        }));
      } else {
        set({ loading: false, hasMore: false });
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      set({
        error: axiosError.message || "An unknown error occurred",
        loading: false,
      });
    }
  },
  deleteRestaurant: async (id: number, jwtToken: string | null) => {
    if (!jwtToken) return;

    try {
      await axios.delete(`https://localhost:7107/Admin/DeleteRestaurant/${id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      set((state) => ({
        restaurants: state.restaurants.filter(
          (restaurant) => restaurant.id !== id
        ),
      }));

    } catch (error) {
      const axiosError = error as AxiosError;
      set({
        error: axiosError.message || "Failed to delete restaurant",
      });
    }
  },
  updateRestaurantState: async (id: number, isActive: boolean, jwtToken: string | null) => {
    if (!jwtToken) return;

    try {
      const response = await axios.patch(
        "https://localhost:7107/Admin/ChangeRestaurantState",
        { id, isActive },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (response.status === 200) {
        set((state) => ({
          restaurants: state.restaurants.map((restaurant) =>
            restaurant.id === id ? { ...restaurant, isActive } : restaurant
          ),
        }));
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      set({
        error: axiosError.message || "Failed to update restaurant state",
      });
    }
  },
  searchRestaurants: async (searchString: string, jwtToken: string | null) => {
    if (!jwtToken || searchString.length === 0) return;

    try {
      const encodedSearchString = encodeURIComponent(searchString);

      const response = await axios.get<ApiResponse>(
        `https://localhost:7107/Admin/SearchRestaurant/${encodedSearchString}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (response.data.isSuccess) {
        set({
          restaurants: response.data.result,
          page: 1,
          hasMore: false,
          loading: false,
        });
      } else {
        set({ loading: false, hasMore: false, restaurants: [] });
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      set({
        error: axiosError.message || "Failed to search restaurants",
        loading: false,
      });
    }
  },
  filterRestaurants: async (filterList: string[], jwtToken: string | null) => {
    if (!jwtToken) return;

    try {
      const queryString = filterList
        .map((filter) => `filterList=${encodeURIComponent(filter)}`)
        .join("&");

      const url = `https://localhost:7107/Admin/GetAllRestrictionsByFilter?${queryString}`;

      const response = await axios.get<ApiResponse>(url, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (response.data.isSuccess) {
        set({
          restaurants: response.data.result,
          page: 1,
          hasMore: false,
          loading: false,
        });
      } else {
        set({ loading: false, hasMore: false, restaurants: [] });
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      set({
        error: axiosError.message || "Failed to filter restaurants",
        loading: false,
      });
    }
  },
  fetchRestrictions: async (jwtToken: string | null) => {
    if (!jwtToken) return;

    try {
      const response = await axios.get<restrictionResponse>(
        "https://localhost:7107/Admin/GetAllRestrictions",
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (response.data.isSuccess) {
        const newRestrictions = response.data.result;
        set((state) => ({
          restrictions: [...state.restrictions, ...newRestrictions],
        }));
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      set({
        error: axiosError.message || "Failed to fetch restrictions",
        loading: false,
      });
    }
  },
}));
