import { useRandomReveal } from "react-random-reveal";

export default function WhitePaperPoint({
  characters,
  duration,
  revealDuration,
  isPlaying,
}) {
  const chars = useRandomReveal({
    isPlaying: isPlaying,
    duration: duration,
    revealDuration: revealDuration,
    characters: "- " + characters,
  });
  return (
    <div style={{ textAlign: "left" }} className="white-paper-text">
      {chars}
    </div>
  );
}
