import React, { useEffect, useState } from "react";
import "../../css/Perfil.css";
import Logo from "../../componetes/Logo";
import { FaRegCommentDots, FaBell, FaBars } from "react-icons/fa";

export default function Perfil() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await fetch("https://app-zxlyzt4g3q-uc.a.run.app/eventos");
        if (!response.ok) throw new Error("Erro ao buscar eventos");
        const data = await response.json();
        setEventos(data);
      } catch (error) {
        console.error("Erro ao carregar eventos:", error);
      }
    };
    fetchEventos();
  }, []);

  return (
    <div className="perfil-container no-scroll">
      {/* ===== COLUNA ESQUERDA ===== */}
      <aside className="left-sidebar">
        <div className="logo-header">
          <Logo color="black" size={22} />
          <span translate="no">GrowUS</span>
        </div>

        <div className="widget card conquistas-card">
          <h3>Conquistas</h3>
          <div className="conquistas-grid">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="conquista-placeholder"></div>
            ))}
          </div>
        </div>

        {/* --- PONTOS SEM BARRA --- */}
        <div className="widget card pontos-card">
          <h3>Pontos de Conquista:</h3>
          <div className="pontos-texto">1200 pts 🏅</div>
        </div>
      </aside>

      {/* ===== COLUNA CENTRAL ===== */}
      <main className="perfil-main card">
        {/* --- CABEÇALHO DO PERFIL --- */}
        <div className="perfil-header">
          <div className="perfil-dados">
            <div className="perfil-avatar"></div>
            <div className="perfil-info">
              <h2>Nome do Usuário</h2>
              <p>@usuario123</p>
            </div>
          </div>

          {/* Texto "Perfil" ao lado direito */}
          <div className="perfil-titulo">
            <h2>Perfil</h2>
          </div>
        </div>

        {/* --- CONTEÚDO DO PERFIL --- */}
        <div className="perfil-conteudo">
          <section className="perfil-section">
            <h3>Sobre Mim</h3>
            <p>
              Sou uma pessoa apaixonada por tecnologia, inovação e aprendizado contínuo.
              Busco sempre contribuir em projetos que impactem positivamente a sociedade.
            </p>
          </section>

          <section className="perfil-section">
            <h3>Objetivo</h3>
            <p>
              Evoluir profissionalmente na área de desenvolvimento web, com foco em
              soluções escaláveis e eficientes.
            </p>
          </section>

          <section className="perfil-section">
            <h3>Carreira</h3>
            <p>
              Desenvolvedor Front-End com 3 anos de experiência em React e JavaScript,
              atuando em projetos colaborativos e ágeis.
            </p>
          </section>

          <section className="perfil-section">
            <h3>Skills</h3>
            <div className="skills-list">
              {["React", "Node.js", "HTML", "CSS", "Git", "Figma"].map((skill, i) => (
                <span key={i} className="skill-badge">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* ===== COLUNA DIREITA ===== */}
      <aside className="right-sidebar">
        <header className="right-header">
          <FaRegCommentDots className="icon" />
          <FaBell className="icon" />
          <FaBars className="icon" />
        </header>

        <div className="widget card eventos-lista">
          <h3>Eventos</h3>
          {eventos.length === 0 ? (
            <p>Carregando...</p>
          ) : (
            eventos.slice(0, 4).map((evento, i) => (
              <div key={i} className="evento-item">
                <div className="evento-textos">
                  <p className="evento-titulo">{evento.titulo}</p>
                  <button className="btn-inscrever">Inscrever-se</button>
                </div>
              </div>
            ))
          )}
        </div>
      </aside>
    </div>
  );
}
