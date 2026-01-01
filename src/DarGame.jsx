import { useState, useRef } from "react";

const points = [10, 20, 30, 40, 50]; // ダーツの得点例

export default function DartGame({ onBack }) {
  const [currentPoint, setCurrentPoint] = useState(0);       // 回転中の得点
  const [playerScores, setPlayerScores] = useState([]);      // プレイヤーのスコア配列
  const [dealerScores, setDealerScores] = useState([]);      // ディーラーのスコア配列
  const [round, setRound] = useState(1);                     // 現在のラウンド（1~3）
  const [isSpinning, setIsSpinning] = useState(false);       // 回転中かどうか
  const [result, setResult] = useState("");                  // 勝敗
  const timer = useRef(null);

  // STARTボタン
  const start = () => {
    if (round > 3) return;
    setIsSpinning(true);

    timer.current = setInterval(() => {
      setCurrentPoint(Math.floor(Math.random() * points.length));
    }, 50); // 0.05秒ごとに変化（早い）
  };

  // STOPボタン
  const stop = () => {
    if (!isSpinning) return;

    clearInterval(timer.current);
    setIsSpinning(false);

    const player = points[currentPoint];
    const dealer = points[Math.floor(Math.random() * points.length)];

    setPlayerScores([...playerScores, player]);
    setDealerScores([...dealerScores, dealer]);

    if (round === 3) {
      // 3回終了したら勝敗判定
      const playerTotal = [...playerScores, player].reduce((a, b) => a + b, 0);
      const dealerTotal = [...dealerScores, dealer].reduce((a, b) => a + b, 0);

      if (playerTotal > dealerTotal) setResult(`あなたの勝ち！ (${playerTotal} vs ${dealerTotal})`);
      else if (playerTotal < dealerTotal) setResult(`ディーラーの勝ち (${playerTotal} vs ${dealerTotal})`);
      else setResult(`引き分け (${playerTotal} vs ${dealerTotal})`);
    }

    setRound(round + 1);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>的（3ラウンド）</h1>

      {round <= 3 && (
        <>
          <p>ラウンド: {round} / 3</p>
          <p>的の得点: <strong>{points[currentPoint]}</strong></p>
          {!isSpinning && <button onClick={start} style={{ fontSize: "18px", padding: "5px 20px" }}>START</button>}
          {isSpinning && <button onClick={stop} style={{ fontSize: "18px", padding: "5px 20px" }}>STOP</button>}
        </>
      )}

      {playerScores.length > 0 && (
        <>
          <h3>あなたの得点: {playerScores.join(", ")}</h3>
          <h3>ディーラーの得点: {dealerScores.join(", ")}</h3>
        </>
      )}

      {result && <h2>{result}</h2>}

      <button onClick={onBack} style={{ marginTop: "20px" }}>ホームに戻る</button>
    </div>
  );
}
