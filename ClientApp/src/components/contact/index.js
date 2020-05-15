import React from "react";
import "./style.css";

export default function Contact({ name, number, onEdit }) {
  return (
    <div className="contact flex row">
      <div className="image"></div>
      <div className="info flex column box grow">
        <div className="name">{name}</div>
        <div className="number">{number}</div>
      </div>
      <button onClick={onEdit} className="button">
        edit
      </button>
    </div>
  );
}
