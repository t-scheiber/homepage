import Image from "next/image";
import styles from "../styles/Certifications.module.css";
// Import images
import metaLogo from "/public/files/logos/meta.png";
import awsLogo from "/public/files/logos/aws.png";
import googleLogo from "/public/files/logos/google.png";
import efLogo from "/public/files/logos/EF.png";
import cambridgeLogo from "/public/files/logos/cambridge.png";
import ecdlLogo from "/public/files/logos/ecdl.png";
import ecpatLogo from "/public/files/logos/ecpat.png";
import scuolaLdVLogo from "/public/files/logos/scuolaLdV.png";

function CertificatesList() {
  const certificates = [
    {
      href: "/files/pdf/Meta_Certificate.pdf",
      src: metaLogo,
      alt: "Meta Logo",
      title: "Meta Front-End Developer",
    },
    {
      href: "/files/pdf/AWS_Certificate.pdf",
      src: awsLogo,
      alt: "AWS Logo",
      title: "AWS Cloud Solutions Architect",
    },
    // Note: Assuming Google logo is reused for multiple certificates
    {
      href: "/files/pdf/IT-Automation-Python_Certificate.pdf",
      src: googleLogo,
      alt: "Google Logo",
      title: "Google IT Automation with Python",
    },
    {
      href: "/files/pdf/IT-Support_Certificate.pdf",
      src: googleLogo,
      alt: "Google Logo",
      title: "Google IT Support",
    },
    {
      href: "/files/pdf/EF_Certificate.pdf",
      src: efLogo,
      alt: "EF Logo",
      title: "EF Language School C1",
    },
    {
      href: "/files/pdf/FCE_Certificate.pdf",
      src: cambridgeLogo,
      alt: "Cambridge Logo",
      title: "Cambridge English: First",
    },
    {
      href: "/files/pdf/ECDL.pdf",
      src: ecdlLogo,
      alt: "ECDL Logo",
      title: "ECDL",
    },
    {
      href: "/files/pdf/makeITsafe_Certificate.pdf",
      src: ecpatLogo,
      alt: "Ecpat Logo",
      title: "make IT safe 2.0",
    },
    {
      href: "/files/pdf/Italian_Language_Certificate.pdf",
      src: scuolaLdVLogo,
      alt: "Scuola Leonardo da Vinci Logo",
      title: "Italian Language B1",
    },
  ];

  return (
    <ul className={styles.liste}>
      {certificates.map(({ href, src, alt, title }) => (
        <a key={href} className={styles.links} href={href}>
          <li className={styles.eintrag}>
            <span className={styles.logos}>
              <Image
                className={styles.images}
                alt={alt}
                src={src}
                width="40"
                height="40"
              />
            </span>
            {title}
          </li>
        </a>
      ))}
    </ul>
  );
}

export default CertificatesList;
