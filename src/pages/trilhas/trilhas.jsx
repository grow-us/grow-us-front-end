import React, { useState } from "react";
import "../../css/Home.css";
import Logo from "../../componetes/Logo.jsx";

import { FaPlus, FaCheck } from 'react-icons/fa';

export default function Trilhas() {

    // ======== LISTAS DE TRILHAS (AGORA COM TEXTOS REAIS) ========
    const [sugeridas] = useState([
        { title: "Kotlin", subtitle: "Desenvolvimento Android Moderno" },
        { title: "Java", subtitle: "Back-end com Spring Boot" },
        { title: "React", subtitle: "Front-end moderno com Hooks" },
        { title: "Node.js", subtitle: "APIs e Microsserviços" }
    ]);

    const [softSkills] = useState([
        {
            title: "Comunicação",
            desc: [
                "Melhore sua expressão",
                "Seja mais claro em equipe",
                "Desenvolva presença",
                "Aperfeiçoe conversas difíceis"
            ]
        },
        {
            title: "Inteligência Emocional",
            desc: [
                "Controle emocional",
                "Empatia nas relações",
                "Tomada de decisão",
                "Autoconsciência"
            ]
        }
    ]);

    const [hardSkills] = useState([
        {
            title: "React",
            desc: [
                "Componentes e Hooks",
                "Gerenciamento de Estado",
                "Integração com APIs",
                "Boas práticas modernas"
            ]
        },
        {
            title: "Kotlin",
            desc: [
                "Fundamentos da linguagem",
                "Android Jetpack",
                "Coroutines",
                "Arquiteturas modernas"
            ]
        }
    ]);

    const [emAndamento] = useState([
        { title: "Java", subtitle: "Programação Orientada a Objetos", pct: "70%" },
        { title: "Node.js", subtitle: "APIs REST", pct: "40%" }
    ]);

    const [concluidas] = useState([
        { title: "Python", subtitle: "Lógica de Programação" },
        { title: "Git/GitHub", subtitle: "Versionamento Moderno" }
    ]);

    // ======== ESTILOS ========
    const styles = {
        sectionTitle: { color: '#fff', fontSize: '0.9rem', marginBottom: '15px', textTransform: 'uppercase', fontWeight: 'bold' },
        title: { color: "white", fontSize: "0.95rem", fontWeight: "bold", marginBottom: "5px" },
        subtitle: { color: "#bbbbbb", fontSize: "0.75rem", marginBottom: "6px" },
        btnPurple: {
            background: '#9d00ff', color: 'white', border: 'none', borderRadius: '20px',
            padding: '8px 0', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer',
            marginTop: '15px', width: '100%', textTransform: 'uppercase', boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        },
        grid2Col: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }
    };

    return (
        <div className="home-container no-scroll">

            {/* ================= COLUNA ESQUERDA ================= */}
            <aside className="left-sidebar">
                <div className="logo-header">
                    <Logo color="white" size={22} />
                    <span translate="no" style={{ color: '#A100FF' }}>GrowUS</span>
                </div>

                <div className="widget">
                    <h3 style={styles.sectionTitle}>Trilhas Sugeridas</h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {sugeridas.map((item, i) => (
                            <div key={i} className="card" style={{ padding: '15px', position: 'relative' }}>
                                <p style={styles.title}>{item.title}</p>
                                <p style={styles.subtitle}>{item.subtitle}</p>

                                {/* Ícone de + no canto */}
                                <div style={{
                                    position: 'absolute', top: '10px', right: '10px',
                                    border: '1px solid #9d00ff', borderRadius: '4px',
                                    width: '18px', height: '18px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <FaPlus size={10} color="#9d00ff" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>

            {/* ================= COLUNA CENTRAL ================= */}
            <div className="center-column">

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0' }}>
                    <h1 style={{ color: 'white', fontSize: '1.8rem', lineHeight: '1.2', margin: 0 }}>
                        Trilhas de<br />Desenvolvimento
                    </h1>
                    <img src="./trilhas.svg" alt="Ilustração" style={{ height: '120px', opacity: 0.9 }} />
                </div>

                <main className="main-feed scrollable" style={{ paddingRight: '10px' }}>

                    {/* SOFT SKILLS */}
                    <div style={{ marginBottom: '30px' }}>
                        <h3 style={styles.sectionTitle}>SOFT SKILLS</h3>

                        <div style={styles.grid2Col}>
                            {softSkills.map((sk, i) => (
                                <div key={i} className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
                                    <p style={styles.title}>{sk.title}</p>

                                    {sk.desc.map((t, k) => (
                                        <p key={k} style={styles.subtitle}>{t}</p>
                                    ))}

                                    <button style={styles.btnPurple}>Inscrever-se</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* HARD SKILLS */}
                    <div style={{ paddingBottom: '20px' }}>
                        <h3 style={styles.sectionTitle}>HARD SKILLS</h3>

                        <div style={styles.grid2Col}>
                            {hardSkills.map((sk, i) => (
                                <div key={i} className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
                                    <p style={styles.title}>{sk.title}</p>

                                    {sk.desc.map((t, k) => (
                                        <p key={k} style={styles.subtitle}>{t}</p>
                                    ))}

                                    <button style={styles.btnPurple}>Inscrever-se</button>
                                </div>
                            ))}
                        </div>
                    </div>

                </main>
            </div>

            {/* ================= COLUNA DIREITA ================= */}
            <aside className="right-sidebar">

                <header className="right-header" style={{ justifyContent: 'flex-end', gap: '15px' }}>
                    <div className="icon-wrapper">
                        <img src="/message-square.svg" className="icon" alt="Mensagens" onClick={() => window.location.href = "/chat"} />
                        <span className="tooltip">Mensagens</span>
                    </div>
                    <div className="icon-wrapper">
                        <img src="/account.svg" className="icon icon-right" alt="Perfil" onClick={() => window.location.href = "/perfil"} />
                        <span className="tooltip">Perfil</span>
                    </div>
                    <div className="icon-wrapper">
                        <img src="./comunidades.svg" className="icon icon-right" alt="Comunidades" onClick={() => window.location.href = "/comunidades"} />
                        <span className="tooltip">Comunidades</span>
                    </div>
                </header>

                {/* EM ANDAMENTO */}
                <div className="widget" style={{ marginTop: '20px' }}>
                    <h3 style={styles.sectionTitle}>Em andamento</h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {emAndamento.map((item, i) => (
                            <div key={i} className="card" style={{ padding: '15px' }}>
                                <p style={styles.title}>{item.title}</p>
                                <p style={styles.subtitle}>{item.subtitle}</p>

                                <div style={{ width: '100%', height: '5px', background: '#333', borderRadius: '3px' }}>
                                    <div style={{ width: item.pct, height: '100%', background: '#9d00ff', borderRadius: '3px' }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CONCLUÍDAS */}
                <div className="widget">
                    <h3 style={styles.sectionTitle}>Concluídas</h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {concluidas.map((item, i) => (
                            <div key={i} className="card" style={{ padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ width: '80%' }}>
                                    <p style={styles.title}>{item.title}</p>
                                    <p style={styles.subtitle}>{item.subtitle}</p>
                                </div>

                                <div style={{
                                    width: '28px',
                                    height: '28px',
                                    borderRadius: '50%',
                                    background: '#9d00ff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <FaCheck color="white" size={14} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </aside>
        </div>
    );
}
