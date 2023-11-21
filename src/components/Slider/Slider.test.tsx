import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Slider from "./Slider";

const mockSlides = [
  { id: 1, text: "Slide 1", imageURL: "/image1.jpg", audioURL: "/audio1.mp3" },
  { id: 2, text: "Slide 2", imageURL: "/image2.jpg", audioURL: "/audio2.mp3" },
];

describe("Slider component", () => {
  it("renders without crashing", () => {
    render(<Slider slides={mockSlides} />);
    const sliderElement = screen.getByTestId("slider");
    expect(sliderElement).toBeInTheDocument();
  });

  it("renders correct number of slides", () => {
    render(<Slider slides={mockSlides} />);
    const slideElements = screen.getAllByTestId("slide");
    expect(slideElements).toHaveLength(mockSlides.length);
  });
});
