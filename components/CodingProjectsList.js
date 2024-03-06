import styles from '../styles/Codingprojects.module.css';

const CodingProjectsList = () => {
  const projects = [
    // {
    //   name: 'Rock Paper Scissors App',
    //   url: 'https://thomasscheiber.com',
    // },
    {
      name: 'React Advanced Course: Portfolio App',
      url: 'https://advanced-react-course-portfolio.vercel.app/',
    },
    {
      name: 'React Basics Course: Simplest working Calculator App',
      url: 'https://react-basics-simplest-working-calculator-rho.vercel.app/',
    },
    {
      name: 'Weather App',
      url: 'https://t-scheiber.github.io/AK_WeatherApp/',
    },
    {
      name: 'Todo App',
      url: 'https://todo-app-tscheiber.vercel.app/',
    },
    {
      name: 'Calculator App',
      url: 'https://t-scheiber.github.io/CalculatorApp',
    },
    {
      name: 'Abschlussprojekt Web Development',
      url: 'https://fhtw-abschlussprojekt.thomasscheiber.com',
    },
    // 6 + 7 funktionieren nicht mehr
    // {
    //   name: 'Smart Home Steuerung',
    //   url: 'https://fhtw-uebung7.thomasscheiber.com/',
    // },
    // {
    //   name: 'Smart Home Steuerung',
    //   url: 'https://fhtw-uebung6.thomasscheiber.com/',
    // },
    {
      name: 'Smart Home Steuerung',
      url: 'https://fhtw-uebung5.thomasscheiber.com/',
    },
    {
      name: 'Patientenverwaltung',
      url: 'https://fhtw-uebung4.thomasscheiber.com/',
    },
    {
      name: 'Php Übungen',
      url: 'https://fhtw-uebung3.thomasscheiber.com/',
    },
    {
      name: 'Smart Home Controller App',
      url: 'https://fhtw-uebung2.thomasscheiber.com/',
    },
    {
      name: 'Übung aus Web Development',
      url: 'https://fhtw-uebung1.thomasscheiber.com/',
    },
    {
      name: 'Alte Unternehmensseite Ribo Stein',
      url: 'https://web.archive.org/web/20180413033202/http://www.ribo-stein.at/',
    },
  ];

  return (
    <ul className={styles.liste}>
      {projects.map((project, index) => (
        <a key={index} className={styles.links} href={project.url}>
          <li className={styles.eintrag}>{project.name}</li>
        </a>
      ))}
    </ul>
  );
};

export default CodingProjectsList;
