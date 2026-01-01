import { useState } from "react"; // ← これが必須
import rockImg from "./rock.png";
import paperImg from "./paper.png";
import scissorsImg from "./scissors.png";

const options = [
  { name: "グー", img: rockImg },
  { name: "パー", img: paperImg },
  { name: "チョキ", img: scissorsImg },
];

export default function SprGame({ onBack }) {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");

  const playGame = (choice) => {
    setPlayerChoice(choice.name);

    const computer = options[Math.floor(Math.random() * options.length)];
    setComputerChoice(computer.name);

    if (choice.name === computer.name) setResult("あいこ");
    else if (
      (choice.name === "グー" && computer.name === "チョキ") ||
      (choice.name === "チョキ" && computer.name === "パー") ||
      (choice.name === "パー" && computer.name === "グー")
    )
      setResult("あなたの勝ち！");
    else setResult("コンピュータの勝ち！");
  };

  return (
    <>
      <p>手を選んでください:</p>
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        {options.map((option) => (
          <button
            key={option.name}
            onClick={() => playGame(option)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <img
              src={option.img}
              alt={option.name}
              style={{ width: "100px", height: "100px" }}
            />
          </button>
        ))}
      </div>

      {playerChoice && (
        <div>
          <p>あなたの手: {playerChoice}</p>
          <p>コンピュータの手: {computerChoice}</p>
          <h3>{result}</h3>
        </div>
      )}

      <button onClick={onBack} style={{ marginTop: "20px" }}>
        ホームに戻る
      </button>
    </>
  );
}
