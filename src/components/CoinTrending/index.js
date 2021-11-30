import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Error from "../Error";
import Loader from "react-loader-spinner";
import "./styles.scss";

export default function CoinTrending() {
  const navigate = useNavigate();
  const [coinData, setCoinData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios({
      method: "get",
      url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=volume_desc&per_page=10&page=1&sparkline=true&price_change_percentage=1h%2C7%2C24h%2C`,
    })
      .then((response) => {
        setCoinData([...response.data]);
        setLoading(false);
      })

      .catch((err) => setError(true));
  }, []);

  const handleClick = (coin) => {
    navigate(`/details/${coin}`);
  };

  return (
    <div data-testid="coin-trending">
      {error ? (
        <Error />
      ) : (
        <div className="container">
          <h1>Top 10 Trending by Volume</h1>
          <div class="trending-grid-container">
            {loading && (
              <div className="loader-wrapper">
                <Loader
                  type="Circles"
                  color="#0650a5"
                  height={100}
                  width={100}
                  visible={loading} //3 secs
                />
              </div>
            )}
            {coinData &&
              !loading &&
              coinData.map((coin, index) => (
                <div class="row" onClick={() => handleClick(coin.id)}>
                  <div className="item-container">
                    <h4>{index + 1} </h4>
                    <div className="image-wrapper">
                      <img src={coin.image} alt="Coin Icon" />
                    </div>
                    <h5>{coin.name}</h5>
                    <h5 id="symbol">{coin.symbol}</h5>
                    <h5>Volume : ${coin.total_volume}</h5>
                    <h5>Current price: ${coin.current_price}</h5>
                  </div>
                </div>
              ))}
          </div>
          <div className="top-svg-wrapper">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="black"
                d="M50,-69.9C64.1,-58.5,74.3,-43,81.1,-25.6C87.8,-8.1,91,11.2,86.6,29.2C82.3,47.2,70.4,63.9,54.7,71.1C39,78.4,19.5,76.3,1,75C-17.6,73.6,-35.1,73.1,-49.6,65.4C-64.2,57.8,-75.6,43,-78,27.3C-80.3,11.6,-73.5,-5,-67.3,-21.2C-61.2,-37.4,-55.6,-53.2,-44.5,-65.5C-33.4,-77.8,-16.7,-86.7,0.6,-87.5C17.9,-88.4,35.9,-81.2,50,-69.9Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>
          <div className="bottom-svg-wrapper">
            <img src={`${process.env.PUBLIC_URL}/rocket.svg`} alt="rocket" />
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="black"
                d="M24.9,-36.5C29.3,-31.1,27.8,-19.8,37.1,-8.1C46.4,3.6,66.4,15.9,65.9,22.8C65.5,29.7,44.7,31.3,30.3,40.6C15.9,49.9,8,66.9,-3.2,71.2C-14.3,75.6,-28.5,67.2,-43.9,58.3C-59.3,49.3,-75.8,39.6,-81.9,25.5C-88.1,11.3,-84,-7.3,-78.4,-25.7C-72.7,-44.1,-65.5,-62.2,-52.2,-64.7C-38.9,-67.2,-19.5,-54.1,-4.6,-47.8C10.3,-41.4,20.5,-41.9,24.9,-36.5Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
