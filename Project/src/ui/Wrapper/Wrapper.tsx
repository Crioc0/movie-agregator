import { FC } from "react";
import "./Wrapper.css";

interface IWrapper {
  isOpenModal: boolean | undefined;
  children: React.ReactNode;
}

export const Wrapper: FC<IWrapper> = ({ isOpenModal, children }) => {
  return (
    <div className={`${isOpenModal ? "wrapper--active" : "wrapper--disabled"}`}>
      {children}
    </div>
  );
};
