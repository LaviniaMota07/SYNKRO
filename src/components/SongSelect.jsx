import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button.jsx";
import "../styles/songselect.css";

const SONGS = [
  { id: "song-1", title: "Opção 1", cover: "", bestScore: 12340 },
  { id: "song-2", title: "Opção 2", cover: "", bestScore: 9870 },
  { id: "song-3", title: "Opção 3", cover: "", bestScore: 5430 },
  { id: "song-4", title: "Opção 4", cover: "", bestScore: 0 },
  { id: "song-5", title: "Opção 5", cover: "", bestScore: 21100 },
];

export default function SongSelect() {
  const [selectedId, setSelectedId] = useState(SONGS[0].id);
  const selected = SONGS.find(s => s.id === selectedId);

  return (
    <div className="songselect-page">
      <h1 className="songselect-title">Rhythm Game</h1>
      <h2 className="songselect-subtitle">Song Select</h2>

      <div className="songselect-layout">
        <aside className="songselect-menu">
          {SONGS.map(song => (
            <Button
              key={song.id}
              text={song.title}
              onClick={() => setSelectedId(song.id)}
              className={song.id === selectedId ? "is-active" : ""}
            />
          ))}

          <Link to="/"><Button text="Voltar" /></Link>
        </aside>

        <section className="songselect-preview">
          {selected ? (
            <>
              <div className="song-card">
                <img
                  src={selected.cover}
                  alt={`Capa ${selected.title}`}
                  className="song-cover"
                  onError={(e) => { e.currentTarget.src = "/covers/placeholder.jpg"; }}
                />
                <div className="song-info">
                  <h3>{selected.title}</h3>
                  <p className="score-label">Melhor pontuação</p>
                  <p className="score-value">
                    {selected.bestScore?.toLocaleString("pt-BR")} pts
                  </p>
                </div>
              </div>

              <div className="song-actions">
                <Link to={`/gameplay`} state={{ songId: selected.id }}>
                  <Button text="Jogar" />
                </Link>
              </div>
            </>
          ) : (
            <div className="song-placeholder">
              <p>Selecione uma música no menu ao lado.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
