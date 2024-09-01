import React from "react";
import styles from "./Header.module.css"

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <img
          src={require("../assets/images/header-logo.png")}
          alt="Logo"
          className={styles.header__logo}
        />
        <h1 className={styles.header__title}>BANCO</h1>
      </div>
    </header>
  );
};

export default Header;
