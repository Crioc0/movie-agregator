import "./Button.css";

type TProps = {
  type: "submit" | "button";
  style:
    | "primary"
    | "auth"
    | "icon"
    | "without-border"
    | "secondary"
    | "delete";
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
      className={`button button-${style}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
