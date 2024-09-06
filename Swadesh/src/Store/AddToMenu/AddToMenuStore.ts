import axios from "axios";

export interface MenuItems {
  id: number;
  name: string;
  primaryImage: string;
  money: number;
  menuFilterIds: number[];
  ingredientIds: number[];
  menuCategoryId: number;
  restarauntId: number;
  image: string | null;
}

export interface Category {
  id: number;
  name: string;
}

export interface Restriction {
  id: number;
  name: string;
}

export interface AddToMenuFormProps {
  onSubmit: (values: typeof initialValues) => void;
  onCancel: () => void;
}
export const initialValues = {
  name: "",
  description: "",
  primaryImage: "",
  money: 0,
  category: "",
  menuCategoryId: "",
  restrictions: [] as number[],
  menuFilterIds: [] as number[],
  ingredients: [] as number[],
  ingredientIds: [] as number[],
  restaurantId: 1,
};

export interface Ingredients {
  id: number;
  name: string;
  image: string;
}

const CategoryURL = "https://localhost:7107/api/Category";

const MenuURL = "https://localhost:7107/api/MenuItems";

const IngredientURL = "https://localhost:7107/api/Ingredients";

const RestrictionURL = "https://localhost:7107/api/Restriction";

export const fetchCategories = async (restarauntId: number) => {
  try {
    const response = await axios.get(`${CategoryURL}/${restarauntId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories", error);
    throw error;
  }
};

export const fetchRestriction = async (restarauntId: number) => {
  try {
    const response = await axios.get(`${RestrictionURL}/${restarauntId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching restriction", error);
    throw error;
  }
};

export const fetchMenuItems = async (restarauntId: number) => {
  try {
    const response = await axios.get(
      `${MenuURL}/ByRestaraunt/${restarauntId} `
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching menu items", error);
    throw error;
  }
};

export const fetchIngredients = async () => {
  try {
    const response = await axios.get(`${IngredientURL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching ingredients", error);
    throw error;
  }
};

export const deleteMenuItems = async (menuItemId: number) => {
  try {
    const response = await axios.delete(`${MenuURL}/${menuItemId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting menu item", error);
    throw error;
  }
};
