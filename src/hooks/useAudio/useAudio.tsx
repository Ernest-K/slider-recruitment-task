import { useEffect, useRef, useState } from "react";

const useAudio = (audioURL: string) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const playAudio = () => {
    if (audioRef.current) {
      try {
        audioRef.current.play();
      } catch (error: any) {
        console.error("Error during audio:", error.message);
      }
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      playAudio();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [audioURL]);

  return { audioRef, playAudio, toggleMute, isMuted };
};

export default useAudio;
