import { Link } from 'react-router-dom';
import './App.css';
import Brazuca1 from './brazuca1.png';
import Brazuca2 from './brazuca2.png';
import Frame213 from './frame213.png';

import Logo from './componetes/Logo'

export default function App() {
  return (
    <>
      <header className="top">
        <div className="logo-container">
          <div className="img-top">
          <Logo color="black" size={22} />
          </div>
        <span className="logo-inicio" translate="no">GrowUS</span>
        </div>

        <nav className="div-top">
<Link to="/sobre" className="texto-top">SOBRE</Link>

        </nav>
      </header>

      <main className="div-semi-top">
        <div className="div-semi-top-0">
          <h1 className="texto-semi">Grow</h1>
          <h1 className="texto-semi">Stronger,</h1>
          <h1 className="texto-semi">Together</h1>
          <div className="div-botoes-semi">
            <Link to="/cadastro">
              <button className="btn-conectar">Cadastre-se</button>
            </Link>
            <Link to="/login" className="btn-login-link">
              <button className="btn-login">Login</button>
            </Link>
          </div>
        </div>

        <img
          className="img-semi-top"
          src={Brazuca1}
          alt="Ilustração de um navegador"
        />
      </main>

      <main className="main-2">
        {/* Seção 1: Comunidade */}
        <section className="feature-section community-section">
          <div className="content-wrapper">
            <div className="illustration-container">
              <img
                src={Brazuca2}
                alt="Ilustração de uma pessoa correndo com uma tela de navegador no fundo"
              />
            </div>
            <div className="text-container">
              <h1>Faça Parte De Uma Comunidade</h1>
              <p style={{ color: 'white' }}>
                Participe de um ambiente onde você pode colaborar, trocar experiências,
                solucionar desafios em conjunto e compartilhar conhecimento com outros profissionais da área!
              </p>
            </div>
          </div>
        </section>

        {/* Seção 2: Especialistas */}
        <section className="feature-section specialists-section">
          <div className="content-wrapper">
            <div className="illustration-container">
              <img
                src={Frame213}
                alt="Ilustração de um grupo de três pessoas interagindo"
              />
            </div>
            <div className="text-container">
              <h1>Dê Match Com Especialistas</h1>
              <p style={{ color: 'white' }}>
                Dê match com profissionais cujas respostas, skills e interesses complementam
                e aceleram sua jornada na carreira.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}