import { useEffect, useState } from "react";
import "./IconButton.css";

interface IconButtonProps {
  onClick?: () => void;
  color?: string;
  iconSrc: string;
  iconStyle?: object;
}

export default function IconButton({
  onClick,
  color,
  iconSrc,
  iconStyle,
}: IconButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  useEffect(() => {
    const handleMouseUp = () => {
      setIsPressed(false);
    };

    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <button
      onClick={onClick}
      onMouseDown={handleMouseDown}
      className={`icon-btn ${isPressed ? "icon-btn--pressed" : ""}`}
      style={{ backgroundColor: `${color}` }}
    >
      <img
        src={iconSrc}
        alt="Left arrow icon"
        style={{ ...iconStyle, pointerEvents: "none" }}
      />
    </button>
  );
}
