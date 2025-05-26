import Vk from "../../assets/vk.svg";
import Ok from "../../assets/ok.svg";
import Youtube from "../../assets/youtube.svg";
import Telegram from "../../assets/telegram.svg";

import styles from "./Footer.module.scss";

const socialLinks = [
  { href: "http://vk.com", icon: Vk },
  { href: "http://youtube.com", icon: Youtube },
  { href: "http://ok.ru", icon: Ok },
  { href: "https://web.telegram.org/k/", icon: Telegram },
];

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <ul className={styles.linkList}>
        {socialLinks.map((link, index) => (
          <li key={index}>
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              <img src={link.icon} alt="" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
