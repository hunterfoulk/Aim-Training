import React from "react";
import { FiTarget } from "react-icons/fi";
import gitIcon from "./images/githubicon.png";

const Homepage = ({ startGame, user, setName }) => {
  return (
    <>
      <div className="Home-main">
        <div className="main-container">
          <div className="container-one">
            <FiTarget className="container-target" />
            <h1>Aim-Training</h1>
          </div>
          <div className="text-p">
            <p>MOUSE ACCURACY | REACTION | AIM TRAINING</p>
          </div>
          <div className="container-two">
            <form autoComplete="off" onSubmit={e => e.preventDefault()}>
              <input
                autoFocus={true}
                onfocus=""
                id="name"
                placeholder="Enter username..."
                maxLength={8}
                value={user.name}
                onChange={e => setName(e)}
              ></input>
            </form>
            <button onClick={() => startGame()} className="start-button">
              Start
            </button>
          </div>
        </div>

        <div className="footer-links">
          <a href="https://github.com/hunterfoulk" target="_blank">
            <img src={gitIcon}></img>
          </a>
          <span className="span-one">
            Created by <FiTarget className="footer-target" />
            <span className="span-two">Hunt</span>
          </span>
        </div>
      </div>
    </>
  );
};
export default Homepage;
