import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import jest from "jest-mock";
import IconButton from "./IconButton";

describe("IconButton component", () => {
  it("renders without crashing", () => {
    render(<IconButton iconSrc="/path/to/icon.png" />);
    const iconButtonElement = screen.getByRole("button");
    expect(iconButtonElement).toBeInTheDocument();
  });

  it("calls onClick prop when button is clicked", () => {
    const handleClick = jest.fn();
    render(<IconButton onClick={handleClick} iconSrc="/path/to/icon.png" />);
    const iconButtonElement = screen.getByRole("button");
    fireEvent.click(iconButtonElement);
    expect(handleClick).toHaveBeenCalled();
  });

  it("changes styles when button is pressed", () => {
    render(<IconButton iconSrc="/path/to/icon.png" />);
    const iconButtonElement = screen.getByRole("button");
    fireEvent.mouseDown(iconButtonElement);
    expect(iconButtonElement).toHaveClass("icon-btn--pressed");
    fireEvent.mouseUp(iconButtonElement);
    expect(iconButtonElement).not.toHaveClass("icon-btn--pressed");
  });

  it("applies custom icon style", () => {
    const customIconStyle = { width: "30px", height: "30px" };
    render(
      <IconButton iconSrc="/path/to/icon.png" iconStyle={customIconStyle} />
    );
    const iconElement = screen.getByAltText("Left arrow icon");
    expect(iconElement).toHaveStyle(customIconStyle);
  });
});
