import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Error from "../Error";
import "./styles.scss";

export default function CoinList() {
  const [coinData, setCoinData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setcurrentPage] = useState(0);
  const navigate = useNavigate();

  const columns = [
    {
      field: "image",
      headerName: "",
      flex: 0.5,
      renderCell: (params) => (
        <img style={{ width: "100%" }} src={params.value} alt="coin" />
      ),
    },
    { minWidth: 100, field: "name", headerName: "Name", flex: 1 },

    { minWidth: 100, field: "symbol", headerName: "Symbol", flex: 1 },
    {
      minWidth: 150,
      field: "market_cap",
      headerName: "Marketcap ($)",
      flex: 1,
    },
    {
      minWidth: 150,
      field: "market_cap_change_percentage_24h",
      headerName: "Change 24h (%) ",
      flex: 1,
    },
    {
      minWidth: 150,
      field: "current_price",
      headerName: "Current Price ($)",
      flex: 1,
    },
    { minWidth: 150, field: "low_24h", headerName: "Low 24h ($)", flex: 1 },
    { minWidth: 150, field: "high_24h", headerName: "High 24h ($)", flex: 1 },
  ];

  useEffect(() => {
    axios({
      method: "get",
      url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=market_cap_desc&per_page=100&page=${currentPage}&sparkline=false`,
    })
      .then((response) => {
        setCoinData([...response.data]);
        setisLoading(false);
      })

      .catch((err) => setError(true));
  }, [currentPage]);

  const handlePageChange = (page) => {
    setcurrentPage(page);
  };

  const handleRowSelection = (selectedRow) => {
    navigate(`/details/${selectedRow.id}`);
  };

  return (
    <div data-testid="coin-list">
      {error ? (
        <Error />
      ) : (
        <div className="data-container">
          <h1>Cryptocurrency Prices by Market Cap</h1>
          <div className="data-wrapper">
            <DataGrid
              loading={isLoading}
              rows={coinData}
              columns={columns}
              onPageChange={handlePageChange}
              page={currentPage}
              pageSize={25}
              onRowClick={handleRowSelection}
            />
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
