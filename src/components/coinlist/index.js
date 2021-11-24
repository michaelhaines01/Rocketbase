import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.scss";
import ReactPaginate from "react-paginate";

export default function CoinList() {
  const [coinData, setCoinData] = useState([]);
  //const [isLoading, setisLoading] = useState(true);
  const [currentPage, setcurrentPage] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=market_cap_desc&per_page=250&page=${currentPage}&sparkline=false`,
    })
      .then((response) => {
        setCoinData([...response.data]);
      })
      //.then(setisLoading(false))
      .catch((err) => console.log(err));
  }, [currentPage]);

  const handlePageChange = (page) => {
    // setisLoading(true);
    setcurrentPage(page.selected + 1);
  };

  const searchItems = (search) => {
    console.log(search);
    setSearchInput(search);
    if (searchInput !== "") {
      const filteredData = coinData.filter((item) => {
        return (
          item.id.includes(searchInput.toLowerCase()) ||
          item.symbol.toLowerCase().includes(searchInput.toLowerCase())
        );
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(coinData);
    }
  };

  return (
    <div>
      <input
        icon="search"
        type="text"
        onChange={(e) => searchItems(e.target.value)}
      />

      {searchInput.length > 1
        ? filteredResults.map((coin) => (
            <div className="coindata-container">
              <h6>{coin.name}</h6>
              <h6>{coin.symbol}</h6>
              <h4>Market cap: {coin.market_cap}</h4>
              <h4>current: {coin.current_price}</h4>
            </div>
          ))
        : coinData.map((coin) => (
            <div className="coindata-container">
              <h6>{coin.name}</h6>
              <h6>{coin.symbol}</h6>
              <h4>Market cap: {coin.market_cap}</h4>
              <h4>Current: {coin.current_price}</h4>
            </div>
          ))}

      <ReactPaginate
        pageCount={222}
        pageRange={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        renderOnZeroPageCount={null}
      />
    </div>
  );
}
