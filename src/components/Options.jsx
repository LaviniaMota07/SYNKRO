import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/options.css";

const OPTIONS = [
  { key: "resolution", label: "RESOLUÇÃO", value: "1920 × 1080" },
  { key: "text", label: "TEXTO", value: "MÉDIO" },
  { key: "audio", label: "ÁUDIO", value: "50%" },
  { key: "controls", label: "CONTROLES", value: "" },
];

export default function Options() {
  const [settings, setSettings] = useState(OPTIONS);

  return (
    <div className="options-container">
      <h1 className="options-title">OPÇÕES</h1>

      <div className="options-line"></div>

      <div className="options-list">
        {settings.map((opt) => (
          <div key={opt.key} className="option-row">
            <span className="option-label">{opt.label}</span>
            {opt.value && (
              <div className="option-box">
                <span className="arrow left">◀</span>
                <span className="option-value">{opt.value}</span>
                <span className="arrow right">▶</span>
              </div>
            )}
          </div>
        ))}

        <Link to="/" className="option-label voltar">VOLTAR</Link>
      </div>
    </div>
  );
}
