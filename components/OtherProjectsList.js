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
                width="40px"
                height="40px"
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
    href: "https://www.villadijana.eu/",
    logoSrc: "/files/logos/villadijana.png",
    name: "Villa Dijana",
  },
  {
    href: "https://www.europetalks.eu/",
    logoSrc: "/files/logos/europetalks.png",
    name: "Europe Talks",
  },
  {
    href: "https://www.mayr-dach.at/",
    logoSrc: "/files/logos/mayr.png",
    name: "Mayr Dach",
  },
  {
    href: "https://www.darat-thaimassage.at/",
    logoSrc: "/files/logos/darat.png",
    name: "Darat Thaimassage",
  },
  {
    href: "https://hd-projekt.at/",
    logoSrc: "/files/logos/hdp.png",
    name: "HD Projekt Baumanagement",
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
