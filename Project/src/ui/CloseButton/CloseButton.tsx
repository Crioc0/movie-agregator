import styles from './CloseButton.module.scss'
import { Cross } from "../../assets/Cross";

interface ICloseButton {
  handleOpenClick: () => void;
}

export const CloseButton = ({ handleOpenClick }: ICloseButton) => {
  return (
    <button className={styles.button} onClick={handleOpenClick}>
      <Cross />
    </button>
  );
};
