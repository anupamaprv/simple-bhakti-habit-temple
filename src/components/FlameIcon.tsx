import { cn } from "@/lib/utils";

interface FlameIconProps {
  className?: string;
  animated?: boolean;
}

export function FlameIcon({ className, animated = true }: FlameIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn(
        "w-6 h-6 text-primary",
        animated && "animate-flame",
        className
      )}
    >
      <path
        d="M12 2C12 2 7 8 7 12C7 14.5 8.5 17 12 17C15.5 17 17 14.5 17 12C17 8 12 2 12 2Z"
        fill="currentColor"
        opacity="0.8"
      />
      <path
        d="M12 6C12 6 9.5 10 9.5 12.5C9.5 14 10.5 15.5 12 15.5C13.5 15.5 14.5 14 14.5 12.5C14.5 10 12 6 12 6Z"
        fill="hsl(var(--gold))"
      />
      <path
        d="M12 22C16.4183 22 20 18.4183 20 14C20 9 15 4 12 2C9 4 4 9 4 14C4 18.4183 7.58172 22 12 22Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
