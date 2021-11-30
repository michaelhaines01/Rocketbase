import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../Searchbar";
import "./styles.scss";

export default function Navbar() {
  return (
    <div className="nav-container">
      <div className="nav-link-wrapper">
        <div className="logo-wrapper">
          <Link to="/rocketbase" className="link-wrapper">
            <img src={`${process.env.PUBLIC_URL}/rocket.svg`} alt="rocket" />
            <h1>Rocketbase</h1>
          </Link>
        </div>
        <Link to="/trending" className="link-wrapper">
          <h1>Trending</h1>
          <img
            className="flame-img"
            src={`${process.env.PUBLIC_URL}/flame.svg`}
            alt="flame"
          />
        </Link>
        <SearchBar />
      </div>
    </div>
  );
}
