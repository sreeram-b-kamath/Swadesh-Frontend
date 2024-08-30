import React, { useEffect, useState } from "react";
import styles from "./Preference.module.css";
import useRestaurantStore from "../../Store/RestaurantStore";
import { Link } from "react-router-dom";
import tick from "../../assets/tick.svg"
import cross from "../../assets/cross.svg"

function Preference() {
  const { restaurant, loading, error, fetchRestaurant } = useRestaurantStore();
  const [showedSplashscreen, setShowSplashscreen] = useState(true);

  useEffect(() => {
    fetchRestaurant();
    setTimeout(() => {
      setShowSplashscreen(false);
    }, 3000);
  }, [fetchRestaurant]);

  if (loading) return <div>
    <div className={styles.loading_container}>
    <div className={styles.loader}></div>
    </div>
    </div>

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {showedSplashscreen ? (
        <div className={styles.splashscreen}>
          <img src={restaurant?.logo} alt="logo" />
          <h2 className={styles.restuarant_name_splash}>{restaurant?.name}</h2>
        </div>
      ) : (
        <div className={styles.background}>
          <h2 className={styles.restuarant_name}>{restaurant?.name}</h2>
          <div className={styles.prompt}>
            <h4>Have any restrictions?</h4>
          </div>
          <div className={styles.bottombar}>
            <Link to={"/preference-selection"}>
            <button className={styles.yesbutton}>
              <span className="checkmark"><img src={tick} alt="" /></span> Yes
            </button>
            
            </Link>
            <Link to={"/menu"}>
            <button className={styles.nobutton}>
              <span className="checkmark"><img src={cross} alt="" /></span> No
            </button>
            </Link>
            
          </div>
        </div>
      )}
    </>
  );
}

export default Preference;
