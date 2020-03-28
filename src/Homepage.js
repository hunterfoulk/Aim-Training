import React from "react";
import Header from "./Header";
import { FiTarget } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Homepage({ startGame }) {
  return (
    <>
      <div className="Home-main">
        <div className="container-one">
          <FiTarget className="container-target" />
          <h1>Aim-Training</h1>
        </div>
        <div className="text-p">
          <p>MOUSE ACCURACY | REACTION | AIM TRAINING</p>
        </div>
        <div className="container-two">
          <button onClick={() => startGame()} className="start-button">
            Start
          </button>
        </div>
      </div>
    </>
  );
}
