import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
export default function SearchBar() {
  const [coinList, setCoinList] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/details/${id}`);
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=market_cap_desc&per_page=10&page=1&sparkline=false`,
    })
      .then((response) => {
        setCoinList([...response.data]);
      })
      //.then(setisLoading(false))
      .catch((err) => console.log(err));
  }, []);

  const searchItems = (search) => {
    setSearchInput(search);
    if (searchInput !== "") {
      const filteredData = coinList.filter((item) => {
        return (
          item.id.includes(searchInput.toLowerCase()) ||
          item.symbol.toLowerCase().includes(searchInput.toLowerCase())
        );
      });
      setFilteredResults(filteredData);
    }
  };

  return (
    <div>
      <input
        icon="search"
        type="text"
        placeholder="Search for any coin"
        onChange={(e) => searchItems(e.target.value)}
      />
      <div className="results-container">
        {searchInput.length > 1
          ? filteredResults.map((coin) => (
              <div
                className="coindata-container"
                onClick={() => handleClick(coin.id)}
              >
                <h6>{coin.name}</h6>

                <h6>{coin.symbol}</h6>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

//{filteredResults.map((coin) => {
//
//  <h1>{coin.name}</h1>
//;
//  })}
