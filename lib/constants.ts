import masterCV from "./professional-profile.json";

// Shared professional identity is exported from the master CV.
export const SOCIAL_LINKS = {
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || masterCV.profile.links.linkedin,
  github: process.env.NEXT_PUBLIC_GITHUB_URL || masterCV.profile.links.github,
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/thomasscheiberphotography/",
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://www.facebook.com/thomasscheiberphotography/",
  email: process.env.NEXT_PUBLIC_EMAIL || masterCV.profile.email,
  phone: process.env.NEXT_PUBLIC_PHONE || "",
} as const;

// CSS class constants for better maintainability
export const TILE_BUTTON_CLASS =
  "group relative flex w-full min-h-[150px] cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/70 p-5 text-center text-slate-900 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all duration-300 ease-in-out hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:min-h-[170px]";

export const TEXT_MARGIN = {
  default: "mt-3",
  reduced: "mt-2",
} as const;

