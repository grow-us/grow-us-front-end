import React, { useEffect, useState } from "react";
import "../../css/Perfil.css";
import Logo from "../../componetes/Logo";
import { FaRegCommentDots, FaBell, FaBars, FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Perfil() {
    const navigate = useNavigate();

    const [eventos, setEventos] = useState([]);
    const [index, setIndex] = useState(0);

    // Dados do usuário vindos do localStorage
    const [usuarioNome, setUsuarioNome] = useState("");
    const [usuarioCargo, setUsuarioCargo] = useState("");
    const [usuarioPerfilImg, setUsuarioPerfilImg] = useState("");
    const [hardSkills, setHardSkills] = useState([]);
    const [softSkills, setSoftSkills] = useState([]);

    // Textos dinâmicos (com valores default)
    const [sobreMim, setSobreMim] = useState(
        "Sou uma pessoa apaixonada por tecnologia, inovação e aprendizado contínuo. Busco sempre contribuir em projetos que impactem positivamente a sociedade."
    );

    const [objetivo, setObjetivo] = useState(
        "Evoluir profissionalmente na área de desenvolvimento web, com foco em soluções escaláveis e eficientes."
    );

    const [carreira, setCarreira] = useState(
        "Desenvolvedor Front-End com 3 anos de experiência em React e JavaScript, atuando em projetos colaborativos e ágeis."
    );

    // Controle edição
    const [editando, setEditando] = useState({
        sobre: false,
        objetivo: false,
        carreira: false,
    });

    // =================================================================
    // CORREÇÃO 1: Carregar dados do localStorage ao iniciar
    // =================================================================
    useEffect(() => {
        // Carregar do localStorage
        const nome = localStorage.getItem("nome");
        const perfil = localStorage.getItem("perfil"); // link da imagem
        const cargo = localStorage.getItem("cargo");

        const objetivoStorage = localStorage.getItem("objetivo");
        const carreiraStorage = localStorage.getItem("carreira");
        const sobreStorage = localStorage.getItem("sobre");

        // Skills vindas do LocalStorage
        const hard = JSON.parse(localStorage.getItem("hardSkills")) || [];
        const soft = JSON.parse(localStorage.getItem("softSkills")) || [];

        setHardSkills(hard);
        setSoftSkills(soft);

        // Atualiza os estados (só se existir algo no localStorage)
        if (nome) setUsuarioNome(nome);
        if (cargo) setUsuarioCargo(cargo);
        if (perfil) setUsuarioPerfilImg(perfil);

        // Atualiza os estados de texto
        if (sobreStorage) setSobreMim(sobreStorage);
        if (objetivoStorage) setObjetivo(objetivoStorage);
        if (carreiraStorage) setCarreira(carreiraStorage);
    }, []);

    // =================================================================
    // CORREÇÃO 2: Função para SALVAR no localStorage
    // =================================================================
    const handleSalvar = (campo) => {
        // 1. Salva o estado atual no localStorage
        if (campo === "sobre") {
            localStorage.setItem("sobre", sobreMim);
        } else if (campo === "objetivo") {
            localStorage.setItem("objetivo", objetivo);
        } else if (campo === "carreira") {
            localStorage.setItem("carreira", carreira);
        }

        // 2. Fecha o modo de edição para aquele campo
        setEditando((prev) => ({ ...prev, [campo]: false }));
    };

    // =================================================================
    // 🔑 NOVO: Função para SALVAR com a tecla ENTER
    // =================================================================
    const handleKeyDown = (e, campo) => {
        // Verifica se a tecla pressionada é ENTER (código 13)
        if (e.key === 'Enter') {
            // Previne a quebra de linha padrão do textarea
            e.preventDefault(); 
            // Salva e fecha o modo de edição
            handleSalvar(campo);
        }
    };

    // Fetch de eventos (sem alteração)
    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const response = await fetch(
                    "https://app-zxlyzt4g3q-uc.a.run.app/eventos"
                );
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
                        {/* IMAGEM DE PERFIL DINÂMICA */}
                        <div className="perfil-avatar">
                            {usuarioPerfilImg ? (
                                <img src={usuarioPerfilImg} alt="Avatar" className="avatar-img" />
                            ) : (
                                <div className="avatar-placeholder"></div>
                            )}
                        </div>

                        <div className="perfil-info">
                            <h2>{usuarioNome || "Nome do Usuário"}</h2>
                            <p>{usuarioCargo || "Cargo"}</p>
                        </div>
                    </div>

                    <div className="perfil-titulo">
                        <h2>Perfil</h2>
                    </div>
                </div>

                {/* --- CONTEÚDO DO PERFIL --- */}
                <div className="perfil-conteudo">
                    {/* SOBRE MIM */}
                    <section className="perfil-section">
                        <div className="perfil-section-header">
                            <h3>Sobre Mim</h3>

                            {!editando.sobre ? (
                                <button
                                    className="editar-btn"
                                    onClick={() =>
                                        setEditando({ ...editando, sobre: true })
                                    }
                                >
                                    <FaRegEdit />
                                </button>
                            ) : (
                                // Botão Salvar REMOVIDO
                                <span className="salvando-status">Editando...</span>
                            )}
                        </div>

                        {!editando.sobre ? (
                            <p>{sobreMim}</p>
                        ) : (
                            <textarea
                                className="textarea-editar"
                                // 🔑 NOVO: onKeyDown para salvar no ENTER
                                onKeyDown={(e) => handleKeyDown(e, 'sobre')}
                                // 🔑 onBlur para salvar ao clicar fora (mantido)
                                onBlur={() => handleSalvar("sobre")} 
                                value={sobreMim}
                                onChange={(e) => setSobreMim(e.target.value)}
                                autoFocus
                            />
                        )}
                    </section>

                    {/* OBJETIVO */}
                    <section className="perfil-section">
                        <div className="perfil-section-header">
                            <h3>Objetivo</h3>

                            {!editando.objetivo ? (
                                <button
                                    className="editar-btn"
                                    onClick={() =>
                                        setEditando({ ...editando, objetivo: true })
                                    }
                                >
                                    <FaRegEdit />
                                </button>
                            ) : (
                                // Botão Salvar REMOVIDO
                                <span className="salvando-status">Editando...</span>
                            )}
                        </div>

                        {!editando.objetivo ? (
                            <p>{objetivo}</p>
                        ) : (
                            <textarea
                                className="textarea-editar"
                                // 🔑 NOVO: onKeyDown para salvar no ENTER
                                onKeyDown={(e) => handleKeyDown(e, 'objetivo')}
                                // 🔑 onBlur para salvar ao clicar fora (mantido)
                                onBlur={() => handleSalvar("objetivo")}
                                value={objetivo}
                                onChange={(e) => setObjetivo(e.target.value)}
                                autoFocus
                            />
                        )}
                    </section>

                    {/* CARREIRA */}
                    <section className="perfil-section">
                        <div className="perfil-section-header">
                            <h3>Carreira</h3>

                            {!editando.carreira ? (
                                <button
                                    className="editar-btn"
                                    onClick={() =>
                                        setEditando({ ...editando, carreira: true })
                                    }
                                >
                                    <FaRegEdit />
                                </button>
                            ) : (
                                // Botão Salvar REMOVIDO
                                <span className="salvando-status">Editando...</span>
                            )}
                        </div>

                        {!editando.carreira ? (
                            <p>{carreira}</p>
                        ) : (
                            <textarea
                                className="textarea-editar"
                                // 🔑 NOVO: onKeyDown para salvar no ENTER
                                onKeyDown={(e) => handleKeyDown(e, 'carreira')}
                                // 🔑 onBlur para salvar ao clicar fora (mantido)
                                onBlur={() => handleSalvar("carreira")}
                                value={carreira}
                                onChange={(e) => setCarreira(e.target.value)}
                                autoFocus
                            />
                        )}
                    </section>

                    {/* SKILLS */}
                    <section className="perfil-section">
                        <div className="perfil-section-header">
                            <h3>Skills</h3>
                            <button
                                className="editar-skill-btn"
                                onClick={() => navigate("/skills")}
                            >
                                <FaRegEdit /> 
                            </button>
                        </div>

                        <h4 className="skills-titulo">Hard Skills</h4>
                        <div className="skills-list">
                            {hardSkills.length === 0 ? (
                                <p className="placeholder">Nenhuma Hard Skill adicionada ainda.</p>
                            ) : (
                                hardSkills.map((skill, i) => (
                                    <span key={i} className="skill-badge">{skill}</span>
                                ))
                            )}
                        </div>

                        <h4 className="skills-titulo">Soft Skills</h4>
                        <div className="skills-list">
                            {softSkills.length === 0 ? (
                                <p className="placeholder">Nenhuma Soft Skill adicionada ainda.</p>
                            ) : (
                                softSkills.map((skill, i) => (
                                    <span key={i} className="skill-badge">{skill}</span>
                                ))
                            )}
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

                <div className="widget card eventos-proximos-perfil">
                    <h3>Eventos</h3>

                    {eventos.length === 0 ? (
                        <p>Carregando...</p>
                    ) : (
                        <div className="lista-eventos-home">
                            {eventos.map((evento, i) => (
                                <div key={i} className="evento-home-card">
                                    <img
                                        src={evento.img}
                                        alt={evento.titulo}
                                        className="evento-home-img"
                                    />
                                    <div className="evento-home-info">
                                        <h4>{evento.titulo}</h4>
                                        <p className="local">{evento.localidade}</p>
                                        <p className="data">
                                            {new Date(evento.dia).toLocaleDateString("pt-BR", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </p>
                                        <button className="btn-inscrever">Inscrever-se</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </aside>
        </div>
    );
}