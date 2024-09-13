import axios from "axios";
 
export interface MenuItems {
  id: number;
  name: string;
  primaryImage: string;
  money: number;
  menuFilterIds: number[];
  ingredientIds: number[];
  menuCategoryId: number;
  restaurantId: string | number | null;
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
 
export interface Ingredients {
  id: number;
  name: string;
  image: string;
}
 
export interface AddToMenuFormProps {
  onSubmit: (values: typeof initialValues) => void;
  onCancel: () => void;
}
 
export const initialValues = {
  name: "",
  description: "",
  primaryImage: "",
  money: "",
  category: "",
  menuCategoryId: "",
  restrictions: [] as number[],
  menuFilterIds: [] as number[],
  ingredients: [] as number[],
  ingredientIds: [] as number[],
  restaurantId: null as number | null,
};
 
const CategoryURL = "https://localhost:7107/api/Category";
const MenuURL = "https://localhost:7107/api/MenuItems";
const IngredientURL = "https://localhost:7107/api/Ingredients";
const RestrictionURL = "https://localhost:7107/api/Restriction";
 
export const fetchCategories = async (
  restaurantId: number,
  jwtToken: string | null
) => {
  try {
    const response = await axios.get(`${CategoryURL}/${restaurantId}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`, // Add JWT token in the header
      },
    });
 
    return response.data;
  } catch (error) {
    console.error("Error fetching categories", error);
    throw error;
  }
};
 
export const fetchMenuItems = async (
  restaurantId: number,
  jwtToken: string | null
) => {
  try {
    const response = await axios.get(
      `${MenuURL}/ByRestaraunt/${restaurantId}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Add JWT token in the header
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching menu items", error);
    throw error;
  }
};
 
export const fetchRestriction = async (
  restaurantId: number,
  jwtToken: string | null
) => {
  try {
    const response = await axios.get(`${RestrictionURL}/${restaurantId}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`, // Add JWT token in the header
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching restriction", error);
    throw error;
  }
};
 
export const fetchIngredients = async (jwtToken: string | null) => {
  try {
    const response = await axios.get(IngredientURL, {
      headers: {
        Authorization: `Bearer ${jwtToken}`, // Add JWT token in the header
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching ingredients", error);
    throw error;
  }
};
 
// Delete menu items with JWT token
export const deleteMenuItems = async (
  menuItemId: number,
  jwtToken: string | null
) => {
  try {
    const response = await axios.delete(`${MenuURL}/${menuItemId}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`, // Add JWT token in the header
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting menu item", error);
    throw error;
  }
};
 
export const postMenuItem = async (
  values: typeof initialValues,
  restaurantId: number | string,
  jwtToken: string | null
) => {
  try {
    console.log("Menu item entered:");
    const dataToPost = {
      name: values.name,
      primaryImage: values.primaryImage,
      description: values.description,
      money: values.money,
      restaurantId: restaurantId,
      menuCategoryId: values.category,
      menuFilterIds: values.restrictions,
      ingredientIds: values.ingredients,
    };
 
    const response = await axios.post(
      "https://localhost:7107/api/MenuItems/PostToMenuAsync",
      dataToPost,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Add JWT token in the header
        },
      }
    );
 
    console.log("Data posted successfully", response.data);
    return response.data;
  } catch (error) {
    console.error("Error posting data", error);
    throw error;
  }
};