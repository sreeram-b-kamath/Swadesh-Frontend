import { create } from 'zustand';

interface Filter {
  id: number;
  name: string;
}

interface FilterStore {
  filters: Filter[];
  fetchFilters: (restaurantId: number, jwtToken: string | null) => Promise<void>;
}

const useFilterStore = create<FilterStore>((set) => ({
  filters: [],
  fetchFilters: async (restaurantId: number, jwtToken: string | null) => {
    try {
      const response = await fetch(
        `https://localhost:7107/api/Restaurant/Filters/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data: Filter[] = await response.json();
      set({ filters: data });
    } catch (error) {
      console.error('Failed to fetch filters:', error);
    }
  },
}));

export default useFilterStore;
