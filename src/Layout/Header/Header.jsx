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
        <img src={logo} alt="" />
        <div className={`right-header ${header && "open-header"}`}>
          <FontAwesomeIcon
            onClick={() => setHeader(false)}
            className="close"
            icon={faXmark}
          />
          <Link to={"/"}>Swap</Link>
          <Link to={"/"}>How it works</Link>
          <div
            className={`drop-down`}
            onClick={() => {
              setOpenDrop((prev) => !prev);
            }}
          >
            <Link to={"/"}>
              $POOF <FontAwesomeIcon icon={faChevronDown} />
            </Link>
            <div className={`main-drop ${openDrop && "open-drop"}`}>
              <Link to={"/"}>Buy $POOF</Link>
              <Link to={"/"}>Stake $POOF</Link>
              <Link to={"/"}>About the Coin</Link>
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
