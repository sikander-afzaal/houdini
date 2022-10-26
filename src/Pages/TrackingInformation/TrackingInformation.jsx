import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
// import QRCode from "qrcode";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
// import Joyride from "react-joyride";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faTelegramPlane } from "@fortawesome/free-brands-svg-icons";
import { copyText } from "../../utils/helper";
import PageLoader from "./PageLoader";

import copy from "../../Assets/copy.png";
import illustration from "../../Assets/tracking-illustration.png";
// token, coin icons
import bnb from "../../Assets/bnb.png";
import eth from "../../Assets/eth.png";
import ADA from "../../Assets/ADA.png";
import BTC from "../../Assets/BTC.png";
import BUSD from "../../Assets/BUSD.png";
import MATIC from "../../Assets/POLYGON.png";
import SOL from "../../Assets/SOL.png";
import USDTBSC from "../../Assets/USDTBSC.png";
import USDTERC from "../../Assets/USDTERC.png";
import USDTTRC from "../../Assets/USDTTRC.png";
import XMR from "../../Assets/XMR.png";
import DAI from "../../Assets/DAI.png";
import XRP from "../../Assets/XRP.png";
import NoToken from "../../Assets/notoken.png";

import orderRecieved from "../../Assets/card.svg";
import anonymizing from "../../Assets/timer.svg";
import swapping from "../../Assets/cloud.svg";
import done from "../../Assets/check.svg";

import "./TrackingInformation.css";

export default function TrackingInformation() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [orderIdFull, setOrderIdFull] = useState("");
  const [address, setAddress] = useState("");
  const [receiveAddress, setReceiveAddress] = useState("");
  const [sendValue, setSendValue] = useState(0);
  const [receiveValue, setReceiveValue] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [createdAt, setCreatedAt] = useState("");
  const [tokenAname, setTokenAname] = useState("");
  const [tokenBname, setTokenBname] = useState("");
  // const [orderExpired, setOrderExpired] = useState(false)
  const [orderStarted, setOrderStarted] = useState(false);
  // const [src, setSrc] = useState("");
  const [status, setStatus] = useState(0);
  const [orderStatusTitle, setOrderStatusTitle] = useState("");
  const [countDownEnded, setCountDownEnded] = useState(false);

  // useEffect(() => {
  //   window.addEventListener("keydown", function (e) {
  //     if (e.keyCode == 32 && e.target == document.body) {
  //       e.preventDefault();
  //     }
  //   });
  //   require("./game");
  // }, []);

  let myCountdownInterval = useRef();
  var exchangeStatusInterval = useRef();

  const getExchangeStatus = async (orderID) => {
    try {
      // console.log("getExchangeStatus-------", countDownEnded);
      var formdata = new FormData();
      formdata.append("orderID", orderID);

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
        mode: "cors",
      };

      await fetch(
        `${process.env.REACT_APP_TOKEN_PRICE_API}/api/exchange_status`,
        requestOptions
      )
        .then((responseJSON) => responseJSON.json())
        .then((res) => {
          if (res.message === "success") {
            console.log("exchange_status res=>", res.orderInfo);
            /*
             * res.orderInfo.status === 0 : waiting
             * res.orderInfo.status === 1 : received
             * res.orderInfo.status === 2 : anonymizing
             * res.orderInfo.status === 3 : sendingToWallet
             * res.orderInfo.status === 4 : Done
             * res.orderInfo.status === 5 : Expired
             * res.orderInfo.status === 6 : Failed
             */
            if (res.orderInfo.first_tx_receivedTime != 0) {
              // Calc 4min for anonymizing requests
              const orderReceivedTimeInSeconds =
                res.orderInfo.first_tx_receivedTime;
              const expiredTimeInDate = new Date(
                (parseInt(orderReceivedTimeInSeconds) + 4 * 60) * 1000
              );
              const deadline = expiredTimeInDate.toString().substring(0, 24);
              const countdownDate = new Date(deadline).getTime();
              const now = new Date().getTime();
              const distance = countdownDate - now;

              if (distance < 0) {
                setStatus(res.orderInfo.status < 2 ? 2 : res.orderInfo.status);
              } else setStatus(1);
              clearInterval(myCountdownInterval);
              setOrderStarted(true);
              if (res.orderInfo.status < 4) setOrderStatusTitle("Received");
            }

            if (res.orderInfo.status >= 4) {
              clearInterval(exchangeStatusInterval);
              if (res.orderInfo.status === 4)
                setOrderStatusTitle("Order Completed");
              if (res.orderInfo.status === 5) setOrderStatusTitle("Expired");
              if (res.orderInfo.status === 6) setOrderStatusTitle("Failed");
            }
          }
        })
        .catch((err) => {
          console.log("exchange_status=>", err);
        });
    } catch (error) {
      console.log("getExchangeStatus=>>", error);
    }
  };

  const startCountdownTimer = (deadline, sts) => {
    setIsLoading(false);
    // console.log('startTimer-------', deadline);
    const countdownDate = new Date(deadline).getTime();

    myCountdownInterval = setInterval(() => {
      // console.log("countDownEnded--------------------", countDownEnded);
      const now = new Date().getTime();
      const distance = countdownDate - now;
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (distance < 0) {
        // stop countdown timer
        setCountDownEnded(true);
        clearInterval(myCountdownInterval);
        if (sts === 0) {
          clearInterval(exchangeStatusInterval);
          setOrderStatusTitle("Not received yet");
        }
        // if (!orderExpired) {
        //   setOrderExpired(true)
        // }
      } else {
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    const start = async () => {
      try {
        var formdata = new FormData();
        const orderIdTemp = location.pathname.split("/")[2];
        formdata.append("orderID", orderIdTemp);

        var requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
          mode: "cors",
        };
        setIsLoading(true);
        await fetch(
          `${process.env.REACT_APP_TOKEN_PRICE_API}/api/exchange_status`,
          requestOptions
        )
          .then((responseJSON) => responseJSON.json())
          .then((res) => {
            if (res.message === "success") {
              setIsLoading(false);
              // console.log("token_exchange res11111=>", res);
              const stringToBeCut = orderIdTemp.slice(
                3,
                orderIdTemp.length - 3
              );
              // start count down timer
              const creationTime = res.orderInfo.creation_time;
              const expiredTimeInDate = new Date(
                (parseInt(creationTime) + 30 * 60) * 1000
              );
              const tmp = expiredTimeInDate.toString().substring(0, 24);
              setStatus(res.orderInfo.status);
              if (res.orderInfo.status < 4) {
                startCountdownTimer(tmp, res.orderInfo.status);
              }
              setSendValue(res.orderInfo.tokenA_amount);
              setReceiveValue(res.orderInfo.tokenB_amount);
              setAddress(res.orderInfo.paying_address);
              setReceiveAddress(res.orderInfo.tokenB_address);
              setTokenAname(res.orderInfo.tokenA_symbol);
              setTokenBname(res.orderInfo.tokenB_symbol);
              setOrderId(orderIdTemp.replace(stringToBeCut, "..."));
              setOrderIdFull(orderIdTemp);
              setCreatedAt(
                new Date(parseInt(creationTime) * 1000).toLocaleString()
              );
              if (res.orderInfo.status >= 4) {
                // setStatus(res.orderInfo.status)
                clearInterval(exchangeStatusInterval);
                if (res.orderInfo.status === 4)
                  setOrderStatusTitle("Order Completed");
                if (res.orderInfo.status === 5) setOrderStatusTitle("Expired");
                if (res.orderInfo.status === 6) setOrderStatusTitle("Failed");
              }
              // QRCode.toDataURL(res.orderInfo.paying_address, (err, url) => {
              //   if (err) throw err;
              //   setSrc(url);
              // });

              exchangeStatusInterval = setInterval(() => {
                getExchangeStatus(orderIdTemp);
              }, 5000);
            }
          })
          .catch((err) => {
            setIsLoading(false);
            console.log("fetch_error=>", err);
          });
      } catch (error) {
        console.log("catch_error=>", error);
      }
    };
    start();

    return () => {
      clearInterval(exchangeStatusInterval);
      clearInterval(myCountdownInterval.current);
    };
  }, []);

  function displayAddress(addr) {
    const stringToBeCut = addr.slice(11, addr.length - 4);
    return addr.replace(stringToBeCut, "...");
  }

  function callCopyFunc(e, idx) {
    copyText(e);
    let msg = "";
    if (idx === 1) msg = "Sender address copied.";
    if (idx === 2) msg = "Receiver address copied.";
    if (idx === 3) msg = "Order id copied.";
    NotificationManager.success(msg, "Success.", 2000);
  }

  function copyButton() {
    return <img className="track__copybutton" src={copy} alt="Copy" />;
  }

  function getSrc(coin) {
    // console.log("coin===", coin);
    /* 
    - BTC: btc
    - BNB(BEP-20): bsc(ff) ->bnbbsc(cn, ch), bnb-bsc, BSC
    - ETH: eth, ETH
    - USDT(ERC-20): usdt ->usdterc20, USDT
    - XMR: xmr
    - BUSD: busd
    - USDT(BEP-20): usdtbsc
    - USDT(TRC-20): usdttrc ->usdttrc20
    - SOL
    - ADA
    - Polygon(POLYGONG): matic
    */
    if (coin === "btc" || coin === "BTC") return BTC;
    else if (
      coin === "bnbbsc" ||
      coin === "bsc" ||
      coin === "BSC" ||
      coin === "bnb-bsc"
    )
      return bnb;
    else if (coin === "eth" || coin === "ETH") return eth;
    else if (coin === "usdt" || coin === "USDT" || coin === "usdterc20")
      return USDTERC;
    else if (coin === "xmr" || coin === "XMR") return XMR;
    else if (coin === "sol" || coin === "SOL") return SOL;
    else if (coin === "ada" || coin === "ADA") return ADA;
    else if (coin === "dai" || coin === "DAI") return DAI;
    else if (coin === "daibsc" || coin === "DAIBSC") return DAI;
    else if (coin === "xrp" || coin === "XRP") return XRP;
    else if (coin === "busdbsc" || coin === "BUSDBSC") return BUSD;
    else if (coin === "usdtbsc" || coin === "USDTBSC") return USDTBSC;
    else if (coin === "usdttrc" || coin === "USDTTRC") return USDTTRC;
    else if (coin === "matic" || coin === "MATIC") return MATIC;
    else return NoToken;
  }

  function getFullTokenName(coin) {
    if (coin === "btc" || coin === "BTC") return "BTC";
    else if (
      coin === "bnbbsc" ||
      coin === "bsc" ||
      coin === "BSC" ||
      coin === "bnb-bsc"
    )
      return "BNB";
    else if (coin === "eth" || coin === "ETH") return "ETH";
    else if (coin === "usdt" || coin === "USDT" || coin === "usdterc20")
      return "USDT";
    else if (coin === "xmr" || coin === "XMR") return "XMR";
    else if (coin === "sol" || coin === "SOL") return "SOL";
    else if (coin === "ada" || coin === "ADA") return "ADA";
    else if (coin === "dai" || coin === "DAI") return "DAI(ERC-20)";
    else if (coin === "daibsc" || coin === "DAIBSC") return "DAI(BEP-20)";
    else if (coin === "xrp" || coin === "XRP") return "XRP";
    else if (coin === "busdbsc" || coin === "BUSDBSC") return "BUSD";
    else if (coin === "usdtbsc" || coin === "USDTBSC") return "USDT(BEP-20)";
    else if (coin === "usdttrc" || coin === "USDTTRC") return "USDT(TRC-20)";
    else if (coin === "matic" || coin === "MATIC") return "MATIC";
  }

  return (
    <div className="track__wrapper">
      {/* <Joyride
        steps={steps}
        continuous
        showProgress
        showSkipButton
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      /> */}
      <NotificationContainer />
      {isLoading && <PageLoader />}
      <div className="track">
        <div className="track__section1">
          {/* <h1 className="track__subheading">Order Page</h1> */}
          <h1 className="track__heading">Order Page</h1>

          <div className="track__para my-first-step">
            In order to initiate your swap, please send&nbsp;
            <span className="send-amount">
              {sendValue} {getFullTokenName(tokenAname)}
            </span>
            &nbsp;to the wallet address listed below{" "}
            <b>in one single transaction</b>.
          </div>
          <p
            className="receive-address"
            onClick={() => callCopyFunc(address, 1)}
          >
            {/* {address.length < 43 ? address : displayAddress(address)} */}
            {copyButton()}
            {address.split("").map((letter, i) => (
              <span key={i}>{letter}</span>
            ))}
          </p>
          {/* <p
            className="receive-address-mobile"
            onClick={() => callCopyFunc(address, 1)}
          >
            {displayAddress(address)}
          </p> */}
          <p className="track__para">
            Once Order Received below lights up, your transaction is in motion.
            On average, it takes 20 minutes to arrive in your Receiving Address.
          </p>
        </div>

        <div className="track__section2">
          <div className="track__step">
            <div
              style={{
                background:
                  status === 0 || status === 5 || status === 6
                    ? "grey"
                    : "#4BAE28",
                border: `1px solid ${
                  status === 0 || status === 5 || status === 6
                    ? "grey"
                    : "#4BAE28"
                }`,
              }}
              className="track__step_background"
            >
              <div
                className={`track__step_wrapper ${status === 0 && "animating"}`}
              >
                <img src={orderRecieved} alt="Order Recieved" />
              </div>
            </div>
            <span>Order Recieved</span>
          </div>

          <div className="track__divider track__lineDivider"></div>

          <div className="track__step">
            <div
              style={{
                background:
                  status === 0 || status === 5 || status === 6
                    ? "transparent"
                    : status === 1
                    ? "grey"
                    : "#4BAE28",
                border: `1px solid ${
                  status === 2 || status === 3 || status === 4
                    ? "#4BAE28"
                    : "grey"
                }`,
              }}
              className="track__step_background"
            >
              <div
                className={`track__step_wrapper ${status === 1 && "animating"}`}
              >
                <img src={anonymizing} alt="Anonymizing" />
              </div>
            </div>
            <span>Anonymizing</span>
          </div>

          <div
            className={`track__divider ${
              status > 1 && status !== 5 && status !== 6 && "track__lineDivider"
            }`}
          ></div>

          <div className="track__step">
            <div
              style={{
                background:
                  status === 0 || status === 1 || status === 5 || status === 6
                    ? "transparent"
                    : status === 2
                    ? "grey"
                    : "#4BAE28",
                border: `1px solid ${
                  status === 3 || status === 4 ? "#4BAE28" : "grey"
                }`,
              }}
              className="track__step_background"
            >
              <div
                className={`track__step_wrapper ${status === 2 && "animating"}`}
              >
                <img src={swapping} alt="Swapping" />
              </div>
            </div>
            <span>Swapping</span>
          </div>

          <div
            className={`track__divider ${
              status > 2 && status !== 5 && status !== 6 && "track__lineDivider"
            }`}
          ></div>

          <div className="track__step">
            <div
              style={{
                background:
                  status === 3
                    ? "grey"
                    : status === 4
                    ? "#4BAE28"
                    : "transparent",
                border: `1px solid ${status !== 4 ? "grey" : "#4BAE28"}`,
              }}
              className="track__step_background"
            >
              <div
                className={`track__step_wrapper ${status === 3 && "animating"}`}
              >
                <img src={done} alt="Done" />
              </div>
            </div>
            <span>Done</span>
          </div>
        </div>

        <div className="track__section3">
          <div className="track__card">
            <h1 className="track__cardHeading">Transaction</h1>

            <div className="track__cardItem">
              <div className="track__cardItemTop">
                <span>Send:</span>

                <span>
                  <img src={getSrc(tokenAname)} alt="send-icon" />
                  {getFullTokenName(tokenAname)}
                </span>
              </div>

              <div className="track__cardItemBottom">
                <h1>{sendValue}</h1>

                <span
                  id="highlighted-send-address"
                  className="my-second-step"
                  onClick={() => callCopyFunc(address, 1)}
                >
                  {copyButton()} {displayAddress(address)}
                </span>
              </div>
            </div>

            <div className="track__cardItem">
              <div className="track__cardItemTop">
                <span>Receive:</span>

                <span>
                  <img src={getSrc(tokenBname)} alt="receive-icon" />
                  {getFullTokenName(tokenBname)}
                </span>
              </div>

              <div className="track__cardItemBottom">
                <h1>{receiveValue}</h1>

                <span onClick={() => callCopyFunc(receiveAddress, 2)}>
                  {copyButton()} {displayAddress(receiveAddress)}
                </span>
              </div>
            </div>
          </div>

          <div className="track__card">
            <h1 className="track__cardHeading">Tracking Info</h1>

            <div className="track__cardItem2">
              <div className="track__cardItem2Left">
                <span> Houdini ID:</span>

                <h1 onClick={() => callCopyFunc(orderIdFull, 3)}>
                  {orderId} {copyButton()}
                </h1>
              </div>

              <div className="track__cardItem2Right">
                <span>Creation time</span>

                <span>{createdAt}</span>
              </div>
            </div>

            <div className="track__cardItem2">
              <div className="track__cardItem2Left">
                <span>Send by:</span>

                {orderStarted ? (
                  <h1 style={{ color: "green" }}>{orderStatusTitle}</h1>
                ) : countDownEnded ? (
                  <h1 style={{ color: "red" }}>{orderStatusTitle}</h1>
                ) : (
                  <h1>
                    {timerMinutes.toString().padStart(2, 0)} :{" "}
                    {timerSeconds.toString().padStart(2, 0)}
                  </h1>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="track__section4">
          After performing a HoudiniSwap, there will be no traceable connection
          between the sending wallet and receiving wallet. Poof, your crypto is
          anonymous.
        </div>

        <div className="track__section5">
          <img
            src={illustration}
            alt="Illustration"
            className="track__section5Bg"
          />

          <div className="track__section5Content">
            <h1 className="track__section5Heading">
              Having trouble with your order?
            </h1>

            <p className="track__section5Para">
              Contact technical support here
            </p>

            <div>
              <SocialIcons
                icon={faTelegramPlane}
                onClick={() =>
                  window.open("https://t.me/HoudiniSwapSupport_bot", "_blank")
                }
              />
            </div>
          </div>
        </div>
        {/* <div className="game-container">
          <canvas
            id="game"
            className="game-canvas"
            width="800px"
            height="600px"
          ></canvas>
        </div> */}
      </div>
    </div>
  );
}

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
