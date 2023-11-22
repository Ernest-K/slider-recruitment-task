import { useState } from "react";
import { SlideData } from "../../types";
import Slide from "../Slide/Slide";
import SliderControl from "../SliderControl/SliderControl";
import IconButton from "../IconButton/IconButton";
import useAudio from "../../hooks/useAudio/useAudio";
import VolumeHighIcon from "../../assets/icons/Volume-High.svg";
import VolumeIcon from "../../assets/icons/Volume.svg";
import "../Slider/Slider.css";
import "../../index.css";

interface SliderProps {
  slides: SlideData[];
}

export default function Slider({ slides }: SliderProps) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [childHeight, setChildHeight] = useState(0);
  const { audioRef, playAudio, toggleMute, isMuted } = useAudio(
    slides[activeSlideIndex].audioURL
  );
  const { VITE_API_URL } = import.meta.env;

  const handleChildHeight = (height: number) => {
    setChildHeight(height);
  };

  const handlePrevSlide = () => {
    setActiveSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setActiveSlideIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="container">
      <div className="slider" data-testid="slider">
        <div
          style={{
            position: "relative",
            // Multiply by 2 because initial transform scale is 0.5
            height: `${Math.round(2 * childHeight)}px`,
          }}
        >
          {slides.map((slide, index) => (
            <Slide
              key={index}
              title="Title"
              description={slide.text}
              imageURL={slide.imageURL}
              active={activeSlideIndex === index}
              onHeightChange={handleChildHeight}
            />
          ))}
        </div>
        <div className="slider__control">
          <SliderControl
            onPrev={handlePrevSlide}
            onNext={handleNextSlide}
            active={activeSlideIndex + 1}
            total={slides.length}
          />
          <IconButton
            onClick={() => {
              playAudio();
              toggleMute();
            }}
            color="#B4BDFF"
            iconSrc={!isMuted ? VolumeHighIcon : VolumeIcon}
            iconStyle={{
              width: 48,
              height: 36,
            }}
          />
        </div>

        <audio ref={audioRef} controls className="slider__audio">
          <source
            src={`${VITE_API_URL}${slides[activeSlideIndex].audioURL}`}
            type="audio/mp3"
          />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
}
