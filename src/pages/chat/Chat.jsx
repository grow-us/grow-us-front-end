import React, { useState, useRef, useEffect } from 'react';
import '../../css/Chat.css';
import Logo from '../../componetes/Logo'
import Anexo from '../../componetes/Anexo'
import Send from '../../componetes/Send'

export default function Chat() {

  const [usuarios, setUsuarios] = useState([]);    
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);

  const [messages, setMessages] = useState([
    { type: 'received', text: 'Olá! Tudo bem?' },
    { type: 'sent', text: 'Oi! Tudo ótimo e você?' },
  ]);

  const [selectedUser, setSelectedUser] = useState({
  nome: "Conversa",
  cargo: "Ativa",
  perfil: null
});


  const [inputValue, setInputValue] = useState('');
  const fileInputRef = useRef(null);
  const messageEndRef = useRef(null);

  // 🟣 BUSCAR USUÁRIOS DA API AO ABRIR
  useEffect(() => {
    async function carregarUsuarios() {
      try {
        const email = localStorage.getItem("email");
        const res = await fetch(`https://app-zxlyzt4g3q-uc.a.run.app/usuarios?email=${email}`);
        const data = await res.json();
        setUsuarios(data); // ← salva a lista
      } catch (err) {
        console.error("Erro ao buscar usuários:", err);
      }
    }
    carregarUsuarios();
  }, []);

  // 📤 Enviar texto
  const handleSend = () => {
    if (inputValue.trim() === '') return;

    const newMessage = { type: 'sent', text: inputValue };
    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');

    setTimeout(() => {
      const autoReply = {
        type: 'received',
        text: gerarRespostaAutomatica(inputValue),
      };
      setMessages((prev) => [...prev, autoReply]);
    }, 1000);
  };

  const gerarRespostaAutomatica = (msg) => {
    const lower = msg.toLowerCase();

    if (lower.includes('oi') || lower.includes('olá')) return 'Oi! 😊 Como posso ajudar?';
    if (lower.includes('tudo bem')) return 'Tudo ótimo, e você?';
    if (lower.includes('obrigado')) return 'De nada! 😄';
    if (lower.includes('tchau')) return 'Até mais! 👋';
    return 'Entendi! Pode me contar mais sobre isso? 🤔';
  };

  const handleAttachClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileType = file.type;
    const reader = new FileReader();

    reader.onload = (event) => {
      let newMessage;

      if (fileType.startsWith('image/')) {
        newMessage = { type: 'sent', image: event.target.result, fileName: file.name };
      } else if (fileType === 'application/pdf') {
        newMessage = { type: 'sent', pdf: event.target.result, fileName: file.name };
      } else {
        newMessage = { type: 'sent', text: `📎 Enviado: ${file.name}` };
      }

      setMessages((prev) => [...prev, newMessage]);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { type: 'received', text: 'Arquivo recebido com sucesso! ✅' },
        ]);
      }, 1000);
    };

    reader.readAsDataURL(file);
  };

  // auto scroll
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="container">

      {/* ==========================
          COLUNA ESQUERDA
      ============================ */}
      <div className="coluna-esq">

        <div className="logo-grupo">
          <div className="img-logo">
            <Logo color="black" size={22} />
          </div>
          <span className="logo-chat" translate="no">GrowUS</span>
        </div>

        <div className="search-bar">
          <svg
            className="search-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input type="text" placeholder="Procurar conversas" />
        </div>

        {/* LISTA REAL DE USUÁRIOS */}
        <div className="conversation-list">
          {usuarios.map((user, index) => (
            <div
              key={index}
              className={`item ${usuarioSelecionado?.email === user.email ? "active" : ""}`}
              onClick={() => setUsuarioSelecionado(user)}
            >
              <div className="icon">
                <img
                  src={user.perfil}
                  alt={user.nome}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    objectFit: "cover"
                  }}
                />
              </div>

              <div className="text-lines">
                <div style={{ color: "white", fontSize: "0.95rem", fontWeight: "600" }}>
                  {user.nome}
                </div>
                <div style={{ color: "#bfbfff", fontSize: "0.8rem" }}>
                  {user.cargo}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>


      {/* ==========================
          COLUNA DIREITA
      ============================ */}
{/* ==========================
    COLUNA DIREITA
============================ */}
<div className="coluna-dir">

  {!usuarioSelecionado ? (
    // ==========================
    //   TELA INICIAL DO CHAT
    // ==========================
    <div className="tela-inicial-chat">
      <img 
        src="https://cdn-icons-png.flaticon.com/512/1041/1041916.png"
        alt="Start Chat"
        className="img-start"
      />
      <h2>Inicie uma conversa</h2>
    </div>
  ) : (
    <>
      {/* Cabeçalho */}
      <div className="header-chat">
        <div className="user-info-header">
          <img
            src={usuarioSelecionado?.perfil || "https://i.imgur.com/6VBx3io.png"}
            alt="Foto"
            className="foto-header"
          />
          <div className="texto-voltar">
            <div className="texto1">{usuarioSelecionado.nome}</div>
            <div className="texto2">{usuarioSelecionado.cargo}</div>
          </div>
        </div>
      </div>

      {/* MENSAGENS */}
      <div className="message-area">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.type}`}>
            {msg.pdf ? (
              <a href={msg.pdf} target="_blank" rel="noopener noreferrer" className="pdf-link">
                📄 {msg.fileName}
              </a>
            ) : msg.image ? (
              <div className="image-message">
                <img src={msg.image} alt={msg.fileName} />
              </div>
            ) : (
              <div className="message-content">{msg.text}</div>
            )}
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      {/* INPUT */}
      <div className="chat-input-area">
        <button className="attach-btn" onClick={handleAttachClick}>
          <Anexo color="black" size={22} />
        </button>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/*,application/pdf"
          onChange={handleFileChange}
        />

        <input
          type="text"
          placeholder="Escreva uma mensagem..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />

        <button className="send-btn" onClick={handleSend}>
          <Send color="black" size={22} />
        </button>
      </div>
    </>
  )}
</div>

    </div>
  );
}
