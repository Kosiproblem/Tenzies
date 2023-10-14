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

  React.useEffect(() => {
    const everyDie = dice.every((die) => die.isHeld);
    const firstDie = dice[0].value;
    const allDiceMatch = dice.every((die) => die.value === firstDie);
    if (everyDie && allDiceMatch) {
      setTenzies(true);
    }
  }, [dice]);

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

      setStartTime(performance.now());
      console.log(`Start: ${startTime}`);

      setRolls((prevTime) => prevTime + 1);
    } else {
      setTenzies(false);
      setDice(allNewDice());
      setRolls(0);

      if (startTime !== null) {
        const endTime = performance.now();
        const timeDiff = endTime - startTime;
        return timeDiff;
      }
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

  // function newGame() {
  //   setDice(dice);
  // }
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
          <h1 className="text-center mb-3">
            Time used:{" "}
            {startTime !== null ? (performance.now() - startTime) / 1000 : 0}
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
