import React, { useState, useEffect } from "react";
import SearchBar from "../searchbar/";
import "./styles.scss";
export default function Header() {
  return (
    <div className="header-container">
      <h1>Crypto</h1>
      <SearchBar />
    </div>
  );
}
