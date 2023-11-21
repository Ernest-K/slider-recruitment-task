import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SliderControl from "./SliderControl";

describe("SliderControl component", () => {
  it("renders without crashing", () => {
    render(
      <SliderControl onPrev={() => {}} onNext={() => {}} active={1} total={3} />
    );
    const sliderControlElement = screen.getByTestId("slider-control");
    expect(sliderControlElement).toBeInTheDocument();
  });

  it("displays the correct counter", () => {
    render(
      <SliderControl onPrev={() => {}} onNext={() => {}} active={2} total={5} />
    );
    const counterElement = screen.getByTestId("slider-counter");
    expect(counterElement).toHaveTextContent("2/5");
  });
});
