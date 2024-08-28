import React from "react";
import styles from "./MenuPage.module.css";
import menu from "../../assets/Menu.svg";
import vector from "../../assets/Vector.svg";
import translate from "../../assets/translate.svg";
import Menu from "../../components/MenuComponent/Menu";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

const MenuPage = () => {
  const defaultOption = "option2";

  const [selectedOption, setSelectedOption] =
    React.useState<string>(defaultOption);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedOption(event.target.value);
  };

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "All Categories" },
    { value: "option3", label: "Option 3" },
  ];

  return (
    <div className={styles.background}>
      <div className={styles.app_bar}>
        <img src={menu} alt="" />

        <div className={styles.middlepart}>
          <img src={vector} alt="" />
          <h2 className={styles.appbar_heading}>THAAL KITCHEN</h2>
        </div>

        <img src={translate} alt="" />
      </div>

      <div className={styles.dropdowncontainer}>
        <div className={styles.dropdown}>
          <FormControl fullWidth>
            <InputLabel id="dropdown-label" className={styles.hiddenLabel}>
              Choose a category
            </InputLabel>
            <Select
              labelId="dropdown-label"
              value={selectedOption}
              onChange={handleChange}
              label="Choose an option"
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      <h4 className={styles.category_heading}>Main course</h4>
       <div className={styles.scroll_container}>
        <div className={styles.scroll_content}>
          {/* Replace these with your actual content */}
          <Menu />
          <Menu />
     
          <Menu />
        </div>
      </div> 

      <h4 className={styles.category_heading}>Appetizizers</h4>
      <div className={styles.scroll_container}>
        <div className={styles.scroll_content}>
          {/* Replace these with your actual content */}
          <Menu />
          <Menu />
          <Menu />
    
          <Menu />
          <Menu />
        </div>
      </div>  

      <h4 className={styles.category_heading}>Deserts</h4>
      <div className={styles.scroll_container}>
        <div className={styles.scroll_content}>
          {/* Replace these with your actual content */}
          <Menu />
          <Menu />
       
          <Menu />
        </div>
      </div>                
      

      
    </div>
  );
};

export default MenuPage;
