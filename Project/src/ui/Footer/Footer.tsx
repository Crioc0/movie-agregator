import Vk from "../../assets/vk.svg";
import Ok from "../../assets/ok.svg";
import Youtube from "../../assets/youtube.svg";
import Telegram from "../../assets/telegram.svg";

import "./Footer.css";

export const Footer = () => {
  return (
    <footer>
      <ul className="link-list">
        <li className="link-list__item">
          <a href="http://vk.com" target="_blank" rel="noopener noreferrer">
            <img src={Vk} alt="" />
          </a>
        </li>
        <li className="link-list__item">
          <a
            href="http://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={Youtube} alt="" />
          </a>
        </li>
        <li className="link-list__item">
          <a href="http://ok.ru" target="_blank" rel="noopener noreferrer">
            <img src={Ok} alt="" />
          </a>
        </li>
        <li className="link-list__item">
          <a
            href="https://web.telegram.org/k/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={Telegram} alt="" />
          </a>
        </li>
      </ul>
    </footer>
  );
};
