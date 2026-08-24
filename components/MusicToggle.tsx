export default function MusicToggle({
  isPlaying,
  onToggle,
}: {
  isPlaying: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      aria-label={isPlaying ? "Jeda musik" : "Putar musik"}
      className="fixed bottom-6 right-6 z-40 w-10 h-10 border border-cream/60 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <svg
        className="w-4 h-4 text-cream"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M11 5 6 9H2v6h4l5 4V5z" />
        {!isPlaying && (
          <path
            d="M23 9l-6 6M17 9l6 6"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        )}
      </svg>
    </button>
  );
}
