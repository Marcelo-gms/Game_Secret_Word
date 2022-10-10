import { Link } from "react-router-dom";
import "./gameOver.css";
const GameOver = ({ score }) => {
  return (
    <>
      <div className="gameOverContainer">
        <h1>Game Over</h1>
        <p>
          Your points: <span>{score}</span>
        </p>
          <Link to={"/"}>
            <button>Resetar jogo</button>
          </Link>
      </div>
    </>
  );
};

export default GameOver;
