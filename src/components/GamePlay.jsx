import { useEffect, useRef, useState } from "react";

export default function Gameplay() {
  const containerRef = useRef(null);
  const [engine, setEngine] = useState(null);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [paused, setPaused] = useState(false);

  // 1) Carregar script do Godot
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/godot_export/godot.loader.js"; // ajuste o path
    script.async = true;
    script.onload = () => initGodot();
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  // 2) Instanciar engine
  async function initGodot() {
    // @ts-ignore
    const Godot = window.Godot;
    const canvas = document.createElement("canvas");
    canvas.id = "godot-canvas";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    containerRef.current.appendChild(canvas);

    const engine = await Godot.instantiate({
      canvas,
      // caminhos do export
      executable: "/godot_export/game.wasm",
      mainPack: "/godot_export/game.pck",
      // opcional: args, persistentDrops, etc.
    });

    setEngine(engine);
  }

  // 3) Ouvir mensagens do Godot
  useEffect(() => {
    const onFromGodot = (e) => {
      const msg = e.detail;
      if (msg.type === "hit") { setScore(msg.score); setCombo(msg.combo); }
      if (msg.type === "song_end") { /* abrir modal de resultados */ }
    };
    window.addEventListener("from-godot", onFromGodot);
    return () => window.removeEventListener("from-godot", onFromGodot);
  }, []);

  function sendToGodot(payload) {
    if (typeof window.godotSend === "function") window.godotSend(payload);
  }

  return (
    <div className="relative w-full h-screen bg-[#0b1020]">
      {/* Canvas do Godot */}
      <div ref={containerRef} className="absolute inset-0" />

      {/* HUD React sobreposto */}
      <div className="pointer-events-none absolute top-4 left-4 text-white">
        <div className="text-xl">Score: {score}</div>
        <div className="text-lg opacity-80">Combo: {combo}</div>
      </div>

      {/* Controles (podem ser pointer-events-auto) */}
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          className="pointer-events-auto rounded-xl border px-3 py-2 text-white/90"
          onClick={() => { sendToGodot({ type: paused ? "resume" : "pause" }); setPaused(!paused); }}
        >
          {paused ? "Retomar" : "Pausar"}
        </button>
        <button
          className="pointer-events-auto rounded-xl border px-3 py-2 text-white/90"
          onClick={() => sendToGodot({ type: "setLatency", value: 30 })}
        >
          Latência 30ms
        </button>
      </div>
    </div>
  );
}
