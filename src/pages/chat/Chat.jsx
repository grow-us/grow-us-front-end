import React, { useState, useRef, useEffect } from 'react';
import '../../css/Chat.css';
import Logo from '../../componetes/Logo'
import Anexo from '../../componetes/Anexo'
import Send from '../../componetes/Send'



export default function Chat() {
  const [messages, setMessages] = useState([
    { type: 'received', text: 'Olá! Tudo bem?' },
    { type: 'sent', text: 'Oi! Tudo ótimo e você?' },
  ]);

  const [inputValue, setInputValue] = useState('');
  const fileInputRef = useRef(null);
  const messageEndRef = useRef(null);

  // 📤 Enviar texto
  const handleSend = () => {
    if (inputValue.trim() === '') return;

    const newMessage = { type: 'sent', text: inputValue };
    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');

    // Resposta automática após 1s
    setTimeout(() => {
      const autoReply = {
        type: 'received',
        text: gerarRespostaAutomatica(inputValue),
      };
      setMessages((prev) => [...prev, autoReply]);
    }, 1000);
  };

  // 🤖 Resposta automática
  const gerarRespostaAutomatica = (msg) => {
    const lower = msg.toLowerCase();

    if (lower.includes('oi') || lower.includes('olá')) return 'Oi! 😊 Como posso ajudar?';
    if (lower.includes('tudo bem')) return 'Tudo ótimo, e você?';
    if (lower.includes('obrigado')) return 'De nada! 😄';
    if (lower.includes('tchau')) return 'Até mais! 👋';
    return 'Entendi! Pode me contar mais sobre isso? 🤔';
  };

  // 📎 Clique no botão de anexo
  const handleAttachClick = () => {
    fileInputRef.current.click();
  };

  // 📂 Quando um arquivo é selecionado
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileType = file.type;
    const reader = new FileReader();

    reader.onload = (event) => {
      let newMessage;

      // Se for imagem (jpg/png/gif/webp)
      if (fileType.startsWith('image/')) {
        newMessage = {
          type: 'sent',
          image: event.target.result,
          fileName: file.name,
        };
      }
      // Se for PDF
      else if (fileType === 'application/pdf') {
        newMessage = {
          type: 'sent',
          pdf: event.target.result,
          fileName: file.name,
        };
      }
      // Caso contrário, só mostra o nome do arquivo
      else {
        newMessage = {
          type: 'sent',
          text: `📎 Enviado: ${file.name}`,
        };
      }

      setMessages((prev) => [...prev, newMessage]);

      // Simula resposta automática
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { type: 'received', text: 'Arquivo recebido com sucesso! ✅' },
        ]);
      }, 1000);
    };

    reader.readAsDataURL(file); // lê o arquivo em base64
  };

  // Rolagem automática
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
<div className="container">
  <div className="coluna-esq">

    {/* 👇 CORREÇÃO AQUI 👇 */}
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

        <div className="conversation-list">
          {[...Array(6)].map((_, index) => (
            <div key={index} className={`item ${index === 0 ? 'active' : ''}`}>
              <div className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="text-lines">
                <div className="line"></div>
                <div className="line small"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="coluna-dir">
        <div className="header-chat">
          <div className="user-info-header">
            <div className="icon-circle-header">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="texto-voltar">
              <div className="texto1">Conversa</div>
              <div className="texto2">Ativa</div>
            </div>
          </div>
        </div>

        <div className="message-area">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.type}`}>
              {/* 📄 Se for PDF */}
              {msg.pdf ? (
                <a
                  href={msg.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pdf-link"
                >
                  📄 {msg.fileName}
                </a>
              ) : msg.image ? (
                /* 🖼️ Se for imagem */
                <div className="image-message">
                  <img src={msg.image} alt={msg.fileName} />
                </div>
              ) : (
                /* 💬 Mensagem normal */
                <div className="message-content">{msg.text}</div>
              )}
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>

        <div className="chat-input-area">
          {/* 📎 Botão de Anexo */}
          <button className="attach-btn" onClick={handleAttachClick}>

              <Anexo color="black" size={22} />


          </button>

          {/* Input oculto */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept="image/*,application/pdf"
            onChange={handleFileChange}
          />

          {/* Campo de texto */}
          <input
            type="text"
            placeholder="Escreva uma mensagem..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />

          {/* ✈️ Botão de envio */}
          <button className="send-btn" onClick={handleSend}>
              <Send color="black" size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}
