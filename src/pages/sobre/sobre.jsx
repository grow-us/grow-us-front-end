// Sobre.jsx
export default function Sobre() {
  return (
    <div style={styles.pageWrapper}>
      {/* Importando a fonte Outfit do Google Fonts apenas para garantir a visualização */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;700;800&display=swap');`}
      </style>

      <div style={styles.contentContainer}>
        
        {/* Header Hero */}
        <header style={styles.header}>
          <h1 style={styles.title}>
            Sobre o <span style={styles.highlight}>GrowUs</span>
          </h1>
          <p style={styles.subtitleMain}>
            Conectando pessoas. Transformando carreiras. Impulsionando talento.
          </p>
        </header>

        <main style={styles.main}>
          {/* Seção 1: O que é */}
          <section style={styles.section}>
            <h2 style={styles.subtitle}>O que é o GrowUs?</h2>
            <p style={styles.text}>
              O <strong>GrowUs</strong> é uma plataforma criada para incentivar o
              desenvolvimento contínuo por meio de <strong>mentorias</strong>,
              <strong> comunidades de prática</strong> e
              <strong> trilhas de aprendizado personalizadas</strong>.
              A ideia é aproximar profissionais experientes de talentos em início
              de jornada, fortalecendo uma cultura de colaboração.
            </p>
          </section>

          {/* Seção 2: Cards (Como funciona) */}
          <section style={styles.section}>
            <h2 style={styles.subtitle}>Como funciona?</h2>
            <div style={styles.gridContainer}>
              
              <div style={styles.card}>
                <div style={styles.icon}>🧭</div>
                <h3 style={styles.cardTitle}>Trilhas</h3>
                <p style={styles.cardText}>
                  Conteúdos, desafios e metas alinhados às principais competências do mercado.
                </p>
              </div>

              <div style={styles.card}>
                <div style={styles.icon}>💬</div>
                <h3 style={styles.cardTitle}>Comunidades</h3>
                <p style={styles.cardText}>
                  Espaços seguros para conversar, trocar experiências e aprender de forma colaborativa.
                </p>
              </div>

              <div style={styles.card}>
                <div style={styles.icon}>👥</div>
                <h3 style={styles.cardTitle}>Mentoria</h3>
                <p style={styles.cardText}>
                  Tanto seniors quanto juniors ensinam, aprendem e crescem lado a lado.
                </p>
              </div>

            </div>
          </section>

          {/* Seção 3: Origem e Visão */}
          <section style={styles.sectionRow}>
            <div style={styles.halfSection}>
              <h2 style={styles.subtitle}>De onde surgiu?</h2>
              <p style={styles.text}>
                Projeto desenvolvido pela <strong>Squad 26</strong> (TADS049 - Senac PE) 
                para o <strong>Desafio Rise Up</strong> do <strong>Porto Digital</strong>.
                Apoiamos uma cultura onde o desenvolvimento individual move o coletivo.
              </p>
            </div>
            <div style={styles.halfSection}>
              <h2 style={styles.subtitle}>Nossa Visão</h2>
              <p style={styles.text}>
                Ser um ecossistema onde aprender, evoluir e compartilhar conhecimento
                faça parte da rotina de todos — independentemente do nível de carreira.
              </p>
            </div>
          </section>
        </main>

        <footer style={styles.footer}>
          <p style={styles.footerText}>
            © {new Date().getFullYear()} GrowUs — Desafio Rise Up | Porto Digital
          </p>
        </footer>
      </div>
    </div>
  );
}

const styles = {
  // Wrapper principal com o gradiente solicitado e fonte Outfit
  pageWrapper: {
    width: "100%",
    minHeight: "100vh", // Garante que cubra a tela, mas permite scroll nativo
    background: "linear-gradient(180deg, #180D59 0%, #30177A 100%)",
    fontFamily: '"Outfit", sans-serif',
    color: "#ffffff",
    display: "flex",
    justifyContent: "center",
  },

  contentContainer: {
    width: "100%",
    maxWidth: "1000px",
    padding: "4rem 2rem",
    boxSizing: "border-box",
  },

  header: {
    textAlign: "center",
    marginBottom: "4rem",
  },

  title: {
    fontSize: "3.5rem",
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: "-1px",
    margin: 0,
    lineHeight: 1.1,
  },

highlight: {
    textShadow: "2px 2px 6px rgba(0, 0, 0, 1)",
    color: "#A100FF",
},


  subtitleMain: {
    marginTop: "1.5rem",
    fontSize: "1.25rem",
    color: "#cbd5e1", // Cinza claro (Slate 300)
    maxWidth: "600px",
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: "300",
  },

  main: {
    display: "flex",
    flexDirection: "column",
    gap: "5rem",
  },

  section: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },

  sectionRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "4rem",
    marginTop: "2rem",
  },

  halfSection: {
    flex: "1 1 300px",
  },

  subtitle: {
    fontSize: "2rem",
    color: "#ffffff",
    fontWeight: "700",
    marginBottom: "0.5rem",
  },

  text: {
    fontSize: "1.125rem",
    color: "#e2e8f0", // Cinza bem claro (Slate 200)
    lineHeight: 1.8,
    margin: 0,
    fontWeight: "300",
  },

  gridContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1.5rem",
    marginTop: "1rem",
  },

  // Estilo "Glassmorphism" para os cards (Translúcidos)
  card: {
    flex: "1 1 280px",
    background: "rgba(255, 255, 255, 0.05)", // Fundo semi-transparente
    backdropFilter: "blur(10px)", // Efeito de desfoque atrás (se o navegador suportar)
    padding: "2rem",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.1)", // Borda sutil
    transition: "transform 0.2s ease, background 0.3s ease",
  },

  icon: {
    fontSize: "2rem",
    marginBottom: "1rem",
  },

  cardTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: "0.75rem",
  },

  cardText: {
    fontSize: "1rem",
    color: "#cbd5e1",
    lineHeight: 1.6,
    fontWeight: "300",
  },

  footer: {
    marginTop: "6rem",
    paddingTop: "2rem",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)", // Borda quase invisível
    textAlign: "center",
  },

  footerText: {
    color: "#94a3b8", // Cinza médio
    fontSize: "0.875rem",
  },
};