import { useRandomReveal } from "react-random-reveal";

export default function WhitePaperPre({
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
  return <pre className="white-paper-pre">{chars}</pre>;
}
