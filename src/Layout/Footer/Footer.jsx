import React from "react";
import styled from "styled-components";
import "./Footer.css";
import img from "../../Assets/footer.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faTelegramPlane } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <div className="footerWrapper">
      <div className="footer">
        <img src={img} alt="" />
        <div className="row">
          <Link to={"/"}>Swap</Link>
          <Link to={"/How-it-works"}>How it works</Link>
          <ComingSoon>Buy $POOF</ComingSoon>
          <ComingSoon>Stake $POOF</ComingSoon>
          <ComingSoon>About the coin</ComingSoon>
          <ComingSoon>Whitepaper</ComingSoon>
        </div>
        <div>
          <SocialIcons
            icon={faTwitter}
            onClick={() =>
              window.open("https://twitter.com/HoudiniSwap", "_blank")
            }
          />
          <SocialIcons
            icon={faTelegramPlane}
            onClick={() =>
              window.open("https://t.me/HoudiniSwapSupport_bot", "_blank")
            }
          />
        </div>
        {/* <a href="#">
          <img
            src={twitter}
            alt=""
            onClick={() =>
              window.open("https://twitter.com/HoudiniSwap", "_blank")
            }
          />
        </a> */}
        <p>© 2022 Houdini Swap, All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;

const ComingSoon = styled.span`
  cursor: pointer;
  color: grey;
`;
const SocialIcons = styled(FontAwesomeIcon)`
  color: white;
  width: 35px;
  height: 35px;
  margin: 0 12px;
  cursor: pointer;
  &:hover {
    scale: 1.05;
  }
`;
