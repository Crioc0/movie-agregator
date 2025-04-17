import { Cross } from "../../assets/Cross";
import "./CloseButton.css";
interface ICloseButton {
  handleOpenClick: () => void;
}

export const CloseButton = ({ handleOpenClick }: ICloseButton) => {
  return (
    <button className="close-button" onClick={handleOpenClick}>
      <Cross />
    </button>
  );
};
