import { useState } from "react";

const drawCard = () => Math.floor(Math.random() * 10) + 1;

const sum = (cards) => cards.reduce((a, b) => a + b, 0);

export default function BlackJackGame() {
  const [player, setPlayer] = useState([]);
  const [dealer, setDealer] = useState([]);
  const [result, setResult] = useState("");
  const [playing, setPlaying] = useState(false);

  const start = () => {
    setPlayer([drawCard(), drawCard()]);
    setDealer([drawCard(), drawCard()]);
    setResult("");
    setPlaying(true);
  };

  const hit = () => {
    const newHand = [...player, drawCard()];
    setPlayer(newHand);
    if (sum(newHand) > 21) {
      setResult("バースト！あなたの負け");
      setPlaying(false);
    }
  };

  const stand = () => {
    let d = [...dealer];
    while (sum(d) < 17) {
      d.push(drawCard());
    }
    setDealer(d);

    const ps = sum(player);
    const ds = sum(d);

    if (ds > 21 || ps > ds) setResult("あなたの勝ち！");
    else if (ps < ds) setResult("ディーラーの勝ち");
    else setResult("引き分け");

    setPlaying(false);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>ブラックジャック</h1>

      <p style={{ fontSize: "26px", fontWeight: "bold" }}>
        あなた：{player.join(", ")}
        </p>
        <p style={{ fontSize: "34px", fontWeight: "bold" }}>
            合計 {sum(player)}
        </p>
        <p style={{ fontSize: "26px", fontWeight: "bold", marginTop: "20px" }}>
            ディーラー：{playing ? "?" : dealer.join(", ")}
        </p>
    <p style={{ fontSize: "34px", fontWeight: "bold" }}>
        {playing ? "" : `合計 ${sum(dealer)}`}
    </p>

      {!playing && <button onClick={start}>START</button>}
      {playing && (
        <>
          <button onClick={hit}>HIT</button>
          <button onClick={stand}>STAND</button>
        </>
      )}

      {result && <h2>{result}</h2>}
    </div>
  );
}
