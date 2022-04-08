import { useRandomReveal } from "react-random-reveal";

export default function WhitePaperSubtitle({
  characters,
  duration,
  revealDuration,
  isPlaying,
}) {
  const chars = useRandomReveal({
    isPlaying: isPlaying,
    duration: duration,
    revealDuration: revealDuration,
    characters: characters,
  });

  return <div className="white-paper-subtitle">{chars}</div>;
}
