import "./page.scss";

interface ComponentProps {
  isActive?: boolean;
  disabled?: boolean;
  children: JSX.Element;
  handleOnClick: () => void;
}
export const PageBtn = ({
  isActive = false,
  children,
  disabled = false,
  handleOnClick,
}: ComponentProps) => {
  return (
    <button
      disabled={disabled}
      onClick={() => {
        handleOnClick();
      }}
      className={`pageBtn${isActive ? " active" : ""}`}
    >
      {children}
    </button>
  );
};
