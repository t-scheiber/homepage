import { memo } from "react";
import Image from "next/image";

interface Project {
  name: string;
  url: string;
  githubRepo: string;
  favicon?: string;
}

const CodingProjectsList: React.FC = () => {
  const projects: Project[] = [
    {
      name: "EuropeTalks Homepage",
      url: "https://europetalks.eu/",
      githubRepo: "https://github.com/devEuropetalks/europetalksWebsite",
      favicon: "europetalks.png",
    },
    {
      name: "Rock Paper Scissors App",
      url: "https://rock-paper-scissors.thomasscheiber.com/",
      githubRepo: "https://github.com/t-scheiber/RockPaperScissors",
      favicon: "rock-paper-scissors.svg",
    },
    {
      name: "Finance App",
      url: "https://finance.thomasscheiber.com/",
      githubRepo: "https://github.com/t-scheiber/financeapp",
      favicon: "finance.svg",
    },
    {
      name: "AI Video Generation",
      url: "https://aivideogeneration.thomasscheiber.com/",
      githubRepo: "https://github.com/t-scheiber/aivideogeneration",
      favicon: "ai-video.svg",
    },
    {
      name: "Drone Document Wallet App",
      url: "https://drone.thomasscheiber.com/",
      githubRepo: "https://github.com/t-scheiber/droneapp",
      favicon: "drone-wallet.svg",
    },
    {
      name: "Coffee Guide App",
      url: "https://coffee.thomasscheiber.com/",
      githubRepo: "https://github.com/t-scheiber/coffee-guide",
      favicon: "coffee-guide.svg",
    },
    {
      name: "Villa Claudia Documents App",
      url: "https://documents.villa-claudia.eu/",
      githubRepo: "https://github.com/administrationAtVillaClaudia/villaclaudiaupload",
      favicon: "villa-claudia-docs.ico",
    },
    {
      name: "Little Lemon Restaurant - React Capstone",
      url: "https://little-lemon.thomasscheiber.com/",
      githubRepo: "https://github.com/t-scheiber/LittleLemon_capstone-react-course-project",
      favicon: "little-lemon.png",
    },
    {
      name: "React Advanced Course: Portfolio App",
      url: "https://advanced-react-course-portfolio.thomasscheiber.com/",
      githubRepo: "https://github.com/t-scheiber/advanced-react-course-portfolio",
      favicon: "react-portfolio.ico",
    },
    {
      name: "React Basics: Simplest working Calculator App",
      url: "https://react-basics-simplest-working-calculator.thomasscheiber.com/",
      githubRepo: "https://github.com/t-scheiber/ReactBasicsCalculatorApp",
      favicon: "calculator.svg",
    },
    {
      name: "Weather App (Vue.js)",
      url: "https://weatherapp-vue.thomasscheiber.com/",
      githubRepo: "https://github.com/t-scheiber/ScheiberVueAppAbgabe",
      favicon: "weather-vue.ico",
    },
    {
      name: "Weather App (Vanilla JS)",
      url: "https://weatherapp-vanillajs.thomasscheiber.com/",
      githubRepo: "https://github.com/t-scheiber/AK_WeatherApp",
      favicon: "weather-vanilla.ico",
    },
    {
      name: "Player Management App",
      url: "https://players.thomasscheiber.com/",
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
      url: "https://fhtw-abschlussprojekt.thomasscheiber.com",
      githubRepo: "https://github.com/t-scheiber/WebDevelopment/tree/master/Abschlussprojekt",
      favicon: "fhtw-final.ico",
    },
    {
      name: "Studentendatenbank",
      url: "https://fhtw-uebung7.thomasscheiber.com/",
      githubRepo: "https://github.com/t-scheiber/WebDevelopment/tree/master/FHTW_uebung_7_scheiber",
      favicon: "fhtw-uebung7.svg",
    },
    {
      name: "Studentenliste und RSS/Atom Feed Reader",
      url: "https://fhtw-uebung6.thomasscheiber.com/",
      githubRepo: "https://github.com/t-scheiber/WebDevelopment/tree/master/FHTW_uebung_6_scheiber",
      favicon: "fhtw-uebung6.svg",
    },
    {
      name: "Smart Home Steuerung App",
      url: "https://fhtw-uebung5.thomasscheiber.com/",
      githubRepo: "https://github.com/t-scheiber/WebDevelopment/tree/master/FHTW_uebung_5_scheiber",
      favicon: "fhtw-uebung5.ico",
    },
    {
      name: "Patientenverwaltung App",
      url: "https://fhtw-uebung4.thomasscheiber.com/",
      githubRepo: "https://github.com/t-scheiber/WebDevelopment/tree/master/FHTW_uebung_4_scheiber",
      favicon: "fhtw-uebung4.svg",
    },
    {
      name: "Php Übungen App",
      url: "https://fhtw-uebung3.thomasscheiber.com/",
      githubRepo: "https://github.com/t-scheiber/WebDevelopment/tree/master/FHTW_uebung_3_scheiber",
      favicon: "fhtw-uebung3.png",
    },
    {
      name: "Smart Home Controller App",
      url: "https://fhtw-uebung2.thomasscheiber.com/",
      githubRepo: "https://github.com/t-scheiber/WebDevelopment/tree/master/FHTW_uebung_2_scheiber",
      favicon: "fhtw-uebung2.svg",
    },
    {
      name: "Übung aus Web Development",
      url: "https://fhtw-uebung1.thomasscheiber.com/",
      githubRepo: "https://github.com/t-scheiber/WebDevelopment/tree/master/FHTW_uebung_1_scheiber",
      favicon: "fhtw-uebung1.svg",
    },
    {
      name: "Alte Unternehmensseite Ribo Stein",
      url: "https://web.archive.org/web/20180413033202/http://www.ribo-stein.at/",
      githubRepo: "https://github.com/t-scheiber",
      favicon: "ribo-stein.png",
    },
  ];

  return (
    <ul className="list-none w-full m-0 p-0 justify-center relative">
      {projects.map((project, index) => {
        // Get favicon path - use local if available, fallback to Google's service
        const faviconSrc = project.favicon
          ? `/files/favicons/projects/${project.favicon}`
          : `https://www.google.com/s2/favicons?domain=${new URL(project.url).hostname}&sz=64`;

        return (
          <li key={index} className="list-none">
            <div
              className={`bg-white/20 backdrop-blur-md m-0 py-4 px-6 justify-center items-center relative flex transition-all duration-200 sm:py-3 sm:px-4 sm:text-base hover:bg-white/30 hover:backdrop-blur-none text-white! text-lg! font-normal drop-shadow-lg ${index !== projects.length - 1 ? "border-b border-white" : ""}`}
            >
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${project.name} project (opens in new tab)`}
              className="flex items-center flex-1 text-white! text-lg! font-normal drop-shadow-lg"
            >
                <span className="flex mr-4 sm:mb-0 bg-white/90 rounded-lg p-2">
                  <Image
                    src={faviconSrc}
                    alt={`${project.name} favicon`}
                    width={32}
                    height={32}
                    className="h-8 w-8 sm:h-7 sm:w-7"
                  />
                </span>
                {project.name}
            </a>
              <a
                href={project.githubRepo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.name} on GitHub (opens in new tab)`}
                className="ml-4 shrink-0 bg-white/90 rounded-lg p-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-4 sm:h-4 text-gray-800" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default memo(CodingProjectsList);


