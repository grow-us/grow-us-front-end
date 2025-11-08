import React, { useEffect, useState } from "react";
import "../../css/Interesses.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../componetes/Logo";

export default function AreasDeInteresse() {
  const navigate = useNavigate();

  const [interesses, setInteresses] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);

  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");
  const [perfil, setPerfil] = useState("");

  useEffect(() => {
    document.body.classList.add("areas-body");

    const nomeSalvo = localStorage.getItem("nome") || "Usuário";
    const cargoSalvo = localStorage.getItem("cargo") || "Cargo não definido";
    const perfilSalvo = localStorage.getItem("perfil") || "";
    const email = localStorage.getItem("email");

    setNome(nomeSalvo);
    setCargo(cargoSalvo);
    setPerfil(perfilSalvo);

    // Carrega as áreas do backend
    const loadAreas = async () => {
      if (!email) {
        alert("Email não encontrado. Faça login novamente.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://us-central1-grow-us-1.cloudfunctions.net/app/areas/${email}`
        );

        if (response.ok) {
          const data = await response.json();
          setInteresses(data.areas || []);
        } else if (response.status === 404) {
          setInteresses([]);
        } else {
          console.error("Erro ao carregar áreas:", response.status);
        }
      } catch (err) {
        console.error("Erro de conexão ao carregar áreas:", err);
      } finally {
        setLoading(false);
      }
    };

    loadAreas();

    return () => document.body.classList.remove("areas-body");
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

  // Salvar no backend
  const handleConfirm = async () => {
    const email = localStorage.getItem("email");

    if (!email) {
      alert("Email não encontrado. Faça login novamente.");
      return;
    }

    try {
      const response = await fetch(
        "https://us-central1-grow-us-1.cloudfunctions.net/app/areas",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            areas: interesses,
          }),
        }
      );

      if (response.ok) {
        alert("Áreas de interesse salvas com sucesso!");
        navigate("/home");
      } else {
        const error = await response.json();
        alert(`Erro: ${error.error || "Falha ao salvar áreas."}`);
      }
    } catch (err) {
      console.error("Erro ao enviar áreas:", err);
      alert("Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="containerAreas unica-coluna">
      <div className="logo-topo-direita-areas">
        <Logo color="black" size={22} />
        <span className="logo-text-areas">GrowUs</span>
      </div>

      <header className="user-header-areas">
        <div
          className="avatar-areas"
          style={{
            backgroundImage: perfil ? `url(${perfil})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="user-info-areas">
          <p className="user-name-areas">{nome}</p>
          <p className="user-meta-areas">{cargo}</p>
        </div>
      </header>

      <div className="skills-section-areas">
        <h2 className="title-areas">Áreas de Interesse</h2>
        <p className="subtitle-areas">
          Adicione suas áreas de interesse abaixo
        </p>

        <div className="input-row-areas centralizada deslocada">
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

      <div className="tags-areas">
        {loading ? (
          <p className="placeholder">Carregando...</p>
        ) : interesses.length === 0 ? (
          <p className="placeholder">Nenhuma área adicionada ainda.</p>
        ) : (
          interesses.map((item, index) => (
            <span key={index} className="tag">
              {item}
              <button
                className="remove-btn-areas"
                onClick={() => removeInteresse(index)}
              >
                ×
              </button>
            </span>
          ))
        )}
      </div>

      <div className="botoes-acoes-areas">
        <Link to="/" title="Voltar">
          <button className="btn-areas back">VOLTAR</button>
        </Link>
        <button className="btn-areas confirm" onClick={handleConfirm}>
          CONFIRMAR
        </button>
      </div>
    </div>
  );
}
