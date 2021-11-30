import React from "react";
import { formatDistance, format } from "date-fns";
import "./styles.scss";

export default function Formatdate({ timestamp }) {
  return (
    <div className="date-wrapper">
      <div>{format(new Date(timestamp), "PPP")}</div>
      <div>{formatDistance(new Date(timestamp), new Date())}</div>
    </div>
  );
}
