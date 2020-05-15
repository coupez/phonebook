import React from "react";
import "./style.css";

import regular from "./peeps/regular.png";

export default function Input() {
  return (
    <div className="big-input">
      <img className="status-image" src={regular} alt="thinking helper" />
      {/* <img className="image" src={phoneImg} alt="phone illustration" width="196" /> */}
      {/* <div className="flex column"> */}
        {/* <h1 className="title">Phonebook</h1> */}
        <input className="input" />
      {/* </div> */}
    </div>
  );
}
