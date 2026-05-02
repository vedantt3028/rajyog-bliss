import { useMotionPreference } from "@/hooks/useMotionPreference";

export function MotionToggle({ variant = "light" }: { variant?: "light" | "dark" }) {
  const { reduced, setManual } = useMotionPreference();
  const onClick = () => setManual(reduced ? "full" : "reduce");
  const base =
    "inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors";
  const styles =
    variant === "light"
      ? "border-white/30 text-white/85 hover:bg-white/10"
      : "border-border text-foreground/70 hover:bg-muted";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${styles}`}
      aria-pressed={reduced}
      title={reduced ? "Animations off — click to enable" : "Animations on — click to reduce"}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${reduced ? "bg-muted-foreground" : "bg-accent"}`} />
      {reduced ? "Calm mode" : "Animated"}
    </button>
  );
}
