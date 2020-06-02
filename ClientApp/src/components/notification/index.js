import React, { useEffect, useState } from "react";
import "./style.css";

export default function Notification({ children }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(!!children);
  }, [children]);

//   useEffect(() => {
//     if (!active) {
//       setTimeout(() => setActive(false), duration);
//     }
//   }, [active, setActive, duration]);

//   if (!children) {
//     return null;
//   }

  return (
    <div className={`notification ${active ? "enter" : "leave"}`}>{children}</div>
  );
}
