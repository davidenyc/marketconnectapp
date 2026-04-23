import { cn } from "@/lib/utils";

type ChipProps = {
  children: React.ReactNode;
  tone?: "green" | "amber" | "slate";
  className?: string;
};

export function Chip({ children, tone = "slate", className }: ChipProps) {
  const tones = {
    green: "bg-leaf/10 text-leaf border-leaf/20",
    amber: "bg-sun/20 text-ink border-sun/40",
    slate: "bg-ink/5 text-ink/75 border-ink/10"
  };

  return (
    <span className={cn("inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold", tones[tone], className)}>
      {children}
    </span>
  );
}
