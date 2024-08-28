
import React from "react";
import styles from "./GuestLanding.module.css";
import qrcode from  '../../assets/qr-code.svg'

function GuestLanding() {
    return (
      <div className={styles.background}>
        <h2 className={styles.scan_heading}>SCAN</h2>
        <div className={styles.qr}>
            <img src={qrcode} alt="qrcode" />
        </div>
      </div>
    );
  }
  
  export default GuestLanding;