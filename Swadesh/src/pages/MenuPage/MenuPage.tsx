import React, { useEffect, useState } from "react";
import styles from "./MenuPage.module.css";
import menu from "../../assets/Menu.svg";
import vector from "../../assets/Vector.svg";
import translate from "../../assets/translate.svg";
import Menu from "../../components/MenuComponent/Menu";
import outlined from "../../assets/outline-fav.png"
import filled from "../../assets/filled-fav.png"

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

import useMenuStore from "../../Store/useMenuStore";
import { useLocation } from "react-router-dom";

interface MenuItem {
  id: number;
  name: string;
  money: number;
  rating: number;
  categoryId: number;
  categoryName: string;
  primaryImage: string;
  description: string;
}

interface Category {
  categoryId: number;
  categoryName: string;
  menuItems: MenuItem[];
}

const MenuPage = () => {
  const [selectedOption, setSelectedOption] =
    useState<string>("All categories");
  const { categoriesAll, fetchAll, getAllCategoryNames, getCategoryByName } =
    useMenuStore();

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [showFavorites, setShowFavorites] = useState(false); // Track favorite view state
  const [favoritedItems, setFavoritedItems] = useState<MenuItem[]>([]); // Store favorited items
  const location = useLocation();
  const { restaurantId } = location.state || {}; 
  const { filterIds } = location.state || {};
  
  const body2 = {
    restaurantId: restaurantId,
    filterIds: filterIds,
  };

  const getFavoriteItems = () => {
    const favorites = categoriesAll.flatMap((category) =>
      category.menuItems.filter((item) => {
        const isFavorited = sessionStorage.getItem(`isFavorited-${item.id}`);
        return isFavorited === "true";
      })
    );
    console.log(favorites);
    setFavoritedItems(favorites);
  };

  useEffect(() => {
    fetchAll(body2);
    getAllCategoryNames();
    getFavoriteItems(); 
    console.log(body2);
  }, [fetchAll, getAllCategoryNames, filterIds, restaurantId]);

  const handleDropdownChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSelectedOption(value);

    if (value !== "All categories") {
      const category = getCategoryByName(value);
      setSelectedCategory(category ?? null);
    } else {
      setSelectedCategory(null);
    }
  };

  const toggleShowFavorites = () => {
    setShowFavorites(!showFavorites);
    getFavoriteItems(); 
  };

  return (
    <div className={styles.background}>
      <div className={styles.app_bar}>
        <img src={menu} alt="" />
        <div className={styles.middlepart}>
          <img src={vector} alt="" />
          <h2 className={styles.appbar_heading}>THAAL KITCHEN</h2>
        </div>
        <div className={styles.favoriteButtonContainer}>
        <img className={styles.favmode}
        src={showFavorites ? filled : outlined} onClick={toggleShowFavorites}
          alt="Favorite"
/>
      </div>
      </div>

      <div className={styles.dropdowncontainer}>
        <div className={styles.dropdown}>
          <FormControl fullWidth>
            <InputLabel id="dropdown-label">Choose a category</InputLabel>
            <Select
              labelId="dropdown-label"
              value={selectedOption}
              onChange={handleDropdownChange}
              label="Choose an option"
            >
              <MenuItem value="All categories">All categories</MenuItem>
              {categoriesAll.map((category) => (
                <MenuItem
                  key={category.categoryName}
                  value={category.categoryName}
                >
                  {category.categoryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      
      {showFavorites ? (
        <div>
          <h4 className={styles.category_heading}>Favorites</h4>
          <div className={styles.scroll_container_vertical}>
            <div className={styles.scroll_content_vertical}>
              {favoritedItems.map((item) => (
                <Menu
                  key={item.id}
                  id={item.id}
                  primaryImage={item.primaryImage}
                  rating={item.rating}
                  name={item.name}
                  money={item.money}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        </div>
      ) : selectedOption === "All categories" ? (
        categoriesAll.map((category) => (
          <div key={category.categoryId}>
            <h4 className={styles.category_heading}>{category.categoryName}</h4>
            <div className={styles.scroll_container}>
              <div className={styles.scroll_content}>
                {category.menuItems.map((item) => (
                  <Menu
                    key={item.id}
                    id={item.id}
                    primaryImage={item.primaryImage}
                    rating={item.rating}
                    name={item.name}
                    money={item.money}
                    description={item.description}
                  />
                ))}
              </div>
            </div>
          </div>
        ))
      ) : (
        selectedCategory && (
          <div key={selectedCategory.categoryId}>
            <h4 className={styles.category_heading}>
              {selectedCategory.categoryName}
            </h4>
            <div className={styles.scroll_container_vertical}>
              <div className={styles.scroll_content_vertical}>
                {selectedCategory.menuItems.map((item) => (
                  <Menu
                    key={item.id}
                    id={item.id}
                    primaryImage={item.primaryImage}
                    rating={item.rating}
                    name={item.name}
                    money={item.money}
                    description={item.description}
                  />
                ))}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default MenuPage;
