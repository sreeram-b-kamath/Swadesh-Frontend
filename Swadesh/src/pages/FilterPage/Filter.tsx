import React, { useEffect, useState } from "react";
import styles from "./Filter.module.css";
import FilterChips from "../../components/ChipComponent/ChipComponent";
import tick from "../../assets/tick.svg";
import {useLocation, useNavigate } from "react-router-dom";
import useFilterStore from "../../Store/useFilterPreferennce";
import { Typography } from "@mui/material";

function Filter() {
  const { fetchFilters, filters } = useFilterStore();
  const [selectedChips, setSelectedChips] = useState<number[]>([]);
  
  const location = useLocation();
  const { restaurantId } = location.state || {}; 
  const navigate = useNavigate();


  useEffect(() => {
    if (restaurantId) {
      fetchFilters(restaurantId);
    }
  }, [fetchFilters, restaurantId]); 

  const filter = filters;

  const goToMenu = ()=>{
    const requestBody = {
      restaurantId: restaurantId,
      filterIds: selectedChips, // Pass selected chips to the next page
    };
    
    navigate("/menu", { state: requestBody });
  }

  const skip = ()=>{
    setSelectedChips([]);
    const requestBody = {
      restaurantId: restaurantId,
      filterIds: selectedChips, // Pass selected chips to the next page
    };
    navigate("/menu", { state: requestBody });

  }

  return (
    <div className={styles.background}>
      <h2 className={styles.foodrestriction}>Select food restrictions</h2>
      <div className={styles.filter_container}>
        <FilterChips filters={filter} onSelectedChipsChange={setSelectedChips} />
      </div>
      <Typography
        variant="body2"
        color="primary"
        
        sx={{ 
           color:"#25DEEE", 
           marginTop: '10px',
           fontWeight: 'bold',
           cursor: 'pointer',
           fontSize: '16px',
           fontFamily: "Roboto Flex",
           display:"flex",
           justifyContent:"center"
          }}
        onClick={skip}
      >
        skip
      </Typography>
      <div className={styles.bottombar}>
        {/* <Link to={"/menu"}> */}
          <button onClick={goToMenu} className={styles.yesbutton}>
            <span className="checkmark">
              <img src={tick} alt="" />
            </span>{" "}
            Apply
          </button>
        
      </div>
    </div>
  );
}

export default Filter;
