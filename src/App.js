import React from "react";
import "./App.css";
import { Die } from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [roll, setRolls] = React.useState(0);
  const [startTime, setStartTime] = React.useState(null);
  const [endTime, setEndTime] = React.useState(null);
  const [highScore, setHighScore] = React.useState(
    JSON.parse(localStorage.getItem("highScore")) || Infinity
  );

  React.useEffect(() => {
    const everyDie = dice.every((die) => die.isHeld);
    const firstDie = dice[0].value;
    const allDiceMatch = dice.every((die) => die.value === firstDie);
    if (everyDie && allDiceMatch) {
      setEndTime(performance.now());
      if (timeDiff !== null && timeDiff < highScore) {
        setHighScore(timeDiff);
        localStorage.setItem("highScore", timeDiff);
      }

      setTenzies(true);
    }
  }, [dice, highScore, tenzies]);

  function getNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(getNewDice());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setDice((prevDice) =>
        prevDice.map((die) => {
          return die.isHeld ? die : getNewDice();
        })
      );

      if (startTime === null) {
        setStartTime(performance.now());
      }

      setRolls((prevTime) => prevTime + 1);
    } else {
      setTenzies(false);
      setDice(allNewDice());
      setRolls(0);
      setStartTime(null);
      setEndTime(null);
    }
  }

  function holdDice(id) {
    setDice(
      dice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }
  const diceElem = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      hold={() => holdDice(die.id)}
    />
  ));
  const timeDiff = endTime && startTime ? (endTime - startTime) / 1000 : null;

  function timeUsed() {
    if (timeDiff === null) {
      return "N/A";
    } else {
      return `${timeDiff} secs`;
    }
  }
  console.log(dice);
  return (
    <div className="App flex">
      <div className=" bg-emerald-950 flex p-6 m-auto">
        <div className="bg-white p-10 rounded-lg">
          {tenzies && <Confetti />}
          <h1 className="font-semibold text-center text-lg">Tenzies</h1>
          <h5 className="text-sm text-center mb-3">
            Roll until all dice are the same, click <br /> each die to freeze it
            at its current value <br /> between rolls
          </h5>
          <h1 className="text-center mb-3">No of Rolls: {roll}</h1>
          <h1 className="text-center mb-3">Time used: {timeUsed()}</h1>
          <h1 className="text-center mb-3">
            High Score: {JSON.parse(localStorage.getItem("highScore"))} secs
          </h1>
          <div className="grid grid-cols-5 gap-3">{diceElem}</div>
          <div className="flex mt-5">
            <button
              onClick={rollDice}
              className="bg-blue-600 py-3 px-4 rounded-md m-auto text-white"
            >
              {tenzies ? "New Game" : "Roll"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
