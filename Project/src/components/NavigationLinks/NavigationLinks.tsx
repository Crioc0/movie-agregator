import { NavLink } from "react-router";
// import "./NavigationLinks.css";
import styles from "./NavigationLinks.module.scss";

export type TLink = {
  link: string;
  text: string;
};

interface NavigationProps {
  links: TLink[];
}

export const NavigationLinks = ({ links }: NavigationProps) => {
  return (
    <nav className="nav">
      <ul className={styles.navList}>
        {links.map((item: TLink, index) => (
          <li key={index} className={styles.navItem}>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              to={item.link}
            >
              {item.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
