import React from "react";
import "./style.css";

import regular from "./peeps/regular.png";
import thinking from "./peeps/thinking.png";
import Spinner from "../spinner";

export function Input({ onChange, value, name, autoComplete }) {
  return (
    <input
      name={name}
      className="input"
      onChange={onChange}
      value={value}
      autoComplete={autoComplete}
    />
  );
}

export function BigInput({ onChange, value, loading, big = false }) {
  let image = regular;

  if (loading) {
    image = thinking;
  }

  return (
    <div className="big-input">
      <div className="input-container">
        <Spinner className="spinner" hidden={!loading} />
        <Input
          name="search"
          value={value}
          onChange={onChange}
          autoComplete="off"
        />
      </div>
      <img className="status-image" src={image} alt="thinking helper" />
    </div>
  );
}
