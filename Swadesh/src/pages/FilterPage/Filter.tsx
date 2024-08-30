import React from "react";
import styles from "./Filter.module.css";
import FilterChips from "../../components/ChipComponent/ChipComponent";


function Filter() {

  const filters = ['non vegetarian', 'vegan', 'non-alchohol', 'gluten free', 'vegetarian'];


  return (
    <div className={styles.background}>
      <h2 className={styles.foodrestriction}>Select food restrictions</h2>
      <div className={styles.filter_container}>
          <FilterChips filters={filters} />
      </div>
      <div className={styles.bottombar}>
        <button className={styles.yesbutton}>
          <span className="checkmark">✔</span> Apply
        </button>
        
      </div>
    </div>
  );
}

export default Filter;
