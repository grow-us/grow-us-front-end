import React, { useState, useRef, useEffect } from "react";
import "../../css/Home.css";
import Logo from "../../componetes/Logo";
import Send from "../../componetes/Send";
import { 
    FaImage, FaRegHeart, FaRegCommentDots, FaChevronLeft, FaChevronRight 
} from 'react-icons/fa';


import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDQGL4HKB8MD4keYV_LOoaDccygrTZJZtQ",
  authDomain: "grow-us-1.firebaseapp.com",
  databaseURL: "https://grow-us-1-default-rtdb.firebaseio.com",
  projectId: "grow-us-1",
  storageBucket: "grow-us-1.firebasestorage.app",
  messagingSenderId: "8287550565",
  appId: "1:8287550565:web:78e80f04ae7da93c72da8c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
// ============================

export default function Home() {
    const API_BASE_URL = "https://app-zxlyzt4g3q-uc.a.run.app";

    const [posts, setPosts] = useState([]); 
    const [inputValue, setInputValue] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [sugeridos, setSugeridos] = useState([]);
    const [eventos, setEventos] = useState([]);
    const [currentEvento, setCurrentEvento] = useState(0);
    const fileInputRef = useRef(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const today = new Date();

    const fetchPosts = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/posts`);
            if (!response.ok) throw new Error("Erro ao buscar posts");
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error("Erro ao carregar posts:", error);
        }
    };

    const fetchSugeridos = async () => {
    try {
        const emailAtual = localStorage.getItem("email");
        if (!emailAtual) return;

        const res = await fetch(`${API_BASE_URL}/usuarios?email=${emailAtual}`);
        if (!res.ok) throw new Error("Erro ao buscar sugeridos");

        const data = await res.json();

        // filtrar só quem não está sendo seguido
        let naoSeguidos = data.filter(u => u.estouSeguindo === false);

        // embaralhar
        naoSeguidos = naoSeguidos.sort(() => Math.random() - 0.5);

        // pegar só 3
        const selecionados = naoSeguidos.slice(0, 3);

        setSugeridos(selecionados);
    } catch (err) {
        console.error("Erro ao carregar sugeridos:", err);
    }
    };

    const handleSend = async () => {
        if (!inputValue.trim() && !selectedFile) return;

        let uploadedImageURL = null;

        // ---- 🔥 Upload da imagem ----
        if (selectedFile) {
            try {
                const fileName = `${Date.now()}-${selectedFile.name}`;
                const storageRef = ref(storage, `posts/${fileName}`);

                await uploadBytes(storageRef, selectedFile);
                uploadedImageURL = await getDownloadURL(storageRef);

            } catch (error) {
                console.error("Erro ao fazer upload:", error);
                alert("Erro ao enviar imagem.");
                return;
            }
        }

        // ---- 🔥 Enviar dados do post para sua API ----
        const newPostData = {
            descricao: inputValue,
            img: uploadedImageURL,  // 🔥 agora é a URL do Firebase
            nome: localStorage.getItem("nome"),
            perfil: localStorage.getItem("perfil")
        };

        try {
            const response = await fetch(`${API_BASE_URL}/posts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPostData),
            });

            if (!response.ok) throw new Error("Falha no servidor");

            fetchPosts();
            setInputValue("");
            setImagePreview(null);
            setSelectedFile(null);

        } catch (error) {
            console.error("Erro ao enviar post:", error);
        }
    };


    const handleLike = async (postId) => {
    const email = localStorage.getItem("email");

  try {
    const res = await fetch(`${API_BASE_URL}/posts/${postId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Erro ao curtir");

    // 🔥 Atualizar curtidas instantaneamente no estado
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, curtidas: post.curtidas + 1 } // incrementa só o post curtido
          : post
      )
    );

    console.log("Curtida registrada!");

  } catch (error) {
    console.error("Erro:", error);
    alert(error.message);
  }
    };

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

    useEffect(() => {
        fetchPosts();
        fetchSugeridos();
        fetchEventos();
    }, []);

    const handleAttachClick = () => fileInputRef.current.click();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setSelectedFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    // ===== RESTANTE DO SEU CÓDIGO (layout, calendário etc.) =====

    const formatarData = (isoString) => {
        if (!isoString) return "Data não informada";

        try {
            const data = new Date(isoString);
            const dia = data.getDate().toString().padStart(2, "0");
            const mes = data.toLocaleString("pt-BR", { month: "long" });
            const ano = data.getFullYear();
            const hora = data.getHours().toString().padStart(2, "0");
            const minuto = data.getMinutes().toString().padStart(2, "0");
            return `${dia} de ${mes} de ${ano} às ${hora}:${minuto}`;
        } catch {
            return "Data inválida";
        }
    };

    const getCalendarDays = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startDay = firstDay.getDay();
        const prevMonthLastDay = new Date(year, month, 0).getDate();

        const prevDays = Array.from({ length: startDay }, (_, i) => ({
            day: prevMonthLastDay - startDay + i + 1,
            current: false,
        }));

        const currentDays = Array.from({ length: daysInMonth }, (_, i) => ({
            day: i + 1,
            current: true,
        }));

        const totalCells = 42;
        const nextDaysCount = totalCells - (prevDays.length + currentDays.length);

        const nextDays = Array.from({ length: nextDaysCount }, (_, i) => ({
            day: i + 1,
            current: false,
        }));

        return [...prevDays, ...currentDays, ...nextDays];
    };

    const nextEvento = () => {
        if (eventos.length > 0) {
            setCurrentEvento((prev) => (prev + 1) % eventos.length);
        }
    };

    const prevEvento = () => {
        if (eventos.length > 0) {
            setCurrentEvento((prev) => (prev - 1 + eventos.length) % eventos.length);
        }
    };

    return (
        <div className="home-container no-scroll">

            {/* ===== COLUNA ESQUERDA ===== */}
            <aside className="left-sidebar">
                <div className="logo-header">
                    <Logo color="black" size={22} />
                    <span translate="no">GrowUs</span>
                </div>

                <div className="widget">
                    <h3>Sugeridos</h3>
<ul className="suggested-list">
    {sugeridos.length === 0 ? (
        <p style={{ fontSize: "0.8rem", opacity: 0.6 }}>Nenhum sugerido</p>
    ) : (
        sugeridos.map((user, i) => (
            <li key={i} className="suggest-item">
                <img 
                    src={user.perfil}
                    alt={user.nome}
                    className="suggest-avatar"
                />

                <div className="suggest-info">
                    <strong>{user.nome}</strong>
                    <span className="cargo">{user.cargo}</span>
                </div>

                <button className="btn-seguir">
                    Seguir
                </button>
            </li>
        ))
    )}
</ul>

                </div>

                <div className="widget">
                    <h3>Emblemas</h3>
                    <div className="emblems-grid">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="emblem-placeholder"></div>
                        ))}
                    </div>
                </div>
            </aside>

            {/* ===== COLUNA CENTRAL ===== */}
            <div className="center-column">

                {/* INPUT DE POST */}
                <div className="top-bar card">
                    <div className="chat-input-area">
                        <button className="attach-btn" onClick={handleAttachClick}>
                            <FaImage color="white" size={22} />
                        </button>

                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            accept="image/*"
                            onChange={handleFileChange}
                        />

                        <input
                            type="text"
                            placeholder="Compartilhe algo novo..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        />

                        <button className="send-btn" onClick={handleSend}>
                            <Send color="black" size={22} />
                        </button>
                    </div>

                    {imagePreview && (
                        <div className="image-preview">
                            <img src={imagePreview} alt="Prévia" />
                            <button 
                                className="remove-img" 
                                onClick={() => {
                                    setImagePreview(null);
                                    setSelectedFile(null);
                                }}
                            >
                                ×
                            </button>
                        </div>
                    )}
                </div>

                {/* FEED */}
                <main className="main-feed scrollable">
                    {posts.length === 0 ? (
                        <p className="no-posts">Nenhum post ainda...</p>
                    ) : (
                        posts.map((post) => (
                            <div key={post.id} className="feed-post card">
                                
                                <div className="post-header">
                                    <img 
                                        src={post.perfil || "https://via.placeholder.com/40"} 
                                        alt="perfil"
                                        className="post-user-img"
                                    />
                                    <div className="post-info-meta">
                                        <div className="post-author">{post.nome || "Usuário"}</div>
                                    </div>
                                </div>

<div className="post-content">

    {/* Se existe imagem → imagem primeiro */}
    {post.img && (
        <img
            src={post.img}
            alt="imagem do post"
            className="post-img"
        />
    )}

    {/* Descrição sempre abaixo da imagem (ou acima, se não tiver imagem) */}
    {post.descricao && (
        <p className="post-desc">{post.descricao}</p>
    )}

    {/* Data SEMPRE no final */}
    <p className="post-date-text">{post.createdAt}</p>

</div>

                                <div className="post-actions">
                                    <button className="action-btn" onClick={() => handleLike(post.id)}>
                                        <FaRegHeart className="icon" />
                                        <span className="curtidas-count">{post.curtidas || 0}</span>
                                    </button>



                                    <img src="../../../dist/save.svg" alt="Salvar" className="icon icon-right" />
                                </div>
                            </div>
                        ))
                    )}
                </main>
            </div>

            {/* ===== COLUNA DIREITA ===== */}
            <aside className="right-sidebar">
<header className="right-header">

    {/* ==== ÍCONE DE MENSAGENS COM TOOLTIP ==== */}
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

    {/* ==== ÍCONE DE PERFIL COM TOOLTIP ==== */}
    <div className="icon-wrapper">
        <img
            src="../../../public/account.svg"
            alt="Perfil"
            className="icon icon-right"
            onClick={() => window.location.href = "/perfil"}
            style={{ cursor: "pointer" }}
        />
        <span className="tooltip">Perfil</span>
    </div>

</header>



                <div className="widget card calendario">
                    <h3>Calendário</h3>

                    <div className="calendar-header">
                        <FaChevronLeft
                            className="nav-arrow"
                            onClick={() =>
                                setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
                            }
                        />

                        <span className="month-label">
                            {currentDate.toLocaleString("pt-BR", { month: "long", year: "numeric" })}
                        </span>

                        <FaChevronRight
                            className="nav-arrow"
                            onClick={() =>
                                setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
                            }
                        />
                    </div>

                    <div className="calendar-grid">
                        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"].map((d) => (
                            <div key={d} className="cal-header">{d}</div>
                        ))}

                        {getCalendarDays(currentDate).map((d, i) => {
                            const isToday =
                                d.current &&
                                d.day === today.getDate() &&
                                currentDate.getMonth() === today.getMonth() &&
                                currentDate.getFullYear() === today.getFullYear();

                            return (
                                <div
                                    key={i}
                                    className={`cal-day ${d.current ? "current-month" : "other-month"} ${
                                        isToday ? "today" : ""
                                    }`}
                                >
                                    {d.day}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="widget card eventos-proximos">
                    <h3>Eventos Próximos</h3>

                    <div className="event-item">
                        {eventos.length === 0 ? (
                            <p>Carregando eventos...</p>
                        ) : (
                            <div className="evento-card">
                                <img
                                    src={eventos[currentEvento].img}
                                    alt={eventos[currentEvento].titulo}
                                    className="evento-img"
                                />

                                <div className="evento-info">
                                    <strong>{eventos[currentEvento].titulo}</strong>
                                    <p>{formatarData(eventos[currentEvento].dia)}</p>
                                    <p>{eventos[currentEvento].localidade}</p>

                                    <button className="btn-inscrever">Inscreva-se</button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="event-nav">
                        <FaChevronLeft className="nav-arrow" onClick={prevEvento} />

                        {eventos.map((_, i) => (
                            <span
                                key={i}
                                className={`nav-dot ${i === currentEvento ? "active" : ""}`}
                            ></span>
                        ))}

                        <FaChevronRight className="nav-arrow" onClick={nextEvento} />
                    </div>
                </div>
            </aside>
        </div>
    );
}
