import React from "react";
import "./Game.css";
import { FiTarget } from "react-icons/fi";
import { FaHome } from "react-icons/fa";
import { IoMdStats } from "react-icons/io";

export default function Header() {
  return (
    <div className="header">
      <div className="text-holder">
        <FiTarget className="targeticon" />
        <p> Aim-Trainer</p>
      </div>
      <div className="home-icons">
        <IoMdStats className="stats" />
        <FaHome />
      </div>
    </div>
  );
}
