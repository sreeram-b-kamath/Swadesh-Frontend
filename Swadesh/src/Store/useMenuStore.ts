import {create} from 'zustand';

interface MenuItem {
  id: number;
  name: string;
  money: number;
  rating: number;
  categoryId: number;
  categoryName: string;
  primaryImage: string;
  description: string;
  ingredients: { name: string; image: string }[];
}

interface Category {
  categoryId: number;
  categoryName: string;
  menuItems: MenuItem[];
}

interface MenuStore {
  categoriesAll: Category[];
  fetchAll: (body: Record<string, any>) => Promise<void>;
  getCategoryByName: (name: string) => Category | undefined;
  getAllCategoryNames: () => string[];
}

const useMenuStore = create<MenuStore>((set, get) => ({
  categoriesAll: [],
  
  fetchAll: async (body: Record<string, any>) => {
    try {
      const response = await fetch('https://localhost:7107/api/Restaurant/Filter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data: Category[] = await response.json();
      set({ categoriesAll: data });
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  },

  getCategoryByName: (name: string) =>
    get().categoriesAll.find((category) => category.categoryName === name),

  getAllCategoryNames: () => {
    const categories = get().categoriesAll;
    return categories.map(cat => cat.categoryName);
  },
}));

export default useMenuStore;
