import { Outlet } from "react-router";
import "./ProfilePage.css";
import {
  NavigationLinks,
  TLink,
} from "../../components/NavigationLinks/NavigationLinks";

export const ProfilePage = () => {
  const links: TLink[] = [
    {
      link: "/profile/favourites",
      text: "Любимые фильмы",
    },
    {
      link: "/profile/settings",
      text: "Настройки",
    },
  ];

  return (
    <>
      <h2>Страница профиля</h2>
      <div className="nav-links">
        <NavigationLinks links={links} />
      </div>

      <Outlet />
    </>
  );
};
