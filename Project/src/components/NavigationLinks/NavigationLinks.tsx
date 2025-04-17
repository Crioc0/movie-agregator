import { NavLink } from "react-router";
import "./NavigationLinks.css";

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
      <ul className="nav__list">
        {links.map((item: TLink, index) => (
          <li key={index} className="nav__item">
            <NavLink className={"link"} to={item.link}>
              {item.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
