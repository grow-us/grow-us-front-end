import React, { useEffect, useState } from "react";
import "../../css/skills.css";
import { Link, useNavigate } from "react-router-dom";

export default function Skills() {
  const navigate = useNavigate();

  const [hardSkills, setHardSkills] = useState([]);
  const [softSkills, setSoftSkills] = useState([]);
  const [loading, setLoading] = useState(true); // Novo estado para controle de carregamento

  const [hardInput, setHardInput] = useState("");
  const [softInput, setSoftInput] = useState("");

  // Dados do usuário
  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");
  const [perfil, setPerfil] = useState("");

  useEffect(() => {
    document.body.classList.add("skills-body");

    // Busca os dados salvos no localStorage
    const nomeSalvo = localStorage.getItem("nome") || "Usuário";
    const cargoSalvo = localStorage.getItem("cargo") || "Cargo não definido";
    const perfilSalvo = localStorage.getItem("perfil") || "";

    setNome(nomeSalvo);
    setCargo(cargoSalvo);
    setPerfil(perfilSalvo);

    // Carrega as skills do backend
    const loadSkills = async () => {
      const email = localStorage.getItem("email");

      if (!email) {
        alert("Email não encontrado. Faça login novamente.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://app-zxlyzt4g3q-uc.a.run.app/skills/${email}`);

        if (response.ok) {
          const data = await response.json();
          setHardSkills(data.hardSkills || []);
          setSoftSkills(data.softSkills || []);
        } else if (response.status === 404) {
          // Nenhuma skill encontrada
          setHardSkills([]);
          setSoftSkills([]);
        } else {
          console.error("Erro ao carregar skills:", response.status);
        }
      } catch (err) {
        console.error("Erro de conexão ao carregar skills:", err);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    loadSkills();

    return () => document.body.classList.remove("skills-body");
  }, []);

  const addHardSkill = () => {
    if (hardInput.trim() === "") return;
    setHardSkills((prev) => [...prev, hardInput.trim()]);
    setHardInput("");
  };

  const addSoftSkill = () => {
    if (softInput.trim() === "") return;
    setSoftSkills((prev) => [...prev, softInput.trim()]);
    setSoftInput("");
  };

  const handleKeyDown = (e, type) => {
    if (e.key === "Enter") {
      e.preventDefault();
      type === "hard" ? addHardSkill() : addSoftSkill();
    }
  };

  const removeHardSkill = (index) => {
    setHardSkills((prev) => prev.filter((_, i) => i !== index));
  };

  const removeSoftSkill = (index) => {
    setSoftSkills((prev) => prev.filter((_, i) => i !== index));
  };

  // Nova função para enviar as skills ao backend
  const handleConfirm = async () => {
    const email = localStorage.getItem("email");

    if (!email) {
      alert("Email não encontrado. Faça login novamente.");
      return;
    }

    try {
      const response = await fetch("https://app-zxlyzt4g3q-uc.a.run.app/skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          hardSkills,
          softSkills,
        }),
      });

      if (response.ok) {
        alert("Skills atualizadas com sucesso!");
        navigate("/home");
      } else {
        const error = await response.json();
        alert(`Erro: ${error.error || "Falha ao atualizar skills."}`);
      }
    } catch (err) {
      console.error("Erro ao enviar skills:", err);
      alert("Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="containerSkills">
      {/* ===== Coluna Esquerda ===== */}
      <section className="column left">
        <div className="linha"></div>

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

        {/* Hard Skills */}
        <div className="skills-section">
          <h2 className="title">Hard Skills</h2>
          <p className="subtitle">Habilidades Técnicas</p>

          <div className="input-row">
            <input
              type="text"
              placeholder="Adicionar habilidade..."
              value={hardInput}
              onChange={(e) => setHardInput(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, "hard")}
            />
            <button type="button" onClick={addHardSkill}>
              ↩
            </button>
          </div>

          <div className="tags">
            {loading ? (
              <p className="placeholder">Carregando...</p>
            ) : hardSkills.length === 0 ? (
              <p className="placeholder">Nenhuma habilidade adicionada ainda.</p>
            ) : (
              hardSkills.map((skill, index) => (
                <span key={index} className="tag">
                  {skill}
                  <button
                    className="remove-btn"
                    onClick={() => removeHardSkill(index)}
                  >
                    ×
                  </button>
                </span>
              ))
            )}
          </div>
        </div>

        <Link to="/" title="Conexão">
          <button className="btn back">VOLTAR</button>
        </Link>
      </section>

      {/* ===== Coluna Direita ===== */}
      <section className="column right">
        <div className="logo">GrowUs</div>
        <div className="image_logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="105"
            height="91"
            viewBox="0 0 105 91"
            fill="none"
          >
            {/* ... (SVG content) ... */}
          </svg>
        </div>

        {/* Soft Skills */}
        <div className="skills-section">
          <h2 className="title">Soft Skills</h2>
          <p className="subtitle">Habilidades Comportamentais</p>

          <div className="input-row">
            <input
              type="text"
              placeholder="Adicionar habilidade..."
              value={softInput}
              onChange={(e) => setSoftInput(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, "soft")}
            />
            <button type="button" onClick={addSoftSkill}>
              ↩
            </button>
          </div>

          <div className="tags">
            {loading ? (
              <p className="placeholder">Carregando...</p>
            ) : softSkills.length === 0 ? (
              <p className="placeholder">Nenhuma habilidade adicionada ainda.</p>
            ) : (
              softSkills.map((skill, index) => (
                <span key={index} className="tag">
                  {skill}
                  <button
                    className="remove-btn"
                    onClick={() => removeSoftSkill(index)}
                  >
                    ×
                  </button>
                </span>
              ))
            )}
          </div>
        </div>

        <button className="btn confirm" onClick={handleConfirm}>
          CONFIRMAR
        </button>
      </section>
    </div>
  );
}