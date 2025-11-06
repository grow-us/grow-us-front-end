import React from "react";
import { Link } from "react-router-dom";
import "../../css/Login.css"; // ajuste o caminho se o CSS estiver em outro lugar

// Import das imagens
import Match02 from "../../Match 02.svg";
import Match01 from "../../Match 01.svg";
import Connection from "../../connection.svg";

export default function Login() {
  return (
    <div className="container">
      {/* LADO ESQUERDO */}
      <div className="left-side">
        <div className="image-block">
          <Link to="#" className="card-link link-lua-style" title="Perfil de Lua">
            <img src={Match02} alt="Imagem de Lua" />
          </Link>

          <Link to="#" className="card-link link-paulo-style" title="Perfil de Paulo">
            <img src={Match01} alt="Imagem de Paulo" />
          </Link>

          {/* Ícone Central */}
          <div className="middle-icon">
            <Link to="#" title="Conexão">
              <img src={Connection} width="100" height="100" alt="Ícone de conexão" />
            </Link>
          </div>
        </div>
      </div>

      {/* LADO DIREITO */}
      <div className="back">
        <div className="login-wrapper">
          <div className="login-box">
            <h2>Painel de Login</h2>
            <p>Insira os dados abaixo e acesse o sistema</p>

            <form>
              <label htmlFor="email">Email Corporativo</label>
              <input type="email" id="email" placeholder="joao@accenture.com" />

              <button type="submit" className="btn-entrar">Entrar</button>
            </form>

            <hr />
          </div>

          <Link to="/" className="voltar">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
