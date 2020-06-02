import React from "react";
import "./style.css";

export default function Spinner({ hidden }) {
  return (
    <div className={`spinner ${hidden && 'hidden'}`}>
      <div className="double-bounce1"></div>
      <div className="double-bounce2"></div>
    </div>
  );
}
