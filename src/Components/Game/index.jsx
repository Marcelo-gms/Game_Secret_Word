import { useState, useRef, useEffect, useCallback } from "react";
import Header from "../Header";
import "./game.css";

//Components
import wordsList from "../../Data/word";
import { Link, } from "react-router-dom";

const Game = () => {
  const [letter, setLetter] = useState("");
  const letterInput = useRef(null);

  //functions of game
  // const [gameStage, setGameStage] = useState(stage[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  const btnGameOver = useRef(null);
  console.log(btnGameOver);

  const pickedWordAndCategory = useCallback(() => {
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];
    return { word, category };
  }, [words]);
  const startGame = useCallback(() => {
    // pickedWordAndCategory();
    const { word, category } = pickedWordAndCategory();
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);
  }, [pickedWordAndCategory]);

  //functions of game

  const verifyLetter = (letter) => {
    const normalizeLetter = letter.toLowerCase();

    if (
      guessedLetters.includes(normalizeLetter) ||
      wrongLetters.includes(normalizeLetter)
    ) {
      return;
    }

    if (letters.includes(normalizeLetter)) {
      setGuessedLetters((atualGuessedLettes) => [
        ...atualGuessedLettes,
        normalizeLetter,
      ]);
    } else {
      setWrongLetters((atualWrongLettes) => [
        ...atualWrongLettes,
        normalizeLetter,
      ]);

      setGuesses((atualGuesses) => atualGuesses - 1);
    }
  };

  const clearLetterStates = useCallback(() => {
    setGuessedLetters([]);
    setWrongLetters([]);
    setLetters([]);
    setLetter("");
  }, []);

  useEffect(() => {
    clearLetterStates();
    startGame();
  }, [clearLetterStates, startGame]);

  useEffect(() => {
    if (guesses <= 0) {
      alert("Chances esgotadas!");
      clearLetterStates();
      setGuesses(3);
      startGame();
      btnGameOver.current.click();
      // setStage("end");
    }
  }, [guesses, clearLetterStates, startGame]);

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];
    if (guessedLetters.length === uniqueLetters.length) {
      setScore((actualScore) => (actualScore += 100));
      startGame();
    }
  }, [guessedLetters, letters, startGame]);

  const hadleSubmitLetter = (e) => {
    e.preventDefault();
    setLetter("");
    verifyLetter(letter);
    letterInput.current.focus();
  };
  return (
    <>
      <Header />
      <div className="game">
        <p className="points">
          Sua Pontuação:
          <span>{score}</span>
        </p>
        <h1>Advinhe a palavra:</h1>
        <p>
          A dica é:<span className="dica">{pickedCategory}</span>
        </p>
        <p>Você ainda tem {guesses} chances</p>
        <div className="wordContainer">
          {letters.map((letter, i) =>
            guessedLetters.includes(letter) ? (
              <span key={i} className="letter">
                {letter}
              </span>
            ) : (
              <span key={i} className="blankSquare"></span>
            )
          )}
        </div>
        <div className="letterContainer">
          <p>tente advinhar uma letra da palavra:</p>
          <form onSubmit={hadleSubmitLetter}>
            <input
              type="text"
              maxLength="1"
              required
              onChange={(e) => setLetter(e.target.value)}
              value={letter}
              ref={letterInput}
            />
            <button>Jogar</button>
          </form>
        </div>
        <div className="wrongLetterContainer">
          <p>Letras já utilizadas: </p>

          {wrongLetters.length > 0 ? (
            <span>{wrongLetters.join(" - ").toLowerCase()}</span>
          ) : (
            <span>Nenhuma letra utilizada!</span>
          )}
        </div>
      </div>
      <Link className="btnGameOver" to={"/gameOver"}>
        <button ref={btnGameOver}>Reset</button>
      </Link>
    </>
  );
};

export default Game;
