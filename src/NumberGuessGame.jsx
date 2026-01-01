import { useState } from "react";

function generateRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

export default function NumberGuessGame({ onBack }) {
  const [previousGuesses, setPreviousGuesses] = useState([]);
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());

  function handleSubmit(event) {
    event.preventDefault();
    const guessField = event.target.elements.guessField;
    const newUserGuess = Number(guessField.value);

    setPreviousGuesses([...previousGuesses, newUserGuess]);

    guessField.value = "";
    guessField.focus();
  }

  function handleClickResetButton() {
    setPreviousGuesses([]);
    setRandomNumber(generateRandomNumber());
  }

  const guessCount = previousGuesses.length;
  const userGuess = guessCount > 0 ? previousGuesses[guessCount - 1] : null;

  const gameClear = userGuess === randomNumber;
  const gameOver = guessCount >= 10;
  const gameFinished = gameClear || gameOver;

  const higherGuesses = previousGuesses.filter(g => g > randomNumber);
  const lowerGuesses = previousGuesses.filter(g => g < randomNumber);

  let lastResultMessage = "間違いです！";
  if (gameClear) lastResultMessage = "おめでとう！正解です！";
  else if (gameOver) lastResultMessage = "ゲームオーバー！！！";

  let lastResultColor = "";
  if (gameClear) lastResultColor = "green";
  else if (userGuess != null) lastResultColor = "red";

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h1>数字当てゲーム</h1>
      <p>1〜100までの数字を10回以内に当ててください。</p>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="guessField"
          min="1"
          max="100"
          required
          disabled={gameFinished}
        />
        <input type="submit" value="予想する" disabled={gameFinished} />
      </form>

      {previousGuesses.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <p>
            <strong>大きい:</strong> {higherGuesses.join(" ")}
          </p>
          <p>
            <strong>小さい:</strong> {lowerGuesses.join(" ")}
          </p>

          <p style={{ backgroundColor: lastResultColor, padding: "5px" }}>
            {lastResultMessage}
          </p>

          {!gameClear && userGuess != null && (
            <p>
              {userGuess < randomNumber
                ? "最後の予想は小さすぎます！"
                : "最後の予想は大きすぎます！"}
            </p>
          )}
        </div>
      )}

      {gameFinished && (
        <button onClick={handleClickResetButton} style={{ marginTop: "10px" }}>
          新しいゲームを開始
        </button>
      )}

      <div style={{ marginTop: "20px" }}>
        <button onClick={onBack}>ホームに戻る</button>
      </div>
    </div>
  );
}
