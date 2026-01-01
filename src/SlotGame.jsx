import { useEffect, useRef, useState } from "react";
import watermelon from "./watermelon.png";
import grape from "./budou.png";
import cherry from "./cherry.png";

const symbols = [
  { name: "スイカ", img: watermelon },
  { name: "ぶどう", img: grape },
  { name: "さくらんぼ", img: cherry },
];

export default function SlotGame({ onBack }) {
  // 各リールの現在位置（index）
  const [reels, setReels] = useState([0, 0, 0]);

  // 各リールが止まっているか
  const [stopped, setStopped] = useState([true, true, true]);

  // 回転中かどうか（START制御用）
  const [isSpinning, setIsSpinning] = useState(false);

  // 結果表示
  const [result, setResult] = useState("");

  // interval 管理
  const timers = useRef([null, null, null]);

  // STARTボタン
  const start = () => {
    if (isSpinning) return; // 二重START防止

    setResult("");
    setIsSpinning(true);
    setStopped([false, false, false]);

    timers.current.forEach((_, i) => {
      timers.current[i] = setInterval(() => {
        setReels((prev) => {
          const copy = [...prev];
          copy[i] = (copy[i] + 1) % symbols.length;
          return copy;
        });
      }, 100);
    });
  };

  // STOPボタン
  const stopReel = (index) => {
    if (!isSpinning || stopped[index]) return;

    clearInterval(timers.current[index]);

    setStopped((prev) => {
      const copy = [...prev];
      copy[index] = true;
      return copy;
    });
  };

  // 全部止まったら結果判定
  useEffect(() => {
    if (stopped.every(Boolean) && isSpinning) {
      setIsSpinning(false);

      const [a, b, c] = reels;
      if (a === b && b === c) {
        setResult("🎉 大当たり！ 🎉");
      } else {
        setResult("残念…");
      }
    }
  }, [stopped, reels, isSpinning]);

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>スロットゲーム</h1>

      {/* リール表示 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          marginBottom: "20px",
        }}
      >
        {reels.map((r, i) => (
          <div key={i}>
            <img
              src={symbols[r].img}
              alt={symbols[r].name}
              style={{ width: "120px", height: "120px" }}
            />
            <br />
            <button
            onClick={() => stopReel(i)}
            disabled={!isSpinning || stopped[i]}
            style={{
                marginTop: "50px",
                width: "120px",      // ← 横幅 
                height: "50px",      // ← 高さ
                fontSize: "20px",    // ← 文字サイズ
                fontWeight: "bold", // ← 文字太さ
                }}
                >
                    STOP
                    </button>

          </div>
        ))}
      </div>

      {/* START */}
      <button
        onClick={start}
        disabled={isSpinning}
        style={{ fontSize: "18px", padding: "5px 20px" }}
      >
        START
      </button>

      {/* 結果 */}
      {result && <h2 style={{ marginTop: "20px" }}>{result}</h2>}

      {/* 戻る */}
      <button onClick={onBack} style={{ marginTop: "20px" }}>
        ホームに戻る
      </button>
    </div>
  );
}
