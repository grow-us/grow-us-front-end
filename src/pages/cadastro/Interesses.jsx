import React, { useEffect, useState } from "react";
import "../../css/Interesses.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../componetes/Logo";

export default function AreasDeInteresse() {
  const navigate = useNavigate();

  const [interesses, setInteresses] = useState([]);
  const [input, setInput] = useState("");

  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");
  const [perfil, setPerfil] = useState("");

  useEffect(() => {
    document.body.classList.add("skills-body");

    const nomeSalvo = localStorage.getItem("nome") || "Usuário";
    const cargoSalvo = localStorage.getItem("cargo") || "Cargo não definido";
    const perfilSalvo = localStorage.getItem("perfil") || "";

    setNome(nomeSalvo);
    setCargo(cargoSalvo);
    setPerfil(perfilSalvo);

    return () => document.body.classList.remove("skills-body");
  }, []);

  const addInteresse = () => {
    if (input.trim() === "") return;
    setInteresses((prev) => [...prev, input.trim()]);
    setInput("");
  };

  const removeInteresse = (index) => {
    setInteresses((prev) => prev.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addInteresse();
    }
  };

  const handleConfirm = () => {
    alert("Áreas de interesse salvas com sucesso!");
    navigate("/home");
  };

  return (
    <div className="containerSkills unica-coluna">
      <div className="logo-topo-direita">
        <Logo color="black" size={22} />
        <span className="logo-text">GrowUs</span>
      </div>

      <header className="user-header">
        <div
          className="avatar"
          style={{
            backgroundImage: perfil ? `url(${perfil})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="user-info">
          <p className="user-name">{nome}</p>
          <p className="user-meta">{cargo}</p>
        </div>
      </header>

      <div className="skills-section">
        <h2 className="title">Áreas de Interesse</h2>
        <p className="subtitle">Adicione suas áreas de interesse abaixo</p>

        <div className="input-row centralizada deslocada">
          <input
            type="text"
            placeholder="Adicionar área de interesse..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button type="button" onClick={addInteresse}>
            ↩
          </button>
        </div>
      </div>

      <div className="tags">
        {interesses.length === 0 ? (
          <p className="placeholder">Nenhuma área adicionada ainda.</p>
        ) : (
          interesses.map((item, index) => (
            <span key={index} className="tag">
              {item}
              <button
                className="remove-btn"
                onClick={() => removeInteresse(index)}
              >
                ×
              </button>
            </span>
          ))
        )}
      </div>

      <div className="botoes-acoes">
        <Link to="/" title="Voltar">
          <button className="btn back">VOLTAR</button>
        </Link>
        <button className="btn confirm" onClick={handleConfirm}>
          CONFIRMAR
        </button>
      </div>
    </div>
  );
}
