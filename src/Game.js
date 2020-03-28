import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import "./Game.css";
import Header from "./Header";
import _ from "lodash";
import targetPic from "./Images/targetpic.png";
import useForceUpdate from "use-force-update";

let id = 0;
let click = 0;
export default function Game() {
  const [targets, setTargets] = useState([]);
  const [date, setDate] = useState();
  const [seconds, setSeconds] = useState(5);
  const [hits, setHits] = useState([]);
  const [endModal, setEndModal] = useState(false);
  const [endGame, setEndgame] = useState(false);
  const [start, setStart] = useState(false);
  const containerRef = useRef();
  const [misses, setMisses] = useState([]);
  const useForceUpdate = () => useState()[1];

  let timer = seconds;

  useEffect(() => {
    setTimeout(() => {
      setDate(new Date().toLocaleTimeString());
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);
    if (seconds === 0) {
      setTargets([]);
    }
  }, [date, seconds]);

  useEffect(() => {
    const gameTimer = setInterval(() => {
      const nextId = id++;

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
          targPic: targetPic,
          id: nextId,
          hit: false
        }
      ]);
      setSeconds(secs => {
        if (secs === 0) clearInterval(gameTimer);

        return secs;
      });
    }, 500);
  }, []);

  const handleClick = id => {
    setTargets(prevState => prevState.filter(t => t.id !== id));
    const newHits = [...hits, id];
    setHits(newHits);
    console.log("targets hit:", hits);
  };

  useEffect(() => {
    if (seconds === 0) {
      setEndgame(true);
      setTimeout(() => {
        setEndModal(true);
        setEndgame(false);
      }, 1500);
    }
  }, [seconds]);

  const hitsCounter = hits.length;
  const missesCounter = misses.length;

  const handleMisses = () => {
    const newMisses = [...misses, click++];
    setMisses(newMisses);
    console.log("misses:", misses);
  };

  const restartGame = () => {
    setMisses([]);
    setSeconds([]);
    setHits([]);
    setEndModal(false);
  };

  return (
    <>
      <Header />
      {endModal && (
        <div className="modal">
          <div className="boxes-container">
            <div className="boxes-one">
              <p>HITS</p>
              <div className="box-hit-counter">{hitsCounter}</div>
            </div>
            <div className="boxes-two">
              <p>MISSES</p>
            </div>
            <div className="boxes-three">
              <p>ACCURACY</p>
            </div>
          </div>

          <button onClick={restartGame} className="restart-button">
            Restart
          </button>
        </div>
      )}
      <div onClick={handleMisses} className="Game" id="game" ref={containerRef}>
        {endGame && (
          <div className="loading">
            <p>Loading stats...</p>
          </div>
        )}

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
      </div>
    </>
  );
}
