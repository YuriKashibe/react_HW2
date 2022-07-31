import { useState } from "react";
import { ActionButton } from "../components/ActionButton";

export const Janken = () => {
    const [JankenResult, setJankenResult] = useState({
        myHand: "入力待ち",
        comHand: "待機中",
        result: "未対戦",
    });

    const [history, setHistory] = useState([]);

    const getJankenResult = (myHand) => {
        const hand = ["グー", "チョキ", "パー"];
        const myIndex = hand.indexOf(myHand);
        const comIndex = Math.floor(Math.random()*3);
        const resultSheet = [
            ["Draw", "Win", "Lose"],
            ["Lose", "Draw", "Win"],
            ["Win", "Lose", "Draw"],
        ];
        return {
            myHand: myHand,
            comHand: hand[comIndex],
            result: resultSheet[myIndex][comIndex],
        };
    };

    const getJanken = (myHand) => {
        const result = getJankenResult(myHand);
        setJankenResult(result);
        setHistory([result, ...history]); //...はスプレッド構文と言う
    };

  return (
    <>
      <p>じゃんけんの画面</p>
      <ActionButton text="グー" action={() => getJanken("グー")} />
      <ActionButton text="チョキ" action={() => getJanken("チョキ")} />
      <ActionButton text="パー" action={() => getJanken("パー")} />
      <p>自分の手：{JankenResult.myHand}</p>
      <p>相手の手：{JankenResult.comHand}</p>
      <p>結果：{JankenResult.result}</p>
      <p>履歴</p>
      <table>
        <thead>
          <tr>
            <th>自分の手</th>
            <th>相手の手</th>
            <th>結果</th>
          </tr>
        </thead>
        <tbody>
          {/* 🔽 履歴の配列から要素を生成して表示する */}
          {history.map((x, i) => (
            <tr key={i}>
              <td>{x.myHand}</td>
              <td>{x.comHand}</td>
              <td>{x.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};