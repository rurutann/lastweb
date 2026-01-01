import { useState } from "react";

import NumberGuessGame from "./NumberGuessGame";
import SprGame from "./sprgame";
import SlotGame from "./SlotGame";
import BlackJGame from "./BlackjGame";
import DartGame from "./DarGame"; 

import slotImg from "./slot.png";
import mgame from "./mathgame.png";
import rgame from "./rps.png";
import blackjackImg from "./blackjack.png";
import dartImg from "./dart.png";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("home");

  return (
    <>
      {/* ===== ホーム画面 ===== */}
{currentScreen === "home" && (
  <div>
    {/* 上の模様バー */}
    <div
      style={{
        width: "100%",
        height: "80px",
        background:
          "repeating-linear-gradient(45deg, #ffefd5 0 10px, #ffd9b3 10px 20px)",
      }}
    />

    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>ミニゲーム集</h1>
      <p>遊びたいゲームを選んでください</p>

      {/* 1段目：スロット、じゃんけん、数字当て */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          marginTop: "30px",
        }}
      >
        <button onClick={() => setCurrentScreen("slot")}>
          <img src={slotImg} width="200" />
          <div>スロット</div>
        </button>

        <button onClick={() => setCurrentScreen("sprgame")}>
          <img src={rgame} width="200" />
          <div>じゃんけん</div>
        </button>

        <button onClick={() => setCurrentScreen("numberGuess")}>
          <img src={mgame} width="200" />
          <div>数字当て</div>
        </button>
      </div>

      {/* 2段目：ブラックジャックとダーツを横並び */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          marginTop: "30px",
        }}
      >
        <button onClick={() => setCurrentScreen("blackjack")}>
          <img src={blackjackImg} width="200" />
          <div>ブラックジャック</div>
        </button>

        <button onClick={() => setCurrentScreen("dart")}>
          {dartImg && <img src={dartImg} width="200" />}
          <div>ダーツ</div>
        </button>
      </div>
    </div>
  </div>
)}


      {/* ===== 各ゲーム画面 ===== */}
      {currentScreen === "numberGuess" && (
        <NumberGuessGame onBack={() => setCurrentScreen("home")} />
      )}

      {currentScreen === "sprgame" && (
        <SprGame onBack={() => setCurrentScreen("home")} />
      )}

      {currentScreen === "slot" && (
        <SlotGame onBack={() => setCurrentScreen("home")} />
      )}

      {currentScreen === "blackjack" && (
        <BlackJGame onBack={() => setCurrentScreen("home")} />
      )}
      {currentScreen === "dart" && (
        <DartGame onBack={() => setCurrentScreen("home")} />
      )}
    </>
  );
}
