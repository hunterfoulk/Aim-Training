import React, { useEffect, useState } from "react";
import axios from "axios";
export default function Leaderboard({ user, entry }) {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const leaderboards = async () => {
      console.log("--Fetching leaderboard entries");
      await axios
        .get(process.env.REACT_APP_PROD_GET_URL)
        .then(res => {
          res.data.sort((b, a) => a.hits - b.hits);
          console.log(res.data);
          setEntries(res.data);
        })
        .catch(e => console.log(e));
    };
    entry && leaderboards();
  }, [entry]);

  return (
    <>
      <div className="leaderboard-main">
        <h1>LEADERBOARD</h1>
        <div className="scores-container">
          {entries.slice(0, 6).map((set, i) => (
            <div key={i} className="scores">
              <span>{set.name}</span>
              <div className="rows">
                <div className="numbers">
                  <p>hits</p>
                  <br></br>
                  {set.hits}
                </div>
                <div className="numbers">
                  <p>misses</p>
                  <br></br>
                  {set.misses}
                </div>
                <div className="numbers">
                  <p>accuracy</p>
                  <br></br>
                  {set.accuracy.toFixed(0)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
