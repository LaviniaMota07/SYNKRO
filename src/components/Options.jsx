import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button.jsx";
import "../styles/options.css";

const ITEMS = [
  { key: "resolution", label: "Resolução" },
  { key: "graphics",   label: "Gráfico" },
  { key: "captions",   label: "Legenda" },
  { key: "audio",      label: "Áudio" },
  { key: "theme",      label: "Estilo" },
];

function PanelContent({ active }) {
  switch (active) {
    case "resolution":
      return (
        <div className="panel-section">
          <h2>Resolução</h2>
          <select>
            <option>1920×1080 (Full HD)</option>
            <option>1600×900</option>
            <option>1366×768</option>
          </select>
        </div>
      );
    case "graphics":
      return (
        <div className="panel-section">
          <h2>Configurações Gráficas</h2>
          <label><input type="radio" name="gfx" defaultChecked/> Médio</label>
          <label><input type="radio" name="gfx" /> Alto</label>
          <label><input type="radio" name="gfx" /> Ultra</label>
        </div>
      );
    case "captions":
      return (
        <div className="panel-section">
          <h2>Legenda</h2>
          <label className="row">
            Mostrar legenda
            <input type="checkbox" defaultChecked/>
          </label>
          <label className="row">
            Tamanho
            <input type="range" min="12" max="32" defaultValue="18"/>
          </label>
        </div>
      );
    case "audio":
      return (
        <div className="panel-section">
          <h2>Áudio</h2>
          <label className="row">
            Volume geral
            <input type="range" min="0" max="100" defaultValue="70"/>
          </label>
          <label className="row">
            Latência (ms)
            <input type="number" min="0" defaultValue="30" />
          </label>
        </div>
      );
    case "theme":
      return (
        <div className="panel-section">
          <h2>Estilo</h2>
          <select>
            <option>Neon Blue (padrão)</option>
            <option>Dark Minimal</option>
            <option>High Contrast</option>
          </select>
        </div>
      );
    default:
      return <p>Selecione uma opção no menu ao lado.</p>;
  }
}

export default function Options() {
  const [active, setActive] = useState("resolution");

  return (
    <div className="options-layout">
      <aside className="options-sidebar">
        <h1 className="options-title">Options</h1>

        {ITEMS.map(item => (
          <Button
            key={item.key}
            text={item.label}
            onClick={() => setActive(item.key)}
            className={`side-btn ${active === item.key ? "active" : ""}`}
          />
        ))}

        <Link to="/" className="back-link">
          <Button text="Voltar" className="side-btn" />
        </Link>
      </aside>


      <section className="options-panel">
        <PanelContent active={active} />
      </section>
    </div>
  );
}
