import React, { useCallback } from "react";
import "./style.css";

import regular from "./peeps/regular.png";
import thinking from "./peeps/thinking.png";

export default function Input({ onChange, loading }) {
  const onInputChange = useCallback((e) => onChange(e.target.value), [
    onChange,
  ]);

  let image = regular;

  if (loading) {
    image = thinking;
  }

  return (
    <div className="big-input">
      <img className="status-image" src={image} alt="thinking helper" />
      {/* <img className="image" src={phoneImg} alt="phone illustration" width="196" /> */}
      {/* <div className="flex column"> */}
      {/* <h1 className="title">Phonebook</h1> */}
      <input className="input" onChange={onInputChange} />
      {/* </div> */}
    </div>
  );
}
