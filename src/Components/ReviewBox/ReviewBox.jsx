import React from "react";
import "./ReviewBox.css";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function ReviewBox({ para, img, name, stars }) {
  return (
    <div className="review-box">
      {para.map((elem, idx) => {
        return <p key={"para" + idx}>{elem}</p>;
      })}
      <div className="profile">
        <img src={img} alt="" />
        <div className="col-team">
          <h2>{name}</h2>
          <div className="stars">
            {Array(stars)
              .fill("")
              .map((elem, idx) => {
                return <FontAwesomeIcon key={"star" + idx} icon={faStar} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewBox;
