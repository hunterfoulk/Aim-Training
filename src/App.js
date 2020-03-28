import React, { useState, useEffect, useRef } from "react";
import Homepage from "./Homepage";
import "./Game.css";
import Header from "./Header";
import _ from "lodash";

let gameTime = 10;

export default function App() {
  const [playing, inSession] = useState(false);
  const [targets, setTargets] = useState([]);
  const [seconds, setSeconds] = useState(gameTime);
  const [hits, setHits] = useState(0);
  const [endGame, setEndgame] = useState(false);
  const containerRef = useRef();
  const [misses, setMisses] = useState(0);

  let timer = seconds;
  const hitsCounter = hits;
  const missesCounter = misses;

  const accuracy = (hitsCounter / (missesCounter + hitsCounter)) * 100;

  // const lowDif = 750;
  // const medDif = 500;
  // const hardDif = 250;

  const startGame = () => {
    setSeconds(gameTime);
    setEndgame(false);
    let zeroId = 0;
    setMisses(0);
    setHits(0);
    inSession(true);
    const gameTimer = setInterval(() => {
      let nextId = zeroId++;
      let stop = false;
      setSeconds(secs => {
        if (secs === 0) {
          clearInterval(gameTimer);
          stop = true;
        }
        return secs;
      });
      if (!stop) {
        const targStyle = {
          position: "absolute",
          top: Math.floor(
            Math.random() * (containerRef.current.clientHeight - 200) + 100
          ),
          left: Math.floor(
            Math.random() * (containerRef.current.clientWidth - 200) + 100
          ),
          backgroundColor: "rgb(190, 39, 39)"
        };
        setTargets(prevState => [
          ...prevState,
          {
            target: "target" + nextId,
            targStyle: targStyle,
            id: nextId
          }
        ]);
      }
    }, 400);
  };

  useEffect(() => {
    if (playing) {
      let timer = setInterval(() => {
        setSeconds(seconds => {
          let newSeconds = seconds - 1;
          if (newSeconds === 0 && playing) {
            clearInterval(timer);
            stopGame();
          }
          return newSeconds;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [playing]);

  const stopGame = () => {
    setTargets([]);
    inSession(false);
    setEndgame(true);
  };

  const handleClick = id => {
    setTargets(prevState => prevState.filter(t => t.id !== id));
    let increment = hits + 1;
    playing && setHits(increment);
    console.log("targets hit:", hits);
  };

  const handleMisses = () => {
    let increment = misses + 1;
    playing && setMisses(increment);
    console.log("misses:", misses);
  };

  return (
    <>
      <Header />
      {!playing && !endGame ? (
        <>
          <Homepage startGame={startGame} />
        </>
      ) : (
        <>
          <div className="timer">
            <p>TIME</p>
            <div className="timer-size">{timer}</div>
            <p>HITS</p>
            <div className="hits-counter">{hitsCounter}</div>
            <p className="misses-text">MISSES</p>
            <div className="misses-counter"> {missesCounter}</div>
          </div>
          {targets.map(({ circle, id, targStyle }) => (
            <div
              style={targStyle}
              className="circle"
              key={id}
              onClick={e => handleClick(id)}
            >
              {circle}
            </div>
          ))}
          <div
            onClick={handleMisses}
            className="Game"
            id="game"
            ref={containerRef}
          />
        </>
      )}
      {endGame && (
        <div className="modal">
          <div className="boxes-container">
            <div className="boxes-one">
              <p>HITS</p>
              <div className="box-hit-counter">{hitsCounter}</div>
            </div>
            <div className="boxes-two">
              <p>MISSES</p>
              <div className="box-hit-counter">{missesCounter}</div>
            </div>
            <div className="boxes-three">
              <p>ACCURACY</p>
              <div className="box-accuracy-counter">{accuracy.toFixed(0)}%</div>
            </div>
          </div>
          <button onClick={startGame} className="restart-button">
            Restart
          </button>
        </div>
      )}
    </>
  );
}
