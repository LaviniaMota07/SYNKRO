import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/songselect.css";

const SONGS = [
  { id: "1", title: "Bilu Bilu", artist: "Pablo", score: 121743, accuracy: 63 },
  { id: "2", title: "Can’t Remember to Forget You", artist: "Shakira", score: 110320, accuracy: 71 },
  { id: "3", title: "Crime and Punishment", artist: "Ado", score: 98765, accuracy: 75 },
  { id: "4", title: "Despacito", artist: "Luis Fonsi", score: 121743, accuracy: 63 },
  { id: "5", title: "Evidências", artist: "Chitãozinho & Xororó", score: 117230, accuracy: 80 },
  { id: "6", title: "Freesia", artist: "Naoki", score: 104000, accuracy: 69 },
  { id: "7", title: "Promise", artist: "Laufey", score: 99200, accuracy: 73 },
];

export default function SongSelect() {
  const [selected, setSelected] = useState(SONGS[3]);

  return (
    <div className="songselect-container">
      <h1 className="songselect-header">LISTA DE MÚSICAS</h1>

      <div className="songselect-filters">
        <button className="filter-btn active">POR ORDEM ALFABÉTICA</button>
        <button className="filter-btn">POR ARTISTA</button>
      </div>

      <div className="songselect-content">
        <div className="song-list">
          {SONGS.map((song) => (
            <div
              key={song.id}
              className={`song-item ${selected.id === song.id ? "active" : ""}`}
              onClick={() => setSelected(song)}
            >
              {song.title.toUpperCase()} - {song.artist.toUpperCase()}
            </div>
          ))}
          <Link to="/" className="back-btn">VOLTAR</Link>
        </div>

        <div className="song-details">
          <img
            src={selected.cover}
            alt={selected.title}
            className="song-cover"
            onError={(e) => e.currentTarget.src = "/covers/placeholder.jpg"}
          />
          <h2 className="song-title">{selected.title}</h2>
          <div className="song-stats">
            <p><strong>PONTUAÇÃO</strong></p>
            <p>{selected.score.toLocaleString("pt-BR")}</p>
            <p><strong>PRECISÃO</strong></p>
            <p>{selected.accuracy}%</p>
          </div>
          <div className="stars">
            {Array(5).fill(0).map((_, i) => (
              <span key={i} className={`star ${i < 3 ? "filled" : ""}`}>★</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
