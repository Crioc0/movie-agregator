import { FC, ReactElement, ReactNode } from "react";
import "./FormField.css";

interface IFormField {
  children: ReactNode;
  errorMessage?: string;
  icon: ReactElement;
}

export const FormField: FC<IFormField> = ({ errorMessage, children, icon }) => {
  {
    return (
      <div className="form-group">
        {icon && <div className="icon-container">{icon}</div>}
        {children}
        {errorMessage && (
          <span className="error-message form__error-message">
            {errorMessage}
          </span>
        )}
      </div>
    );
  }
};
