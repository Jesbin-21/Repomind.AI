import "./Button.css";

function Button({ text, onClick,icon, type = "button", variant = "primary" }) {
  return (
    <button
      type={type}
      className={`btn ${variant}`}
      onClick={onClick}
    >
      {icon}{text}
    </button>
  );
}

export default Button;