import { memo } from "react";
import Image from "next/image";

interface Link {
  href?: string;
  logoSrc: string;
  name: string;
}

interface LinkListProps {
  links: Link[];
}

const LinkList: React.FC<LinkListProps> = ({ links }) => {
  return (
    <ul className="list-none w-full m-0 p-0 justify-center relative">
      {links.map((link, index) => {
        const Entry = link.href ? "a" : "div";
        return (
        <li key={index} className="list-none">
          <Entry
            href={link.href}
            target={link.href ? "_blank" : undefined}
            rel={link.href ? "noopener noreferrer" : undefined}
            aria-label={link.href ? `Visit ${link.name} website (opens in new tab)` : undefined}
            className="collection-row"
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
            <span>{link.name}{!link.href && <span className="mt-1 block text-sm text-slate-200">Past project · Public site unavailable</span>}</span>
          </Entry>
        </li>
      );})}
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
    href: "https://villa-claudia.eu/",
    logoSrc: "/files/logos/villaclaudia.png",
    name: "Villa Claudia",
  },
  {
    href: "https://villadijana.eu/",
    logoSrc: "/files/logos/villadijana.png",
    name: "Villa Dijana",
  },
  {
    logoSrc: "/files/logos/europetalks.png",
    name: "EuropeTalks Cloud",
  },
  {
    href: "https://darat-thaimassage.at/",
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
