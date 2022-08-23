import React from "react";
import "./Footer.css";
import img from "../../Assets/footer.png";
import twitter from "../../Assets/twitter.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Footer() {
  return (
    <div className="footerWrapper">
      <div className="footer">
        <img src={img} alt="" />
        <div className="row">
          <Link to={"/"}>Swap</Link>
          <Link to={"/"}>How it works</Link>
          <Link to={"/"}>Buy $POOF</Link>
          <Link to={"/"}>Stake $POOF</Link>
          <Link to={"/"}>About the coin</Link>
          <Link to={"/"}>Whitepaper</Link>
        </div>
        <a href="#">
          <img src={twitter} alt="" />
        </a>
        <p>© 2022 Houdini Swap, All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
