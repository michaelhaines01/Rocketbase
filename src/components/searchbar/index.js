import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";

export default function SearchBar() {
  const [coinList, setCoinList] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();

  const handleClick = (id) => {
    setSearchInput("");
    setFilteredResults([]);
    navigate(`/details/${id}`);
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=market_cap_desc&per_page=250&page=1&sparkline=false`,
    })
      .then((response) => {
        setCoinList([...response.data]);
      })
      .catch((err) => console.log(err));
  }, []);

  const searchItems = (search) => {
    setSearchInput(search);
  };

  useEffect(() => {
    const filteredData = coinList.filter((item) => {
      return (
        item.id.includes(searchInput.toLowerCase()) ||
        item.symbol.toLowerCase().includes(searchInput.toLowerCase())
      );
    });
    setFilteredResults(filteredData);
  }, [searchInput, coinList]);

  return (
    <div className="results-container">
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        size="small"
        style={{ backgroundColor: "white" }}
        InputProps={{
          style: {
            borderColor: "white",
          },
        }}
        onChange={(e) => searchItems(e.target.value)}
      />
      {searchInput.length >= 1
        ? filteredResults.map((coin) => (
            <div
              className="coindata-container"
              onClick={() => handleClick(coin.id)}
            >
              <div className="coindata-wrapper">
                <h5>{coin.name}</h5>

                <h6>{coin.symbol}</h6>
              </div>
            </div>
          ))
        : null}
    </div>
  );
}
