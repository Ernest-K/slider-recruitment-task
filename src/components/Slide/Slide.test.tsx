import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Slide from "./Slide";

describe("Slide component", () => {
  it("renders with the correct description", () => {
    const description = "Test Description";
    const imageURL = "/test-image.jpg";
    const active = true;
    const onHeightChange = function () {
      return;
    };

    render(
      <Slide
        active={active}
        title="Title"
        description={description}
        imageURL={imageURL}
        onHeightChange={onHeightChange}
      />
    );

    const descriptionElement = screen.getByText(description);
    expect(descriptionElement).toBeInTheDocument();
  });

  it("renders the correct image URL", () => {
    const description = "Test Description";
    const imageURL = "/test-image.jpg";
    const active = true;
    const onHeightChange = function () {
      return;
    };

    render(
      <Slide
        active={active}
        title="Title"
        description={description}
        imageURL={imageURL}
        onHeightChange={onHeightChange}
      />
    );

    const imageElement = screen.getByAltText("slide_image");
    expect(imageElement).toHaveAttribute(
      "src",
      `${import.meta.env.VITE_API_URL}${imageURL}`
    );
  });

  it('applies "slide--active" class when active prop is true', () => {
    const description = "Test Description";
    const imageURL = "/test-image.jpg";
    const active = true;
    const onHeightChange = function () {
      return;
    };

    render(
      <Slide
        active={active}
        title="Title"
        description={description}
        imageURL={imageURL}
        onHeightChange={onHeightChange}
      />
    );

    const slideElement = screen.getByTestId("slide");
    expect(slideElement).toHaveClass("slide--active");
  });

  it('does not apply "slide--active" class when active prop is false', () => {
    const description = "Test Description";
    const imageURL = "/test-image.jpg";
    const active = false;
    const onHeightChange = function () {
      return;
    };

    render(
      <Slide
        active={active}
        title="Title"
        description={description}
        imageURL={imageURL}
        onHeightChange={onHeightChange}
      />
    );

    const slideElement = screen.getByTestId("slide");
    expect(slideElement).not.toHaveClass("slide--active");
  });
});
