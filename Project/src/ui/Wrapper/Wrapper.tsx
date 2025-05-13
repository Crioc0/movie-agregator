import { FC } from "react";
import styles from './Wrapper.module.scss'

interface IWrapper {
  isOpenModal: boolean | undefined;
  children: React.ReactNode;
}

export const Wrapper: FC<IWrapper> = ({ isOpenModal, children }) => {
  return (
    <div className={`${styles.wrapper} ${isOpenModal ? styles.wrapperActive : styles.wrapperDisabled}`}>
      {children}
    </div>
  );
};
