import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Formatdate from "../FormatDate";
import Error from "../Error";
import Loader from "react-loader-spinner";
import "./styles.scss";

export default function CoinDetails() {
  const [coinInfo, setCoinInfo] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios({
      method: "get",
      url: `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`,
    })
      .then((response) => {
        setCoinInfo(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  return (
    <div data-testid="coin-detail">
      {loading && (
        <div className="loader-wrapper">
          <Loader
            type="Circles"
            color="#0650a5"
            height={100}
            width={100}
            visible={loading}
          />
        </div>
      )}
      {error ? (
        <Error />
      ) : (
        coinInfo &&
        !loading && (
          <div className="detail-container">
            <div className="left">
              <div className="coinheader-container">
                <div className="image-wrapper">
                  <img src={coinInfo.image.large} alt="Coin Icon" />
                </div>
                <h1>{coinInfo.name}</h1>
                <h2>({coinInfo.symbol}) </h2>
              </div>
              <div
                className="description"
                dangerouslySetInnerHTML={{ __html: coinInfo.description.en }}
              ></div>
            </div>
            <div className=" right">
              <div class="grid-container">
                <div class="row">
                  <div className="item">
                    <h4>Price</h4>
                    <h4>${coinInfo.market_data.current_price.aud}</h4>
                  </div>
                </div>
                <div class="row">
                  <div className="item">
                    <h4>Market cap</h4>
                    <h4>${coinInfo.market_data.market_cap.aud}</h4>
                  </div>
                </div>
                <div class="row">
                  <div className="item">
                    <h4>Market Cap rank</h4>
                    <h4>#{coinInfo.market_data.market_cap_rank}</h4>
                  </div>
                </div>
                <div class="row">
                  <div className="item">
                    <h4>24h Low / 24h High</h4>
                    <h4>
                      ${coinInfo.market_data.low_24h.aud}/
                      {coinInfo.market_data.high_24h.aud}
                    </h4>
                  </div>
                </div>
                <div class="row">
                  <div className="item">
                    <h4>All-Time High</h4>
                    <div className="at-wrapper">
                      <h4>${coinInfo.market_data.ath.aud}</h4>
                      <h4>%{coinInfo.market_data.ath_change_percentage.aud}</h4>
                    </div>
                    <Formatdate timestamp={coinInfo.market_data.ath_date.aud} />
                  </div>
                </div>
                <div class="row">
                  <div className="item">
                    <h4>All-Time Low </h4>
                    <div className="at-wrapper">
                      <h4>${coinInfo.market_data.atl.aud}</h4>
                      <h4>%{coinInfo.market_data.atl_change_percentage.aud}</h4>
                    </div>
                    <Formatdate timestamp={coinInfo.market_data.atl_date.aud} />
                  </div>
                </div>
              </div>
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
        )
      )}
    </div>
  );
}
