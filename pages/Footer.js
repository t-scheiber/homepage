import Link from "next/link";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link href="/">
        <span className="material-icons" style={{ fontSize: "44px" }}>
          home
        </span>{" "}
        Back to the Homepage
      </Link>
    </footer>
  );
};

export default Footer;
