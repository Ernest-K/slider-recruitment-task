import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SliderWrapper from "./SliderWrapper";

describe("SliderWrapper component", () => {
  it("renders without crashing", () => {
    render(<SliderWrapper />);
    const sliderWrapperElement = screen.getByTestId("slider-wrapper");
    expect(sliderWrapperElement).toBeInTheDocument();
  });

  it("displays loading message while fetching data", () => {
    render(<SliderWrapper />);
    const loadingElement = screen.getByText("Loading");
    expect(loadingElement).toBeInTheDocument();
  });

  it("displays error message when fetch fails", async () => {
    render(<SliderWrapper />);
    await waitFor(() => {
      const errorMessageElement = screen.getByText("Something went wrong");
      expect(errorMessageElement).toBeInTheDocument();
    });
  });
});
