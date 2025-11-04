// src/components/Chat.jsx
import React from 'react';

import '../../css/Chat.css';

export default function Chat ()  {
  return (
    <div className="container">
      <div className="coluna-esq">
        <div className="logo-grupo">
          <div className="img-logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="105" height="91" viewBox="0 0 105 91" fill="none">
              <path
                fill="#A100FF"
                stroke="#180D59"
                strokeWidth="2px"
              />
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <path
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
              >
                <path
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="texto-voltar">
              <div className="texto1"></div>
              <div className="texto2"></div>
            </div>
          </div>
          <button className="close-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 42 42"
              fill="none"
            >
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="message-area">
          <div className="message received">
            <div className="message-content line-mockup large"></div>
            <div className="message-content line-mockup small"></div>
          </div>

          <div className="message sent">
            <div className="message-content line-mockup large"></div>
            <div className="message-content line-mockup medium"></div>
          </div>

          <div className="message received">
            <div className="message-content line-mockup medium"></div>
            <div className="message-content line-mockup small"></div>
          </div>

          <div className="message sent">
            <div className="message-content line-mockup large"></div>
            <div className="message-content line-mockup large"></div>
            <div className="message-content line-mockup small"></div>
          </div>

          <div className="message received">
            <div className="message-content line-mockup medium"></div>
            <div className="message-content line-mockup small"></div>
          </div>

          <div className="message sent">
            <div className="message-content line-mockup small"></div>
            <div className="message-content line-mockup extra-small"></div>
          </div>
        </div>

        <div className="chat-input-area">
          <button className="attach-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="23"
              viewBox="0 0 22 23"
              fill="none"
            >
              <path
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <input type="text" placeholder="Escreva uma mensagem..." />
          <button className="send-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
            >
              <g clipPath="url(#clip0_0_683)">
                <path
                  stroke="black"
                  strokeWidth="1.58333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  stroke="black"
                  strokeWidth="1.58333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_0_683">
                  <rect width="19" height="19" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      </div>

      <div className="linha-vertical"></div>
      <div className="linha-horizontal"></div>
    </div>
  );
};
