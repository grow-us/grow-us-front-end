import React, { useState, useRef, useEffect } from 'react';
import '../../css/Chat.css';

export default function Chat() {
  const [messages, setMessages] = useState([
    { type: 'received', text: 'Olá! Tudo bem?' },
    { type: 'sent', text: 'Oi! Tudo ótimo e você?' },
  ]);

  const [inputValue, setInputValue] = useState('');
  const messageEndRef = useRef(null);

  const handleSend = () => {
    if (inputValue.trim() === '') return;
    setMessages([...messages, { type: 'sent', text: inputValue }]);
    setInputValue('');
  };

  // rolagem automática até a última mensagem
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="container">
      <div className="coluna-esq">
        <div className="logo-grupo">
          <div className="img-logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="105" height="91" viewBox="0 0 105 91" fill="none">
              <path fill="#A100FF" stroke="#180D59" strokeWidth="2px" />
            </svg>
          </div>
          <div className="logo">GrowUS</div>
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
              <div className="message-content">{msg.text}</div>
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>

        <div className="chat-input-area">
          {/* 📎 Botão de Anexo */}
          <button className="attach-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21.44 11.05l-9.19 9.19a5 5 0 01-7.07-7.07l9.19-9.19a3 3 0 114.24 4.24l-9.19 9.19a1 1 0 01-1.41-1.41l9.19-9.19" />
            </svg>
          </button>

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
