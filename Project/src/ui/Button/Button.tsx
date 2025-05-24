import styles from "./Button.module.scss";

type TProps = {
  type: "submit" | "button";
  style:
    | "primary"
    | "auth"
    | "icon"
    | "withoutBorder"
    | "secondary"
    | "delete"
    | "mobile";
  children: React.ReactNode;
  value?: number | undefined;
  onClick?: () => void;
  disabled?: boolean;
};

export const Button = ({
  children,
  style,
  value,
  onClick,
  disabled,
}: TProps) => {
  return (
    <button
      disabled={disabled}
      value={value}
      className={`${styles.button} ${styles[style]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
