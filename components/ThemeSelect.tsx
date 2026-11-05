"use client";

import {
  setThemePreference,
  useThemePreference,
  type ThemePreference,
} from "@/lib/theme";

// The icon shows what each name means: sun for Mineral (light), moon for
// Slate (dark), half circle for System.
function ThemeIcon({ preference }: { preference: ThemePreference }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    "aria-hidden": true,
  };
  if (preference === "light")
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" />
      </svg>
    );
  if (preference === "dark")
    return (
      <svg {...common}>
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
      </svg>
    );
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function ThemeSelect() {
  const preference = useThemePreference();
  return (
    <div className="theme-control">
      <ThemeIcon preference={preference} />
      <select
        aria-label="Color theme"
        value={preference}
        onChange={(event) =>
          setThemePreference(event.target.value as ThemePreference)
        }
      >
        <option value="system">System</option>
        <option value="light">Mineral</option>
        <option value="dark">Slate</option>
      </select>
    </div>
  );
}
