import React, { useState, useEffect } from "react";
import "./Game.css";
import Header from "./Header";
import _ from "lodash";

let id = 0;
export default function Game() {
  const [targets, setTargets] = useState([]);
  const [date, setDate] = useState();
  const [seconds, setSeconds] = useState(4);

  const width = window.innerWidth;
  const height = window.innerHeight;

  // const game = document.querySelector("Game");
  // console.log(game.height);

  useEffect(() => {
    setTimeout(() => {
      setDate(new Date().toLocaleTimeString());
      if (seconds > 0) {
        setSeconds(seconds - 1);
        console.log(date);
      }
    }, 1000);
  }, [date, seconds]);

  useEffect(() => {
    const gameTimer = setInterval(() => {
      const nextId = id++;

      const targStyle = {
        position: "absolute",
        top: Math.floor(Math.random() * height - 200),
        left: Math.floor(Math.random() * width),
        backgroundColor: "green"
      };

      setTargets(prevState => [
        ...prevState,
        {
          target: "target" + nextId,
          targStyle: targStyle,
          id: nextId,
          hit: false
        }
      ]);
    }, 2000);
    if (seconds === 0) {
      clearInterval(gameTimer);
    }
  }, []);

  const handleClick = target => () => {
    setTargets(prevState => prevState.filter(t => t.id !== target));
  };

  return (
    <>
      <Header />
      <div className="Game" id="game">
        <div className="board">
          {targets.map(({ circle, id, targStyle }) => (
            <div
              style={targStyle}
              className="circle"
              key={id}
              onClick={handleClick(id)}
            >
              {circle}
              {id}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
