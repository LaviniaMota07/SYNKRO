import "./../styles/button.css";

export default function Button({ text, onClick }) {
  return (
    <button className="game-button" onClick={onClick}>
      {text}
    </button>
  );
}
