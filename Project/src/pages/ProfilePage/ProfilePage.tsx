import { Outlet } from "react-router";

import styles from './ProfilePage.module.scss'
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
      <div className={styles.navLinks}>
        <NavigationLinks links={links} />
      </div>

      <Outlet />
    </>
  );
};
