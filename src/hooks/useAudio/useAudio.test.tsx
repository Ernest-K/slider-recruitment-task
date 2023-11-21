import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useEffect } from "react";
import useAudio from "./useAudio";

const AudioPlayer = ({ audioURL }) => {
  const { audioRef, playAudio, toggleMute, isMuted } = useAudio(audioURL);

  useEffect(() => {
    playAudio();
  }, [playAudio]);

  return (
    <div>
      <audio ref={audioRef} data-testid="audio-player" controls />
      <button onClick={toggleMute} data-testid="mute-toggle">
        {isMuted ? "Unmute" : "Mute"}
      </button>
    </div>
  );
};

describe("useAudio hook", () => {
  it("toggles mute on button click", () => {
    const { getByTestId } = render(<AudioPlayer audioURL="test.mp3" />);
    const muteToggle = getByTestId("mute-toggle");
    fireEvent.click(muteToggle);
    const audioPlayer = getByTestId("audio-player");
    expect(audioPlayer.muted).toBe(false);
    fireEvent.click(muteToggle);
    expect(audioPlayer.muted).toBe(true);
  });
});
