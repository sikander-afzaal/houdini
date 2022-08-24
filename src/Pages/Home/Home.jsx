import {
  faSearch,
  faRotate,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import bnb from "../../Assets/bnb.png";
import eth from "../../Assets/eth.png";
import ADA from "../../Assets/ADA.png";
import BTC from "../../Assets/BTC.png";
import BUSD from "../../Assets/BUSD.png";
import POLYGON from "../../Assets/POLYGON.png";
import SOL from "../../Assets/SOL.png";
import USDT from "../../Assets/USDT.png";
import USDTBSC from "../../Assets/USDTBSC.png";
import USDTERC from "../../Assets/USDTERC.png";
import USDTTRC from "../../Assets/USDTTRC.png";
import XMR from "../../Assets/XMR.png";
import upDown from "../../Assets/up-down.png";
import "./Home.css";
function Home() {
  const [input1, setInput1] = useState({
    color: "#FBD20F",
    icon: bnb,
    name: "BNB",
    value: "",
  });
  const [input2, setInput2] = useState({
    color: "#fff",
    icon: eth,
    name: "ETH",
    value: "",
  });
  const [openDrop, setOpenDrop] = useState({ drop1: false, drop2: false });
  const dropItems = [
    {
      name: "ETH",
      icon: eth,
      color: "#fff",
      allowed: true,
    },
    {
      name: "BNB",
      icon: bnb,
      color: "#FBD20F",
      allowed: true,
    },
    {
      name: "BTC",
      icon: BTC,
      color: "rgb(246, 146, 26)",
      allowed: true,
    },
    {
      name: "USDT",
      icon: USDT,
      color: "rgb(38, 161, 123)",
      allowed: true,
    },
    {
      name: "ADA",
      icon: ADA,
    },
    {
      name: "BUSD",
      icon: BUSD,
    },
    {
      name: "POLYGON",
      icon: POLYGON,
    },
    {
      name: "SOL",
      icon: SOL,
    },
    {
      name: "USDTBSC",
      icon: USDTBSC,
    },
    {
      name: "USDTERC",
      icon: USDTERC,
    },
    {
      name: "USDTTRC",
      icon: USDTTRC,
    },
    {
      name: "XMR",
      icon: XMR,
    },
  ];
  return (
    <div className="homeWrapper">
      <div className="home">
        <div className="left-home">
          <h1>Swap Without a Trace</h1>
          <p>
            After performing a HoudiniSwap, there will be no traceable
            connection between the sending wallet and receiving wallet. Poof,
            your crypto is anonymous
          </p>
          <div className="input-div">
            <input type="text" placeholder="Search by Houdini ID" />
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>
        <div className="right-home">
          <div className="top-home">
            <div className="col">
              <h1>Swap</h1>
              <h2>Anonymous, Secure, KYC-Free.</h2>
            </div>
            <FontAwesomeIcon icon={faRotate} />
          </div>
          <div className="input-swap">
            {/* input 1 ---------------------------------- */}
            <div
              className={`wrapper-swap ${openDrop.drop1 && "border-radius"}`}
            >
              <div className="swap-col">
                <h3>Send:</h3>
                <input
                  style={{ color: input1.color }}
                  type="number"
                  placeholder="0.0"
                  value={input1.value}
                  onChange={(e) =>
                    setInput1((prev) => {
                      return { ...prev, value: e.target.value };
                    })
                  }
                />
              </div>

              <div className="right-col">
                <div
                  className="coin"
                  onClick={() =>
                    setOpenDrop((prev) => {
                      if (prev.drop1) {
                        return { drop1: false, drop2: false };
                      } else {
                        return { drop1: true, drop2: false };
                      }
                    })
                  }
                >
                  <img src={input1.icon} alt="" />
                  <h2>{input1.name}</h2>
                  <FontAwesomeIcon icon={faChevronDown} />
                </div>
                <p>1 BNB ≈ 0.0025 ETH</p>
              </div>
              <div
                className={`drop-down-swap ${openDrop.drop1 && "open-drop"}`}
              >
                {dropItems.map((elem, idx) => {
                  return (
                    <div
                      style={{
                        pointerEvents: elem.allowed ? "all" : "none",
                        cursor: elem.allowed ? "pointer" : "not-allowed",
                        opacity: elem.allowed ? "1" : "0.5",
                      }}
                      onClick={() => {
                        setOpenDrop({ drop1: false, drop2: false });
                        setInput1({
                          name: elem.name,
                          icon: elem.icon,
                          value: "",
                          color: elem.color,
                        });
                      }}
                      key={"drop" + idx}
                      className="swap-drop"
                    >
                      <img src={elem.icon} alt="" />
                      <h1>{elem.name}</h1>
                    </div>
                  );
                })}
              </div>
            </div>
            <img
              onClick={() => {
                const newInput1 = { ...input2 };
                const newInput2 = { ...input1 };
                setInput1(newInput1);
                setInput2(newInput2);
              }}
              src={upDown}
              alt=""
              className="abs-img"
            />
            {/* input 2 ---------------------------------- */}
            <div
              className={`wrapper-swap ${openDrop.drop2 && "border-radius"}`}
            >
              <div className="swap-col">
                <h3>Send:</h3>
                <input
                  style={{ color: input2.color }}
                  type="number"
                  placeholder="0.0"
                  value={input2.value}
                  onChange={(e) =>
                    setInput2((prev) => {
                      return { ...prev, value: e.target.value };
                    })
                  }
                />
              </div>

              <div className="right-col">
                <div
                  className="coin"
                  onClick={() =>
                    setOpenDrop((prev) => {
                      if (prev.drop2) {
                        return { drop1: false, drop2: false };
                      } else {
                        return { drop1: false, drop2: true };
                      }
                    })
                  }
                >
                  <img src={input2.icon} alt="" />
                  <h2>{input2.name}</h2>
                  <FontAwesomeIcon icon={faChevronDown} />
                </div>
                <p>1 ETH ≈ 0.070576 BNB</p>
              </div>
              <div
                className={`drop-down-swap ${openDrop.drop2 && "open-drop"}`}
              >
                {dropItems.map((elem, idx) => {
                  return (
                    <div
                      onClick={() => {
                        setOpenDrop({ drop1: false, drop2: false });
                        setInput2({
                          name: elem.name,
                          icon: elem.icon,
                          value: "",
                          color: elem.color,
                        });
                      }}
                      key={"drop" + idx}
                      className="swap-drop"
                    >
                      <img src={elem.icon} alt="" />
                      <h1>{elem.name}</h1>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="recieve">
            <h2>Receiving Wallet (ETH) Address:</h2>
            <h1>0x</h1>
          </div>
          <p className="note">
            *Only send from wallets. Transactions sent from a Smart Contract are
            not accepted.
          </p>
          <button className="swap-btn">Swap</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
