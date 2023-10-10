import React from "react";
import "./App.css";
import { Die } from "./Die";
import { nanoid } from "nanoid";

function App() {
  const [dice, setDice] = React.useState(allNewDice());

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    console.log();
    return newDice;
  }

  const diceElem = dice.map((die) => <Die value={die.value} />);

  function newArr() {
    setDice(dice);
  }
  console.log(dice);
  return (
    <div className="App flex">
      <div className=" bg-emerald-950 flex p-6 m-auto">
        <div className="bg-white p-10 rounded-lg">
          <h1 className="font-semibold text-center text-lg">Tenzies</h1>
          <h5 className="text-sm text-center mb-3">
            Roll until all dice are the same, click <br /> each die to freeze it
            at its current value <br /> between rolls
          </h5>
          <div className="grid grid-cols-5 gap-3">{diceElem}</div>
          <div className="flex mt-5">
            <button
              onClick={newArr}
              className="bg-blue-600 py-3 px-4 rounded-md m-auto text-white"
            >
              Roll
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
