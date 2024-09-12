import React, { useEffect, useState } from "react";
import styles from "./Preference.module.css";
import useRestaurantStore from "../../Store/RestaurantStore";
import { Link, useNavigate, useParams } from "react-router-dom";
import tick from "../../assets/tick.svg";
import cross from "../../assets/cross.svg";

function Preference() {
  const { restaurant, loading, error, fetchRestaurant } = useRestaurantStore();
  const [showedSplashscreen, setShowSplashscreen] = useState(true);
  const navigate = useNavigate();
  const { restaurantId } = useParams();

  useEffect(() => {
    if(restaurantId){
      fetchRestaurant(restaurantId);
    }
    setTimeout(() => {
      setShowSplashscreen(false);
    }, 3000);
  }, [fetchRestaurant,restaurantId]);

  if (loading)
    return (
      <div>
        <div className={styles.loading_container}>
          <div className={styles.loader}></div>
        </div>
      </div>
    );

  if (error) return <div>Error: {error}</div>;

  const goToPreference = (
    event: React.MouseEvent<HTMLButtonElement>,
    restaurantId: number | undefined,
    isPrefence:boolean
  ) => {
    const requestBody = {
      restaurantId: restaurantId,
      filterIds: [],
    };
    if(isPrefence){
      console.log(restaurant?.id);
      
      navigate("/preference-selection", { state: requestBody });

    }
    else{
      navigate("/menu", { state: requestBody });
    }
  };

  return (
    <>
      {showedSplashscreen ? (
        <div className={styles.splashscreen}>
          <img
            src={restaurant?.logo}
            alt="logo"
            className={styles.splashscreen_logo}
          />
          <h2 className={styles.restuarant_name_splash}>{restaurant?.name}</h2>
          <h2 className={styles.logo_v}>VUDISH</h2>
        </div>
      ) : (
        <div className={styles.background}>
          <h2 className={styles.restuarant_name}>{restaurant?.name}</h2>
          <div className={styles.prompt}>
            <h4>Have any restrictions?</h4>
          </div>
          <div className={styles.bottombar}>
            <button
              onClick={(event) => goToPreference(event, restaurant?.id,true)}
              className={styles.yesbutton}
            >
              <span className="checkmark">
                <img src={tick} alt="" />
              </span>{" "}
              Yes
            </button>
              <button 
               onClick={(event) => goToPreference(event, restaurant?.id,false)}
              className={styles.nobutton}>
                <span className="checkmark">
                  <img src={cross} alt="" />
                </span>{" "}
                No
              </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Preference;
