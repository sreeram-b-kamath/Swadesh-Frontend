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
  result: Restaurant[] ;
  statusCode: number;
  errorMessages: string[] | null;
}

interface restrictionResponse
{
  isSuccess: boolean;
  result: string[] ;
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
  fetchRestaurants: () => Promise<void>;
  deleteRestaurant: (id: number) => void;
  updateRestaurantState: (id: number, isActive: boolean) => void;
  searchRestaurants: (searchString: string) => Promise<void>;
  filterRestaurants: (searchArray: string[]) => Promise<void>;
  fetchRestrictions:()=> Promise<void>;
}

// Create the Zustand store
export const useRestaurantStore = create<RestaurantStore>((set, get) => ({
  restaurants: [],
  restrictions:[],
  page: 1,
  hasMore: true,
  loading: false,
  error: null,
  fetchRestaurants: async () => {
    console.log("fetchRestaurants invoked");
    
    const { page, hasMore, loading } = get();
    console.log("values:", page, hasMore, loading);
    if (loading && !hasMore) return;

    set({ loading: true, error: null ,restaurants: [] });

    try {
      console.log("Fetching...");
      const response = await axios.get<ApiResponse>(
        "https://localhost:7107/Admin/GetAllRestaurants",
        {
          params: {
            page,
            pageSize: 10, // Adjust pageSize as needed
          },
        }
      );
      console.log(response.data, "check");
      if (response.data.isSuccess) {
        console.log("success");

        set((state) => ({
          restaurants: [...state.restaurants, ...response.data.result],
          page: state.page + 1,
          hasMore: false,
          loading: false,
        }));
        console.log(response.data);
      } else {
        console.log("fail");
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
  deleteRestaurant: async (id: number) => {
    try {
      // Make the API request to delete the restaurant
      await axios.delete(`https://localhost:7107/Admin/DeleteRestaurant/${id}`);

      // Update the Zustand state to remove the deleted restaurant
      set((state) => ({
        restaurants: state.restaurants.filter(
          (restaurant) => restaurant.id !== id
        ),
      }));

      console.log("Restaurant deleted:", id);
    } catch (error) {
      const axiosError = error as AxiosError;
      set({
        error: axiosError.message || "Failed to delete restaurant",
      });
    }
  },
  updateRestaurantState: async (id: number, isActive: boolean) => {
    try {
      const response = await axios.patch(
        "https://localhost:7107/Admin/ChangeRestaurantState",
        {
          id,
          isActive,
        }
      );

      if (response.status === 200) {
        set((state) => ({
          restaurants: state.restaurants.map((restaurant) =>
            restaurant.id === id ? { ...restaurant, isActive } : restaurant
          ),
        }));
        console.log("Restaurant state updated:", id);
      } else {
        console.error("Failed to update state");
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      set({
        error: axiosError.message || "Failed to update restaurant state",
      });
    }
  },
  searchRestaurants: async (searchString: string) => {
    if(searchString.length > 0) {
    try {
      const encodedSearchString = encodeURIComponent(searchString);

      const response = await axios.get<ApiResponse>(
        `https://localhost:7107/Admin/SearchRestaurant/${encodedSearchString}`
      );
      if (response.data.isSuccess) {
        console.log("search successful ");
        console.log(response.data);
        set((state) => ({
          restaurants: response.data.result,
          page: 1,
          hasMore: false,
          loading: false,
        }));
      } else {
        console.log("search failed ");
        set({ loading: false, hasMore: false,restaurants:[] });
        
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      set({
        error: axiosError.message || "Failed to search restaurants",
        loading: false,
      });
    }
    }
  },
  filterRestaurants: async (filterList: string[]) => {
    try {
      // Convert the filterList to a comma-separated string as required by the API
      // const filterString = filterList.join(',');
  console.log(filterList);
      // Make the API request with the filter string

      const queryString = filterList.map(filter => `filterList=${encodeURIComponent(filter)}`).join('&');
      const url = `https://localhost:7107/Admin/GetAllRestrictionsByFilter?${queryString}`;
      const response = await axios.get<ApiResponse>(url
      );
  
      if (response.data.isSuccess) {
        // Update the state with the filtered restaurants
        set((state) => ({
          restaurants: response.data.result,
          page: 1, // Reset page to 1 for filtered results
          hasMore: false,
          loading: false,
        }));
      } else {
        console.log("here it reaches in else");
        set({ loading: false, hasMore: false ,restaurants: []});
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log("here it reaches");
      set({
        error: axiosError.message || "Failed to filter restaurants",
        loading: false,
      });
    }
  },
  fetchRestrictions: async () => {
    try
    {
    console.log("restrictions fethcing test");
    const response= await axios.get<restrictionResponse>("https://localhost:7107/Admin/GetAllRestrictions");
      if (response.data.isSuccess)
      {
        console.log("restrictions fetched successfully");
        const newRestrictions = response.data.result;
        console.log(newRestrictions,":new restrcitions test")
      set((state) =>({
     restrictions: [...state.restrictions, ...newRestrictions]}));
        
        const updatedState = get();
        // set((state)=>({restrictions:updatedState.restrictions}));
        console.log("hi here",updatedState);
        console.log("Updated restrictions:", updatedState.restrictions);
        console.log(response.data.result);
        
      }
      else{
        console.log("restrictions not fetched")
 
      }
    }
    catch(error)
    {
      const axiosError = error as AxiosError;
      console.log("here it reaches");
      set({
        error: axiosError.message || "Failed to fetch restrictions",
        loading: false,
      });
    }
  },
}));
