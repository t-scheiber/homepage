import { memo } from "react";
import Image from "next/image";

interface Link {
  href: string;
  logoSrc: string;
  name: string;
}

interface LinkListProps {
  links: Link[];
}

const LinkList: React.FC<LinkListProps> = ({ links }) => {
  return (
    <ul className="list-none w-full m-0 p-0 justify-center relative">
      {links.map((link, index) => (
        <li key={index} className="list-none">
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${link.name} website (opens in new tab)`}
            className={`bg-white/20 backdrop-blur-md m-0 py-4 px-6 justify-center items-center relative flex transition-all duration-200 sm:py-3 sm:px-4 sm:text-base hover:bg-white/30 hover:backdrop-blur-none text-white! text-lg! font-normal drop-shadow-lg ${index !== links.length - 1 ? "border-b border-white" : ""}`}
          >
            <span className="flex mr-4 sm:mr-3 bg-white/90 rounded-lg p-2 shrink-0">
              <Image
                alt={`${link.name} logo`}
                src={link.logoSrc}
                width={40}
                height={40}
                className="w-10 h-10 sm:w-9 sm:h-9"
              />
            </span>
            <span>{link.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};

const links: Link[] = [
  {
    href: "https://hd-architekten.at/",
    logoSrc: "/files/logos/hda.png",
    name: "HD Architekten",
  },
  {
    href: "https://hd-projekt.at/",
    logoSrc: "/files/logos/hdp.png",
    name: "HD Projekt Baumanagement",
  },
  {
    href: "https://www.villa-claudia.eu/",
    logoSrc: "/files/logos/villaclaudia.png",
    name: "Villa Claudia",
  },
  {
    href: "https://www.villadijana.eu/",
    logoSrc: "/files/logos/villadijana.png",
    name: "Villa Dijana",
  },
  {
    href: "https://www.cloud.europetalks.eu/",
    logoSrc: "/files/logos/europetalks.png",
    name: "EuropeTalks Cloud",
  },
  {
    href: "https://www.mayr-dach.thomasscheiber.com/",
    logoSrc: "/files/logos/mayr.png",
    name: "Mayr Dach",
  },
  {
    href: "https://www.darat-thaimassage.at/",
    logoSrc: "/files/logos/darat.png",
    name: "Darat Thaimassage",
  },

  {
    href: "https://jugendlichefuerjugendliche.wordpress.com/",
    logoSrc: "/files/logos/ju4ju.png",
    name: "Jugendliche fuer Jugendliche",
  },
];

const OtherProjectsList: React.FC = () => {
  return <LinkList links={links} />;
};

export default memo(OtherProjectsList);
