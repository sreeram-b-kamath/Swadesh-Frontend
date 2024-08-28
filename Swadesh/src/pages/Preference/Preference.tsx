import React from "react";
import styles from "./Preference.module.css";

function Preference() {
  return (
    <div className={styles.background}>
      <h2>RESTAURANT</h2>
      <div className={styles.prompt}>
          <h4>Have any restrictions?</h4>
      </div>
      <div className={styles.bottombar}>
        <button className={styles.yesbutton}>
          <span className="checkmark">✔</span> Yes
        </button>
        <button className={styles.nobutton}>
          <span className="checkmark">x</span> No
        </button>
      </div>
    </div>
  );
}

export default Preference;
