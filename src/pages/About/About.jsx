import styles from "./About.module.css";

import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className={styles.about}>
      <h2>Sobre o Mini <span>Blog</span></h2>
      <p>Este projeto consiste em um blog feito com React no front-end e Firebase no back-end</p>
      <p>Projeto criado no curso <a href="https://www.udemy.com/course/react-do-zero-a-maestria-c-hooks-router-api-projetos/" target="_blank">React do Zero a Maestria (c/ hooks, router, API, Projetos)
      </a> de Matheus Battisti</p>

      <Link to="/posts/create" className="btn">Criar post</Link>
    </div>
  )
}

export default About