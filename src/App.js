import React, { useState, useEffect, useRef } from "react";
import Homepage from "./Homepage";
import Leaderboard from "./Leaderboard";
import "./Game.css";
import Header from "./Header";
import _ from "lodash";
import axios from "axios";

let gameTime = 20;
export default function App() {
  if (process.env.NODE_ENV !== "production") console.log = function() {};
  const [playing, inSession] = useState(false);
  const [targets, setTargets] = useState([]);
  const [seconds, setSeconds] = useState(gameTime);
  const [hits, setHits] = useState(0);
  const [endGame, setEndgame] = useState(false);
  const containerRef = useRef();
  const [misses, setMisses] = useState(0);
  const [user, setUser] = useState({ name: "" });
  const [entry, setEntry] = useState(false);
  const [components, setComponents] = useState({ leaderboard: false });

  let timer = seconds;
  const hitsCounter = hits;
  const missesCounter = misses;

  const accuracy = (hitsCounter / (missesCounter + hitsCounter)) * 100;

  const startGame = () => {
    if (!user.name) {
      try {
      } catch (error) {
        console.log(error);
      }
      return;
    }
    setSeconds(gameTime);
    setEndgame(false);
    setMisses(0);
    setHits(0);
    inSession(true);
    setComponents({ ...components, leaderboard: false });
    let zeroId = 0;
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
    console.log("timer");

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

  useEffect(() => {
    if (endGame) {
      console.log("hits:", hits);
      console.log("misses:", misses);
      console.log("accuracy:", accuracy);
      const postToLeaderboard = async () => {
        await axios
          .post(process.env.REACT_APP_PROD_POST_URL, {
            name: user.name,
            hits: hits,
            misses: misses,
            accuracy: accuracy
          })
          .then(() => {
            console.log("data sent to leaderboards");
            setEntry(true);
          })
          .catch(error => console.log(error));
      };
      postToLeaderboard();
    }
  }, [endGame]);

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

  const setName = e => {
    let name = e.target.value;
    try {
      setUser({ ...user, name: name.replace(/[^a-z]/gi, "").toLowerCase() });
    } catch (error) {
      console.log(error);
    }
  };

  const toggleLeaderboard = () => {
    setComponents({ ...components, leaderboard: !components.leaderboard });
    setEntry(true);
  };

  return (
    <>
      <Header toggleLeaderboard={toggleLeaderboard} endGame={endGame} />
      {components.leaderboard && (
        <Leaderboard user={user} components={components} entry={entry} />
      )}
      {!playing && !endGame ? (
        <>
          <Homepage startGame={startGame} user={user} setName={setName} />
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
