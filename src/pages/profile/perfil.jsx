import React, { useEffect, useState } from "react";
import "../../css/perfil.css";
import Logo from "../../componetes/Logo";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Perfil() {
    const navigate = useNavigate();
    const API_BASE_URL = "https://app-zxlyzt4g3q-uc.a.run.app";

    const [eventosInscritos, setEventosInscritos] = useState([]);
    const [emblemas, setEmblemas] = useState([]);

    // Dados do usuário
    const [usuarioNome, setUsuarioNome] = useState("");
    const [usuarioCargo, setUsuarioCargo] = useState("");
    const [usuarioPerfilImg, setUsuarioPerfilImg] = useState("");
    const [hardSkills, setHardSkills] = useState([]);
    const [softSkills, setSoftSkills] = useState([]);
    const [sobreMim, setSobreMim] = useState("");
    const [objetivos, setObjetivos] = useState("");
    const [carreira, setCarreira] = useState("");
    const [editando, setEditando] = useState({
        sobre: false,
        objetivos: false,
        carreira: false,
    });

    // Carregar dados iniciais do localStorage
    useEffect(() => {
        const nome = localStorage.getItem("nome");
        const perfil = localStorage.getItem("perfil");
        const cargo = localStorage.getItem("cargo");
        const hard = JSON.parse(localStorage.getItem("hardSkills")) || [];
        const soft = JSON.parse(localStorage.getItem("softSkills")) || [];

        setHardSkills(hard);
        setSoftSkills(soft);
        if (nome) setUsuarioNome(nome);
        if (cargo) setUsuarioCargo(cargo);
        if (perfil) setUsuarioPerfilImg(perfil);

        const sobreStorage = localStorage.getItem("sobre");
        const objetivosStorage = localStorage.getItem("objetivos");
        const carreiraStorage = localStorage.getItem("carreira");
        if (sobreStorage) setSobreMim(sobreStorage);
        if (objetivosStorage) setObjetivos(objetivosStorage);
        if (carreiraStorage) setCarreira(carreiraStorage);
    }, []);

    const handleSalvar = (campo) => {
        if (campo === "sobre") localStorage.setItem("sobre", sobreMim);
        else if (campo === "objetivos") localStorage.setItem("objetivo", objetivos);
        else if (campo === "carreira") localStorage.setItem("carreira", carreira);
        setEditando((prev) => ({ ...prev, [campo]: false }));
    };

    const handleKeyDown = (e, campo) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSalvar(campo);
        }
    };

    // ============= Carregar eventos inscritos =============
    const fetchEventosInscritos = async () => {
        const email = localStorage.getItem("email");
        if (!email) return;

        try {
            const res = await fetch(`${API_BASE_URL}/eventos/inscricoes/${email}`);
            if (!res.ok) throw new Error("Falha ao buscar inscrições");
            const eventos = await res.json();
            setEventosInscritos(eventos);
        } catch (error) {
            console.error("Erro ao carregar eventos inscritos:", error);
        }
    };

    // ============= Carregar emblemas =============
    const fetchEmblemas = async () => {
        const email = localStorage.getItem("email");
        if (!email) return;

        try {
            const res = await fetch(`${API_BASE_URL}/emblemas/${email}`);
            if (!res.ok) throw new Error("Falha ao buscar emblemas");
            const embs = await res.json();
            setEmblemas(embs);
        } catch (error) {
            console.error("Erro ao carregar emblemas:", error);
        }
    };

    // ============= Cancelar inscrição =============
    const handleCancelarInscricao = async (idEvento) => {
        const email = localStorage.getItem("email");
        if (!email) {
            alert("Usuário não autenticado.");
            return;
        }

        try {
            
            const res = await fetch(`${API_BASE_URL}/eventos/inscricoes/${email}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idEvento }),
            });

            const data = await res.json();

            if (res.ok) {
                setEventosInscritos(prev => prev.filter(e => e.id !== idEvento));
                alert("Inscrição cancelada com sucesso!");
            } else {
                alert(data.error || "Erro ao cancelar inscrição.");
            }
        } catch (error) {
            console.error("Erro de rede:", error);
            alert("Erro de conexão com o servidor.");
        }
    };

    // Carregar ao montar
    useEffect(() => {
        fetchEventosInscritos();
        fetchEmblemas();
    }, []);

    return (
        <div className="perfil-container no-scroll">
            {/* COLUNA ESQUERDA: Emblemas pequenos */}
            <aside className="left-sidebar">
                <div className="logo-header">
                    <Logo color="black" size={22} />
                    <span translate="no">GrowUS</span>
                </div>

                <div className="widget card conquistas-card">
                    <h3>Emblemas</h3>
                    {emblemas.length === 0 ? (
                        <p style={{ fontSize: "0.85rem", opacity: 0.7, textAlign: "center" }}>
                            Nenhum emblema ainda
                        </p>
                    ) : (
                        <div className="emblemas-grid-pequeno">
                            {emblemas.map((emb, i) => (
                                <div key={i} className="emblema-item-pequeno">
                                    <img
                                        src={emb.img?.trim() || "https://via.placeholder.com/40"}
                                        alt={emb.titulo}
                                        className="emblema-icon-pequeno"
                                        title={emb.titulo}

                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="widget card pontos-card">
                    <h3>Pontos:</h3>
                        <div className="pontos-texto">{emblemas.length * 100} pts 🏅</div>
                </div>
            </aside>

            {/* COLUNA CENTRAL: Dados do perfil */}
            <main className="perfil-main card">
                <div className="perfil-header">
                    <div className="perfil-dados">
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

                <div className="perfil-conteudo">
                    {/* Seções de texto (Sobre, Objetivos, Carreira, Skills) — mantidas iguais */}
                    <section className="perfil-section">
                        <div className="perfil-section-header">
                            <h3>Sobre Mim</h3>
                            {!editando.sobre ? (
                                <button className="editar-btn" onClick={() => setEditando({ ...editando, sobre: true })}>
                                    <FaRegEdit />
                                </button>
                            ) : (
                                <span className="salvando-status">Editando...</span>
                            )}
                        </div>
                        {!editando.sobre ? (
                            <p>{sobreMim}</p>
                        ) : (
                            <textarea
                                className="textarea-editar"
                                onKeyDown={(e) => handleKeyDown(e, 'sobre')}
                                onBlur={() => handleSalvar("sobre")}
                                value={sobreMim}
                                onChange={(e) => setSobreMim(e.target.value)}
                                autoFocus
                            />
                        )}
                    </section>

                    <section className="perfil-section">
                        <div className="perfil-section-header">
                            <h3>Objetivos</h3>
                            {!editando.objetivos ? (
                                <button className="editar-btn" onClick={() => setEditando({ ...editando, objetivos: true })}>
                                    <FaRegEdit />
                                </button>
                            ) : (
                                <span className="salvando-status">Editando...</span>
                            )}
                        </div>
                        {!editando.objetivos ? (
                            <p>{objetivos}</p>
                        ) : (
                            <textarea
                                className="textarea-editar"
                                onKeyDown={(e) => handleKeyDown(e, 'objetivos')}
                                onBlur={() => handleSalvar("objetivos")}
                                value={objetivos}
                                onChange={(e) => setObjetivos(e.target.value)}
                                autoFocus
                            />
                        )}
                    </section>

                    <section className="perfil-section">
                        <div className="perfil-section-header">
                            <h3>Carreira</h3>
                            {!editando.carreira ? (
                                <button className="editar-btn" onClick={() => setEditando({ ...editando, carreira: true })}>
                                    <FaRegEdit />
                                </button>
                            ) : (
                                <span className="salvando-status">Editando...</span>
                            )}
                        </div>
                        {!editando.carreira ? (
                            <p>{carreira}</p>
                        ) : (
                            <textarea
                                className="textarea-editar"
                                onKeyDown={(e) => handleKeyDown(e, 'carreira')}
                                onBlur={() => handleSalvar("carreira")}
                                value={carreira}
                                onChange={(e) => setCarreira(e.target.value)}
                                autoFocus
                            />
                        )}
                    </section>

                    <section className="perfil-section">
                        <div className="perfil-section-header">
                            <h3>Skills</h3>
                            <button className="editar-skill-btn" onClick={() => navigate("/skills")}>
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

            {/* COLUNA DIREITA: Eventos inscritos com botão de cancelar */}
            <aside className="right-sidebar">
                <header className="right-header">
                    <div className="icon-wrapper">
                        <img 
                            src="../../../public/message-square.svg" 
                            alt="Mensagens" 
                            className="icon"
                            onClick={() => window.location.href = "/chat"}
                            style={{ cursor: "pointer" }}
                        />
                        <span className="tooltip">Mensagens</span>
                    </div>
                    <div className="icon-wrapper">
                        <img 
                            src="../../../public/menu.svg" 
                            alt="Início" 
                            className="icon"
                            onClick={() => window.location.href = "/home"}
                            style={{ cursor: "pointer" }}
                        />
                        <span className="tooltip">Início</span>
                    </div>
                </header>

                <div className="widget card eventos-proximos-perfil">
                    <h3>Meus Eventos</h3>
                    {eventosInscritos.length === 0 ? (
                        <p>Você não está inscrito em nenhum evento.</p>
                    ) : (
                        <div className="lista-eventos-home">
                            {eventosInscritos.map((evento) => (
                                <div key={evento.id} className="evento-home-card">
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
                                        <button
                                            className="btn-cancelar"
                                                onClick={() => handleCancelarInscricao(evento.id)



                                                }
                                        >
                                            Cancelar Inscrição
                                        </button>
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