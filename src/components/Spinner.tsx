/** Small inline loading spinner. */
export default function Spinner({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block h-5 w-5 animate-spin rounded-full border-2 border-ink/20 border-t-accent ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}
