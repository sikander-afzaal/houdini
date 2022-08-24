import React, { useState } from "react";
import "./Header.css";
import logo from "../../Assets/logo.png";
import open from "../../Assets/open.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faXmark } from "@fortawesome/free-solid-svg-icons";
function Header() {
  const [openDrop, setOpenDrop] = useState(false);
  const [header, setHeader] = useState(false);
  return (
    <div className="headerWrapper">
      <div className="header">
        <Link to={"/"} style={{ cursor: "pointer" }}>
          <img src={logo} alt="" />
        </Link>
        <div className={`right-header ${header && "open-header"}`}>
          <FontAwesomeIcon
            onClick={() => setHeader(false)}
            className="close"
            icon={faXmark}
          />
          <Link
            onClick={() => {
              setHeader(false);
            }}
            to={"/"}
          >
            Swap
          </Link>
          <Link
            onClick={() => {
              setHeader(false);
            }}
            to={"/works"}
          >
            How it works
          </Link>
          <div
            className={`drop-down`}
            onClick={() => {
              setOpenDrop((prev) => !prev);
            }}
          >
            <p>
              $POOF <FontAwesomeIcon icon={faChevronDown} />
            </p>
            <div className={`main-drop ${openDrop && "open-drop"}`}>
              <Link
                onClick={() => {
                  setHeader(false);
                }}
                to={"/"}
              >
                Buy $POOF
              </Link>
              <Link
                onClick={() => {
                  setHeader(false);
                }}
                to={"/stake"}
              >
                Stake $POOF
              </Link>
              <Link
                onClick={() => {
                  setHeader(false);
                }}
                to={"/"}
              >
                About the Coin
              </Link>
            </div>
          </div>
        </div>
        <img
          onClick={() => setHeader(true)}
          className="open"
          src={open}
          alt="header-opener"
        />
      </div>
    </div>
  );
}

export default Header;
