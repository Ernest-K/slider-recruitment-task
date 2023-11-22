import { useEffect, useRef } from "react";
import "./Slide.css";

interface SlideProps {
  active: boolean;
  title: string;
  description: string;
  imageURL: string;
  onHeightChange: (height: number) => void;
}

export default function Slide({
  active,
  title,
  description,
  imageURL,
  onHeightChange,
}: SlideProps) {
  const childRef = useRef<HTMLDivElement>(null);
  const { VITE_API_URL } = import.meta.env;

  useEffect(() => {
    const handleResize = () => {
      if (childRef.current) {
        const { height } = childRef.current.getBoundingClientRect();
        onHeightChange(height);
      }
    };

    handleResize(); // Initial size setup

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      data-testid="slide"
      ref={childRef}
      className={`slide ${active ? "slide--active" : ""}`}
    >
      <div className="slide__image-container" style={{ position: "relative" }}>
        <img
          className="slide__image"
          src={`${VITE_API_URL}${imageURL}`}
          alt="slide_image"
        />
      </div>
      <div className="slide__content ">
        <h3 className="slide__title">{title}</h3>
        <p className="slide__description">{description}</p>
      </div>
    </div>
  );
}
