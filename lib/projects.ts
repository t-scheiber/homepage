// Public project facts. Sources: the master CV export, the published CV PDF and
// the README or metadata of each public repository at github.com/t-scheiber.
export interface ProjectLink {
  label: string;
  href: string;
}

export interface CodingProject {
  id: string;
  name: string;
  what: string;
  detail?: string;
  year: string;
  context: string;
  stack: string[];
  links: ProjectLink[];
  favicon?: string;
  image?: string;
  decision?: string;
}

const gh = (repo: string) => `https://github.com/t-scheiber/${repo}`;

export const selectedProjects: CodingProject[] = [
  {
    id: "europetalks",
    name: "EuropeTalks member platform",
    what: "Multilingual website and member services for a European exchange community.",
    detail:
      "I built the website and connected its Nextcloud to the same Clerk login, with admin, member and guest roles across both. Members correct machine translations in an editor I added, and can sign in with Google or a passwordless email link.",
    year: "Since 2024",
    context: "Freelance · live",
    stack: ["Next.js", "TypeScript", "Clerk", "Nextcloud SSO"],
    links: [
      { label: "Live site", href: "https://europetalks.eu/" },
      { label: "Member cloud", href: "https://cloud.europetalks.eu/" },
      { label: "Code", href: gh("europetalksWebsite") },
    ],
    favicon: "europetalks.png",
    image: "/files/projects/europetalks.webp",
    decision:
      "One Clerk login covers the website and the member cloud, so admin, member and guest roles mean the same thing in both.",
  },
  {
    id: "villa-claudia-documents",
    name: "Villa Claudia guest documents",
    what: "Pre-arrival guidance and document handling for a holiday rental's guests.",
    detail:
      "A Next.js app on top of the rental's WordPress booking system. Staff normally inspect the original ID at arrival, so advance identity copies are the exception, kept temporarily and covered by a documented cleanup.",
    year: "2025",
    context: "Freelance · live",
    stack: ["Next.js", "WordPress", "MotoPress", "PHP"],
    links: [
      { label: "Live app", href: "https://documents.villa-claudia.eu/" },
      { label: "Code", href: gh("villaclaudiaupload") },
    ],
    favicon: "villa-claudia-docs.ico",
    image: "/files/projects/villa-claudia-documents.webp",
    decision:
      "No advance ID copy is required by default. Staff inspect the original at arrival, and the app handles copies only as a temporary exception.",
  },
  {
    id: "ai-video",
    name: "AI video generation tool",
    what: "Generates hero-section videos through three provider APIs and ten models.",
    detail:
      "I built it because the tools I tried for my web projects were too expensive or too limited. It shows a cost estimate before each run and only offers the durations, ratios and resolutions the chosen model supports.",
    year: "2025",
    context: "Personal tool",
    stack: ["Next.js", "TypeScript", "Video model APIs"],
    links: [{ label: "Code", href: gh("aivideogeneration") }],
  },
  {
    id: "mayr-dach",
    name: "Mayr Dach demo website",
    what: "Demo website for a roofing and facade company in Saalfelden, Austria.",
    detail:
      "Next.js 16 with PostgreSQL and Prisma, passwordless sign-in and German and English content. The company's own domain stays with an existing contract, so this build runs as a demo.",
    year: "2026",
    context: "Freelance · demo",
    stack: ["Next.js", "PostgreSQL", "Prisma", "next-intl"],
    links: [
      { label: "Demo site", href: "https://mayr-dach.thomasscheiber.com/" },
      { label: "Code", href: gh("mayr-dach") },
    ],
    favicon: "mayr-dach.ico",
    image: "/files/projects/mayr-dach.webp",
  },
];

export const personalProjects: CodingProject[] = [
  {
    id: "financeapp",
    name: "FinanceApp",
    what: "Market data, news sentiment and portfolio tools in one dashboard.",
    year: "2025",
    context: "Personal · private instance",
    stack: ["Next.js", "Better Auth", "Alpha Vantage"],
    links: [{ label: "Code", href: gh("financeapp") }],
  },
  {
    id: "rock-paper-scissors",
    name: "Rock paper scissors",
    what: "Play by mouse, keyboard or webcam hand gestures, in English or German.",
    detail:
      "Began as my bachelor project at FH Technikum Wien. Gesture recognition runs in the browser with TensorFlow.js.",
    year: "2022, refreshed 2025",
    context: "Personal · live",
    stack: ["Next.js", "TensorFlow.js", "next-intl"],
    links: [
      {
        label: "Live app",
        href: "https://rock-paper-scissors.thomasscheiber.com/",
      },
      { label: "Code", href: gh("rockpaperscissors") },
    ],
    favicon: "rock-paper-scissors.svg",
  },
  {
    id: "drone-wallet",
    name: "Drone document wallet",
    what: "Phone-friendly document viewer for drone pilots stopped by authorities.",
    year: "2025",
    context: "Personal",
    stack: ["TypeScript"],
    links: [{ label: "Code", href: gh("droneapp") }],
    favicon: "drone-wallet.svg",
  },
  {
    id: "coffee-guide",
    name: "Coffee guide",
    what: "Espresso settings per bean and grinder, made for checking on a phone.",
    year: "2025",
    context: "Personal",
    stack: ["TypeScript"],
    links: [{ label: "Code", href: gh("coffee-guide") }],
    favicon: "coffee-guide.svg",
  },
];

export interface ArchiveProject {
  name: string;
  note: string;
  href: string;
  live?: string;
}

export const courseProjects: { group: string; items: ArchiveProject[] }[] = [
  {
    group: "Meta Front-End Developer course, 2023–2024",
    items: [
      {
        name: "Little Lemon restaurant",
        note: "React capstone project",
        href: gh("LittleLemon_capstone-react-course-project"),
      },
      {
        name: "Portfolio app",
        note: "Advanced React course, Chakra UI",
        href: gh("advanced-react-course-portfolio"),
        live: "https://advanced-react-course-portfolio.thomasscheiber.com/",
      },
      {
        name: "Calculator",
        note: "React basics",
        href: gh("react-basics-simplest-working-calculator"),
        live: "https://react-basics-simplest-working-calculator.thomasscheiber.com/",
      },
    ],
  },
  {
    group: "Small practice apps",
    items: [
      {
        name: "Todo app",
        note: "JavaScript",
        href: gh("todo-app"),
        live: "https://todoapp.thomasscheiber.com/",
      },
      { name: "Weather app", note: "Vue.js", href: gh("ScheiberVueAppAbgabe") },
      { name: "Weather app", note: "Vanilla JavaScript", href: gh("AK_WeatherApp") },
      { name: "Player management", note: "Node.js, EJS", href: gh("AK_nodeApp") },
    ],
  },
  {
    group: "FH Technikum Wien web development exercises, 2020",
    items: [
      {
        name: "Final project",
        note: "Web development course",
        href: `${gh("WebDevelopment")}/tree/master/Abschlussprojekt`,
      },
      {
        name: "Student database",
        note: "Exercise 7, PHP",
        href: `${gh("WebDevelopment")}/tree/master/FHTW_uebung_7_scheiber`,
      },
      {
        name: "Student list and RSS/Atom reader",
        note: "Exercise 6, PHP",
        href: `${gh("WebDevelopment")}/tree/master/FHTW_uebung_6_scheiber`,
      },
      {
        name: "Smart home control",
        note: "Exercise 5, PHP",
        href: `${gh("WebDevelopment")}/tree/master/FHTW_uebung_5_scheiber`,
      },
      {
        name: "Patient management",
        note: "Exercise 4, PHP",
        href: `${gh("WebDevelopment")}/tree/master/FHTW_uebung_4_scheiber`,
      },
      {
        name: "PHP exercises",
        note: "Exercise 3",
        href: `${gh("WebDevelopment")}/tree/master/FHTW_uebung_3_scheiber`,
      },
      {
        name: "Smart home controller",
        note: "Exercise 2",
        href: `${gh("WebDevelopment")}/tree/master/FHTW_uebung_2_scheiber`,
      },
      {
        name: "First web development exercise",
        note: "Exercise 1",
        href: `${gh("WebDevelopment")}/tree/master/FHTW_uebung_1_scheiber`,
      },
    ],
  },
];

export const archivedSites: ArchiveProject[] = [
  {
    name: "Ribo Stein company website",
    note: "Archived copy from 2018",
    href: "https://web.archive.org/web/20180413033202/http://www.ribo-stein.at/",
  },
];

export interface Website {
  name: string;
  href: string;
  logoSrc: string;
  what: string;
  part?: string;
  platform: string;
  image?: string;
}

export const websites: Website[] = [
  {
    name: "HD Architekten",
    image: "/files/projects/hd-architekten.webp",
    href: "https://hd-architekten.at/",
    logoSrc: "/files/logos/hda.png",
    what: "Architecture practice",
    part: "Built the site",
    platform: "WordPress",
  },
  {
    name: "HD Projekt Baumanagement",
    image: "/files/projects/hd-projekt.webp",
    href: "https://hd-projekt.at/",
    logoSrc: "/files/logos/hdp.png",
    what: "Site supervision and project management office",
    part: "Built the site",
    platform: "WordPress",
  },
  {
    name: "Villa Claudia",
    image: "/files/projects/villa-claudia.webp",
    href: "https://villa-claudia.eu/",
    logoSrc: "/files/logos/villaclaudia.png",
    what: "Holiday rental with online booking",
    part: "Built the site and its guest documents app",
    platform: "WordPress · MotoPress · WooCommerce",
  },
  {
    name: "Villa Dijana",
    href: "https://villadijana.eu/",
    logoSrc: "/files/logos/villadijana.png",
    what: "Holiday rental with online booking",
    part: "Built the site",
    platform: "WordPress",
  },
  {
    name: "Darat Thaimassage",
    image: "/files/projects/darat.webp",
    href: "https://darat-thaimassage.at/",
    logoSrc: "/files/logos/darat.png",
    what: "Thai massage practice",
    part: "Built the site",
    platform: "WordPress",
  },
  {
    name: "EuropeTalks Cloud",
    image: "/files/projects/europetalks-cloud.webp",
    href: "https://cloud.europetalks.eu/",
    logoSrc: "/files/logos/europetalks.png",
    what: "File sharing and collaboration for EuropeTalks members",
    part: "Connected it to the same login as europetalks.eu",
    platform: "Nextcloud · Clerk SSO",
  },
  {
    name: "Jugendliche für Jugendliche",
    image: "/files/projects/ju4ju.webp",
    href: "https://jugendlichefuerjugendliche.wordpress.com/",
    logoSrc: "/files/logos/ju4ju.png",
    what: "Youth association in Saalfelden am Steinernen Meer",
    platform: "WordPress.com",
  },
];
