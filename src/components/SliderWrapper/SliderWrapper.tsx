import { useEffect, useState } from "react";
import { SlideData } from "../../types";
import Slider from "../Slider/Slider";
import getSlidesData from "../../services/slideService";
import "../Slider/Slider.css";

export default function SliderWrapper() {
  const [slidesData, setSlidesData] = useState<SlideData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchSlides = async () => {
      setIsLoading(true);

      try {
        const slides = await getSlidesData();
        setSlidesData(slides);
      } catch (error: any) {
        console.error("Error fetching slide data: ", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSlides();
  }, []);

  if (error) {
    return <p>{`Something went wrong`}</p>;
  }

  return (
    <section className="slider__wrapper" data-testid="slider-wrapper">
      {isLoading && <p className="slider__loading">Loading</p>}
      {slidesData.length && <Slider slides={slidesData} data-testid="slider" />}
    </section>
  );
}
