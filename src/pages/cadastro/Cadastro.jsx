import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../css/Cadastro.css";

import Match01 from "../../Match 01.svg";
import Match02 from "../../Match 02.svg";
import Connection from "../../connection.svg";

export default function Cadastro() {
  const [email, setEmail] = useState(""); 
  const navigate = useNavigate();

  // Função que faz a requisição para API
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = await fetch("https://us-central1-grow-us-1.cloudfunctions.net/app/verificar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // envia o email no corpo da requisição
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Usuário cadastrado:", data);
        // redireciona para a página Skills
        localStorage.setItem("email", email);
        localStorage.setItem("nome",data.nome);
        localStorage.setItem("perfil",data.perfil);
        localStorage.setItem("cargo",data.cargo);
        localStorage.setItem("objetivo",data.objetivo);
        localStorage.setItem("carreira",data.carreira);
        localStorage.setItem("sobre",data.sobre);

        
        navigate("/Skills");
      } else {
        alert(`Erro: ${data.message || "Falha no cadastro"}`);
      }

    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

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
            <h2>Painel de Cadastro</h2>
            <p>Insira os dados abaixo para se cadastrar e acessar</p>

            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email Corporativo</label>
              <input
                type="email"
                id="email"
                placeholder="joao@accenture.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // atualiza o estado
                required
              />

              <button type="submit" className="btn-entrar">
                Cadastre-se
              </button>
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
