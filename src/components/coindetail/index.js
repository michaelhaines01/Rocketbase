import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function CoinDetail() {
  const [coinInfo, setCoinInfo] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios({
      method: "get",
      url: `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`,
    })
      .then((response) => {
        setCoinInfo(response.data);
      })
      //.then(setisLoading(false))
      .catch((err) => console.log(err));
  }, [id]);
  console.log(coinInfo);
  return (
    <div>
      <h1>{coinInfo.name}</h1>
      <h1>{coinInfo.symbol}</h1>
    </div>
  );
}
