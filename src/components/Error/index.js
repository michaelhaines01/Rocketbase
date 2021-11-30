import React from "react";
import "./style.scss";

export default function Error() {
  return (
    <div className="error-container">
      <div className="error-wrapper">
        <h1>There seems to have been a failed launch!</h1>
        <h2>Refresh Page to try again</h2>
        <div className="image-container">
          <img src={`${process.env.PUBLIC_URL}/rocket.svg`} alt="rocket" />
        </div>
      </div>
    </div>
  );
}
