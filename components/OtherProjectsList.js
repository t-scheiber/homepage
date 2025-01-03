import styles from "../styles/Otherprojects.module.css";
import Image from "next/image";

const LinkList = ({ links }) => {
  return (
    <ul className={styles.liste}>
      {links.map((link, index) => (
        <a key={index} className={styles.links} href={link.href}>
          <li className={styles.eintrag}>
            <span className={styles.logos}>
              <Image
                className={styles.images}
                alt={`${link.name} Logo`}
                src={link.logoSrc}
                width="40"
                height="40"
              />
            </span>
            {link.name}
          </li>
        </a>
      ))}
    </ul>
  );
};

const links = [
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

const OtherProjectsList = () => {
  return <LinkList links={links} />;
};

export default OtherProjectsList;
