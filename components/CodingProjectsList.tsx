import { memo } from "react";
import Image from "next/image";

interface Project {
  name: string;
  url?: string;
  githubRepo?: string;
  archived?: boolean;
  favicon?: string;
}

const CodingProjectsList: React.FC = () => {
  const projects: Project[] = [
    {
      name: "AI Video Generation Tool",
      githubRepo: "https://github.com/t-scheiber/aivideogeneration",
    },
    {
      name: "FinanceApp: Financial Data & News Dashboard",
      githubRepo: "https://github.com/t-scheiber/financeapp",
    },
    {
      name: "Karl Mayr GmbH",
      githubRepo: "https://github.com/t-scheiber/mayr-dach",
      favicon: "mayr-dach.ico",
    },
    {
      name: "EuropeTalks Homepage",
      url: "https://europetalks.eu/",
      githubRepo: "https://github.com/t-scheiber/europetalksWebsite",
      favicon: "europetalks.png",
    },
    {
      name: "Rock Paper Scissors App",
      url: "https://rock-paper-scissors.thomasscheiber.com/",
      githubRepo: "https://github.com/t-scheiber/rockpaperscissors",
      favicon: "rock-paper-scissors.svg",
    },
    {
      name: "Drone Document Wallet App",
      githubRepo: "https://github.com/t-scheiber/droneapp",
      favicon: "drone-wallet.svg",
    },
    {
      name: "Coffee Guide App",
      githubRepo: "https://github.com/t-scheiber/coffee-guide",
      favicon: "coffee-guide.svg",
    },
    {
      name: "Villa Claudia Documents App",
      url: "https://documents.villa-claudia.eu/",
      githubRepo:
        "https://github.com/t-scheiber/villaclaudiaupload",
      favicon: "villa-claudia-docs.ico",
    },
    {
      name: "Little Lemon Restaurant - React Capstone",
      githubRepo:
        "https://github.com/t-scheiber/LittleLemon_capstone-react-course-project",
      favicon: "little-lemon.png",
    },
    {
      name: "React Advanced Course: Portfolio App",
      url: "https://advanced-react-course-portfolio.thomasscheiber.com/",
      githubRepo:
        "https://github.com/t-scheiber/advanced-react-course-portfolio",
      favicon: "react-portfolio.ico",
    },
    {
      name: "React Basics: Simplest working Calculator App",
      url: "https://react-basics-simplest-working-calculator.thomasscheiber.com/",
      githubRepo: "https://github.com/t-scheiber/react-basics-simplest-working-calculator",
      favicon: "calculator.svg",
    },
    {
      name: "Weather App (Vue.js)",
      githubRepo: "https://github.com/t-scheiber/ScheiberVueAppAbgabe",
      favicon: "weather-vue.ico",
    },
    {
      name: "Weather App (Vanilla JS)",
      githubRepo: "https://github.com/t-scheiber/AK_WeatherApp",
      favicon: "weather-vanilla.ico",
    },
    {
      name: "Player Management App",
      githubRepo: "https://github.com/t-scheiber/AK_nodeApp",
      favicon: "player-management.svg",
    },
    {
      name: "Todo App",
      url: "https://todoapp.thomasscheiber.com/",
      githubRepo: "https://github.com/t-scheiber/todo-app",
      favicon: "todo-app.ico",
    },
    {
      name: "Abschlussprojekt Web Development",
      githubRepo:
        "https://github.com/t-scheiber/WebDevelopment/tree/master/Abschlussprojekt",
      favicon: "fhtw-final.ico",
    },
    {
      name: "Studentendatenbank",
      githubRepo:
        "https://github.com/t-scheiber/WebDevelopment/tree/master/FHTW_uebung_7_scheiber",
      favicon: "fhtw-uebung7.svg",
    },
    {
      name: "Studentenliste und RSS/Atom Feed Reader",
      githubRepo:
        "https://github.com/t-scheiber/WebDevelopment/tree/master/FHTW_uebung_6_scheiber",
      favicon: "fhtw-uebung6.svg",
    },
    {
      name: "Smart Home Steuerung App",
      githubRepo:
        "https://github.com/t-scheiber/WebDevelopment/tree/master/FHTW_uebung_5_scheiber",
      favicon: "fhtw-uebung5.ico",
    },
    {
      name: "Patientenverwaltung App",
      githubRepo:
        "https://github.com/t-scheiber/WebDevelopment/tree/master/FHTW_uebung_4_scheiber",
      favicon: "fhtw-uebung4.svg",
    },
    {
      name: "Php Übungen App",
      githubRepo:
        "https://github.com/t-scheiber/WebDevelopment/tree/master/FHTW_uebung_3_scheiber",
      favicon: "fhtw-uebung3.png",
    },
    {
      name: "Smart Home Controller App",
      githubRepo:
        "https://github.com/t-scheiber/WebDevelopment/tree/master/FHTW_uebung_2_scheiber",
      favicon: "fhtw-uebung2.svg",
    },
    {
      name: "Übung aus Web Development",
      githubRepo:
        "https://github.com/t-scheiber/WebDevelopment/tree/master/FHTW_uebung_1_scheiber",
      favicon: "fhtw-uebung1.svg",
    },
    {
      name: "Alte Unternehmensseite Ribo Stein",
      url: "https://web.archive.org/web/20180413033202/http://www.ribo-stein.at/",
      archived: true,
      favicon: "ribo-stein.png",
    },
  ];

  return (
    <ul className="list-none w-full m-0 p-0 justify-center relative">
      {projects.map((project, index) => {
        const ProjectTitle = project.url ? "a" : "div";
        // Keep project icons local, including source-only projects.
        const faviconSrc = project.favicon
          ? `/files/favicons/projects/${project.favicon}`
          : "/files/github.svg";

        return (
          <li key={index} className="list-none">
            <div
              className={`bg-white/20 backdrop-blur-md m-0 py-4 px-6 justify-center items-center relative flex transition-all duration-200 sm:py-3 sm:px-4 sm:text-base hover:bg-white/30 hover:backdrop-blur-none text-white! text-lg! font-normal drop-shadow-lg ${index !== projects.length - 1 ? "border-b border-white" : ""}`}
            >
              <ProjectTitle
                href={project.url}
                target={project.url ? "_blank" : undefined}
                rel={project.url ? "noopener noreferrer" : undefined}
                aria-label={project.url ? `Visit ${project.name}${project.archived ? " archived website" : ""} (opens in new tab)` : undefined}
                className="flex items-center flex-1 text-white! text-lg! font-normal drop-shadow-lg"
              >
                <span className="flex mr-4 sm:mb-0 bg-white/90 rounded-lg p-2">
                  {project.favicon ? <Image
                    src={faviconSrc}
                    alt={`${project.name} favicon`}
                    width={32}
                    height={32}
                    className="h-8 w-8 sm:h-7 sm:w-7"
                  /> : <svg className="h-8 w-8 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m8 5-7 7 7 7m8-14 7 7-7 7M14 3l-4 18" /></svg>}
                </span>
                <span>
                  <span className="block">{project.name}</span>
                  {project.archived && <span className="mt-1 block text-sm text-slate-200">Archived website</span>}
                </span>
              </ProjectTitle>
              {project.githubRepo && <a
                href={project.githubRepo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.name} on GitHub (opens in new tab)`}
                title={`View ${project.name} on GitHub`}
                className="ml-4 flex h-11 w-11 shrink-0 items-center justify-center bg-white/90 rounded-lg p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 sm:w-4 sm:h-4 text-gray-800"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default memo(CodingProjectsList);
