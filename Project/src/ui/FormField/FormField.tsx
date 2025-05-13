import { FC, ReactElement, ReactNode } from "react";

import styles from "./FormField.module.scss";
interface IFormField {
  children: ReactNode;
  errorMessage?: string;
  icon: ReactElement;
}

export const FormField: FC<IFormField> = ({ errorMessage, children, icon }) => {
  return (
    <div className={styles.formGroup}>
      {icon && <div className={styles.iconContainer}>{icon}</div>}
      {children}
      {errorMessage && (
        <span className={`${styles.errorMessage} ${styles.formErrorMessage}`}>
          {errorMessage}
        </span>
      )}
    </div>
  );
};
