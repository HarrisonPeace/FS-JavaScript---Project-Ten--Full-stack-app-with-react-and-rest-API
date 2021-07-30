import React from "react";
import loadingIcon from "../loading-icon.gif"

const Loading = () => {
  return (
    <div className="loading-container">
      <img className="loading" src={loadingIcon} alt="Loading Icon"/>
    </div>
  );
};

export default Loading;