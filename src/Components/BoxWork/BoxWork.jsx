import React from "react";
import "./BoxWork.css";
function BoxWork({ img, title, desc }) {
  return (
    <div className="box-work">
      <img src={img} alt="" />
      <h1>{title}</h1>
      <p>{desc}</p>
    </div>
  );
}

export default BoxWork;
