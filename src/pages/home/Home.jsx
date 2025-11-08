import React from "react";
import { Link } from "react-router-dom";
import "../../css/Login.css"; // ajuste o caminho se necessário

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        gap: "20px",
      }}
    >
      <Link to="/" className="voltar">
        INICIO
      </Link>

      <Link to="/chat" className="voltar">
        CHAT
      </Link>

      <Link to="/comunidade" className="voltar">
        COMUNIDADE
      </Link>

      <Link to="/skills" className="voltar">
        SKILLS
      </Link>
    </div>
  );
}
