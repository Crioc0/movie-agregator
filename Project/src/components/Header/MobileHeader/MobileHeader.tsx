import React from "react";
import styles from "./MobileHeader.module.scss";
import { Link } from "react-router";
import { GenresIcon } from "../../../assets/genres";
import Logo from "../../../assets/marusya.svg";
import { Search } from "../../Search/Search";
import { AuthModal } from "../../../components/LoginComponent/AuthModal/AuthModal";

export const MobileHeader = React.memo(() => {
  return (
    <div className={styles.header}>
      <Link className={styles.logo} to="/">
        <img src={Logo} alt="" />
      </Link>
      <div className={styles.mobileNav}>
        <Link to="/genres">
          <GenresIcon />
        </Link>
        <Search />
        <AuthModal />
      </div>
    </div>
  );
});
