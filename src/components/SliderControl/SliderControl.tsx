import IconButton from "../IconButton/IconButton";
import ArrowLeftIcon from "../../assets/icons/Arrow-Left.svg";
import ArrowRightIcon from "../../assets/icons/Arrow-Right.svg";
import "../IconButton/IconButton.css";
import "./SliderControl.css";
import "../../index.css";

interface NavigationProps {
  onPrev: () => void;
  onNext: () => void;
  active: number;
  total: number;
}

export default function SliderControl({
  onPrev,
  onNext,
  active,
  total,
}: NavigationProps) {
  return (
    <div className="control__container" data-testid="slider-control">
      <IconButton
        onClick={onPrev}
        color="#A6FAFF"
        iconSrc={ArrowLeftIcon}
        iconStyle={{ width: 48 }}
      />
      <div className="control__counter" data-testid="slider-counter">
        <p>
          <span>{active}</span>/<span>{total}</span>
        </p>
      </div>
      <IconButton
        onClick={onNext}
        color="#A6FAFF"
        iconSrc={ArrowRightIcon}
        iconStyle={{ width: 48 }}
      />
    </div>
  );
}
