// Social media and contact links
export const SOCIAL_LINKS = {
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "#",
  github: process.env.NEXT_PUBLIC_GITHUB_URL || "#",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#",
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "#",
  email: process.env.NEXT_PUBLIC_EMAIL || "",
  phone: process.env.NEXT_PUBLIC_PHONE || "",
} as const;

// CSS class constants for better maintainability
export const TILE_BUTTON_CLASS =
  "group relative flex w-full h-full cursor-pointer flex-col items-center justify-center gap-[0.5vh] rounded-2xl border-none bg-white/60 p-[1vh] text-center text-white shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all duration-300 ease-in-out hover:bg-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:p-[1vh] sm:gap-[0.5vh]";

export const TEXT_MARGIN = {
  default: "mt-[0.5vh]",
  reduced: "mt-[0.05vh]",
} as const;

