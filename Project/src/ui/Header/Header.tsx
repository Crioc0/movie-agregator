import Logo from "../../assets/marusya.svg";
import { Link } from "react-router-dom";

import { Search } from "../Search/Search";

import "./header.css";
import { AuthModal } from "../../components/LoginComponent/AuthModal/AuthModal";
import {
  NavigationLinks,
  TLink,
} from "../../components/NavigationLinks/NavigationLinks";
import React from "react";

const links: TLink[] = [
  {
    link: "/",
    text: "Главная",
  },
  {
    link: "/genres",
    text: "Жанры",
  },
];

export const Header = React.memo(() => {
  return (
    <div className="header">
      <Link className="logo header-logo" to="/">
        <img src={Logo} alt="" />
      </Link>

      <NavigationLinks links={links} />
      <Search />
      <AuthModal />
    </div>
  );
});


