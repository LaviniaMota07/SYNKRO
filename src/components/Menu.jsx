import { Link } from "react-router-dom";
import Button from "./Button.jsx";

export default function Menu() {
  return (
    <div className="menu">
      <Link to="/songselect">
        <Button text="JOGAR" />
      </Link>

      <Link to="/options">
        <Button text="OPÇÕES" />
      </Link>

      <Button text="SAIR" onClick={() => alert("Fechando jogo...")} />
    </div>
  );
}
