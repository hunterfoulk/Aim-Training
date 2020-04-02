import React from "react";
import "./Game.css";
import { FiTarget } from "react-icons/fi";
import { FaHome } from "react-icons/fa";
import { IoMdStats } from "react-icons/io";

export default function Header({ toggleLeaderboard, endGame }) {
  return (
    <div className="header">
      <div className="text-holder">
        <FiTarget className="targeticon" />

        <p>Aim-Training</p>
      </div>
      <div className="home-icons">
        <IoMdStats className="stats" onClick={() => toggleLeaderboard()} />
        <a href="/">
          <FaHome className="home-button" />
        </a>
      </div>
    </div>
  );
}
