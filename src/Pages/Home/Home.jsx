import {
  faSearch,
  faRotate,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { PublicKey } from "@solana/web3.js";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import bnb from "../../Assets/bnb.png";
import eth from "../../Assets/eth.png";
import ADA from "../../Assets/ADA.png";
import BTC from "../../Assets/BTC.png";
import BUSD from "../../Assets/BUSD.png";
import POLYGON from "../../Assets/POLYGON.png";
import SOL from "../../Assets/SOL.png";
// import USDT from "../../Assets/USDT.png";
import USDTBSC from "../../Assets/USDTBSC.png";
import USDTERC from "../../Assets/USDTERC.png";
import USDTTRC from "../../Assets/USDTTRC.png";
import XMR from "../../Assets/XMR.png";
import AVAX from "../../Assets/AVAX.png";
import CRO from "../../Assets/CRO.png";
import DAI from "../../Assets/DAI.png";
import XRP from "../../Assets/XRP.png";
import upDown from "../../Assets/up-down.png";
import "./Home.css";
import warningIcon from "../../Assets/warning.png";
import { useRef } from "react";

function Home() {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
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
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const [currency, setCurrency] = useState(0);
  const [currency2, setCurrency2] = useState(0);
  const [openDrop, setOpenDrop] = useState({ drop1: false, drop2: false });
  // const [exchangeFlow, setExchangeFlow] = useState("");
  const [swapClicked, setSwapClicked] = useState(false);
  const [receiveAddress, setReceiveAddress] = useState("");
  const [exchangeFlowList, setExchangeFlowList] = useState([]);

  const form = useRef();

  const dropItems = [
    { icon: BTC, name: "BTC", color: "#f6921a" },
    { icon: eth, name: "ETH", color: "#f2f2f2" },
    { icon: bnb, name: "BNB", color: "#f0b90b" },
    { icon: USDTERC, name: "USDT", color: "#26a17b" },
    { icon: BUSD, name: "BUSDBSC", color: "#f0b90b" },
    { icon: DAI, name: "DAI", color: "#f5ac37" },
    { icon: SOL, name: "SOL", color: "#2ed6bc" },
    { icon: POLYGON, name: "MATIC", color: "#8F5BE7" },
    { icon: ADA, name: "ADA", color: "#3468d1" },
    { icon: XRP, name: "XRP", color: "#FFFFFF" },
    { icon: XMR, name: "XMR", color: "#f26822" },
    { icon: USDTTRC, name: "USDTTRC", color: "#eb322a" },
    { icon: USDTBSC, name: "USDTBSC", color: "#ffc331" },
    { icon: DAI, name: "DAIBSC", color: "#f5ac37" },
    // { icon: USDTERCimg, name: "USDTERC", color: "#" },
    { icon: AVAX, name: "AVAX", color: "#e84142" },
    { icon: CRO, name: "CRO", color: "#212653" },
  ];

  const selectCoin = (el, idx, field) => {
    if (idx <= 13) {
      setOpenDrop({ drop1: false, drop2: false });
      if (field === "send") {
        setInput1({
          name: el.name,
          icon: el.icon,
          value: "",
          color: el.color,
        });
      } else {
        setInput2({
          name: el.name,
          icon: el.icon,
          value: "",
          color: el.color,
        });
      }
    } else return;
  };

  const getElemName = (elemName) => {
    switch (elemName) {
      case "BNB":
        return "BNB (BEP-20)";
      case "BUSDBSC":
        return "BUSD (BEP-20)";
      case "USDTBSC":
        return "USDT (BEP-20)";
      case "USDT":
        return "USDT (ERC-20)";
      case "USDTTRC":
        return "USDT (TRC-20)";
      case "DAI":
        return "DAI (ERC-20)";
      case "DAIBSC":
        return "DAI (BEP-20)";
      case "MATIC":
        return "Polygon (POLYGON)";
      default:
        return elemName;
    }
  };

  const handleChange = (e) => {
    let inputStr = e.target.value;
    if (e.target.value.includes("-")) return;
    if (inputStr.charAt(0) === ".") inputStr = "0" + inputStr;
    const rx_live = /^[+-]?\d*(?:[.,]\d*)?$/;
    if (rx_live.test(inputStr)) {
      setInput1((prev) => {
        return { ...prev, value: inputStr };
      });
    }
  };

  const handleArrows = () => {
    if (isLoading) return;
    const newInput1 = { ...input2 };
    const newInput2 = { ...input1 };
    setInput1(newInput1);
    setInput2(newInput2);
  };
  const validateWalletAddress = (addr, coin) => {
    try {
      let coinType = "";
      if (
        coin === "ETH" ||
        coin === "BNB" ||
        coin === "USDT" ||
        coin === "DAI" ||
        coin === "DAIBSC" ||
        coin === "USDTBSC" ||
        coin === "BUSDBSC"
      )
        coinType = "eth";
      else if (coin === "USDTTRC") coinType = "trx";
      else if (coin === "SOL") {
        /* 
        // This is not working for SOL sometimes...
        // let pubkey = new PublicKey(addr);
        // let isSolana = PublicKey.isOnCurve(pubkey.toBuffer());
        // console.log("isSolana=", isSolana);
        */
        return addr.length === 44;
      } else coinType = coin; // XMR, XRP, BTC, ADA, MATIC
      // console.log("coinType", coinType);
      var valid = window.WAValidator.validate(addr, coinType);
      return valid;
    } catch (error) {
      console.log("validateWalletAddress catch error: ", error);
      return false;
    }
  };

  const sendEmailFunc = (msg) => {
    var templateParams = {
      name: "Lou",
      to_name: "Lou!",
      message: msg,
      from_name: "Houdiniswap.com",
      notes: "Houdiniswap error!",
    };
    emailjs
      .send(
        process.env.REACT_APP_SERVICEID,
        process.env.REACT_APP_TEMPLATEID,
        templateParams,
        process.env.REACT_APP_PUBLICKEY
      )
      .then(
        (result) => {
          console.log("send email result =>", result);
        },
        (error) => {
          console.log("send email error =>", error.text);
        }
      );
  };

  const handleExchange = async () => {
    let msg = "";
    if (isLoading) return;
    if (input1.value) {
      let inputElem = document.getElementById("receiver-address");
      if (receiveAddress === "") {
        msg = "Please input receiver address.";
        NotificationManager.warning(msg, "Something went wrong.", 6000);
        inputElem.focus();
      } else {
        let validRes = validateWalletAddress(receiveAddress, input2.name);
        // console.log("validRes", validRes);
        if (validRes) {
          setIsLoading(true);
          setSwapClicked(true);
          var formdata = new FormData();
          formdata.append("TokenA_amount", input1.value);
          formdata.append("TokenA_symbol", input1.name);
          formdata.append("TokenB_symbol", input2.name);
          formdata.append("TokenB_address", receiveAddress);
          formdata.append("exchangeFlow_list", exchangeFlowList);

          var requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow",
            mode: "cors",
          };

          try {
            await fetch(
              `${process.env.REACT_APP_TOKEN_PRICE_API}/api/token_exchange`,
              requestOptions
            )
              .then((responseJSON) => responseJSON.json())
              .then((res) => {
                setIsLoading(false);
                console.log("token_exchange res======>", res);
                if (res.message !== undefined) {
                  if (res.message === "success") {
                    navigate(`/order/${res.orderInfo}`);
                  } else if (res.message === "error") {
                    if (res.data === "Invalid address (301)") {
                      msg = "Invalid address";
                    } else
                      msg =
                        "The Monero blockchain is experiencing unreasonably long wait times so we have paused swapping. Please check back again soon.";
                    NotificationManager.error(
                      msg,
                      "Something went wrong.",
                      6000
                    );
                  } else {
                    msg = "Please contact support team.";
                    NotificationManager.error(
                      msg,
                      "Something went wrong.",
                      6000
                    );
                    sendEmailFunc(
                      "One of 3 API is not working. Unknown error."
                    );
                  }
                } else {
                  msg = "Please contact support team.";
                  NotificationManager.error(msg, "Something went wrong.", 6000);
                  sendEmailFunc("One of 3 API is not working. Unknown error.");
                }
              })
              .catch((err) => {
                setIsLoading(false);
                msg = "Please contact support team.";
                NotificationManager.error(msg, "Something went wrong.", 6000);
                // console.log("fetch_error=>", err);
                sendEmailFunc(`fetch error: ${err}`);
              });
          } catch (error) {
            msg = "Please contact support team.";
            NotificationManager.error(msg, "Something went wrong.", 6000);
            // console.log("catch error=>", error);
            sendEmailFunc(`catch error: ${error}`);
          }
        } else {
          msg = "Please input correct receiver address.";
          NotificationManager.warning(msg, "Invalid address", 6000);
          inputElem.focus();
        }
      }
    }
  };

  const callPriceAPI = async (tokenAname) => {
    if (input1.value > 0) {
      setIsLoading(true);
      var formdata = new FormData();
      formdata.append("TokenA_amount", input1.value);
      formdata.append("TokenA_symbol", tokenAname);
      formdata.append("TokenB_symbol", input2.name);

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
        mode: "cors",
      };

      await fetch(
        `${process.env.REACT_APP_TOKEN_PRICE_API}/api/token_price`,
        requestOptions
      )
        .then((responseJSON) => responseJSON.json())
        .then((res) => {
          // console.log("res======>", res);
          let optimizedData = res.exchangeFlow_list[0];
          // (TokenB_amount, TokenA_min_amount, TokenA_max_amount, "exchangeFlow")
          setIsLoading(false);
          setExchangeFlowList(res.exchangeFlow_list);
          setInput2((prev) => {
            return {
              ...prev,
              value: optimizedData[0] !== -1 ? optimizedData[0] : "---",
            };
          });
          setMinAmount(optimizedData[1]);
          setMaxAmount(optimizedData[2]);
          setCurrency(
            optimizedData[0] !== -1
              ? (optimizedData[0] / input1.value).toFixed(6)
              : 0
          );
          setCurrency2(
            optimizedData[0] !== -1
              ? (input1.value / optimizedData[0]).toFixed(6)
              : 0
          );
          // setExchangeFlow(optimizedData[3]);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log("fetch_error=>", err);
          let msg = "Fetching price failed";
          NotificationManager.warning(msg, "Something went wrong.", 4000);
        });
    }
  };

  // const APIcall = () => {
  //   if (input1.value == 0 || receiveAddress == "") {
  //     let msg = "Please input receiver address and amount.";
  //     NotificationManager.warning(msg, "Something went wrong.", 4000);
  //   } else callPriceAPI(input1.name);
  // };

  const searchOrderId = () => {
    const node = document.getElementById("houdini-search");
    if (node.value.length !== 22)
      NotificationManager.warning("Contact support", "Invalid ID", 4000);
    else navigate(`/order/${node.value}`);
  };
  const searchOrderId2 = () => {
    const node2 = document.getElementById("houdini-search-v2");
    if (node2.value.length !== 22)
      NotificationManager.warning("Contact support", "Invalid ID", 4000);
    else navigate(`/order/${node2.value}`);
  };

  useEffect(() => {
    const node = document.getElementById("houdini-search");
    const node2 = document.getElementById("houdini-search-v2");
    node.addEventListener("keyup", function (event) {
      if (event.key === "Enter") searchOrderId();
    });
    node2.addEventListener("keyup", function (event) {
      if (event.key === "Enter") searchOrderId2();
    });
    const timeOutId = setTimeout(() => {
      callPriceAPI(input1.name);
    }, 1000);
    return () => clearTimeout(timeOutId);
  }, [input1.value, input1.name, input2.name]);

  function useOuterClick(callback) {
    const callbackRef = useRef(); // initialize mutable ref, which stores callback
    const innerRef = useRef(null); // returned to client, who marks "border" element
    // update cb on each render, so second useEffect has access to current value
    useEffect(() => {
      callbackRef.current = callback;
    });
    useEffect(() => {
      document.addEventListener("click", _onClick);
      return () => document.removeEventListener("click", _onClick);
      function _onClick(e) {
        const clickedOutside = !innerRef.current?.contains(e.target);
        if (clickedOutside) callbackRef.current?.(e);
      }
    }, []); // no dependencies -> stable click listener
    return innerRef; // convenience for client (doesn't need to init ref himself)
  }

  const dropdown1Ref = useOuterClick(() => {
    setOpenDrop((prev) => {
      if (prev.drop1) return { drop1: false, drop2: prev.drop2 };
      return prev;
    });
  });

  const dropdown2Ref = useOuterClick(() => {
    setOpenDrop((prev) => {
      if (prev.drop2) return { drop1: prev.drop1, drop2: false };
      return prev;
    });
  });

  useEffect(() => {
    const canvas = document.getElementsByTagName("canvas")[0];
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    canvas.style.zIndex = 0;

    let config = {
      SIM_RESOLUTION: 128,
      DYE_RESOLUTION: 512,
      DENSITY_DISSIPATION: 0.9,
      VELOCITY_DISSIPATION: 0.98,
      PRESSURE_DISSIPATION: 0.8,
      PRESSURE_ITERATIONS: 20,
      CURL: 30,
      SPLAT_RADIUS: 0.1,
      SHADING: false,
      COLORFUL: false,
      PAUSED: false,
      BACK_COLOR: {
        r: 0,
        g: 0,
        b: 0,
      },
      TRANSPARENT: false,
      BLOOM: true,
      BLOOM_ITERATIONS: 8,
      BLOOM_RESOLUTION: 256,
      BLOOM_INTENSITY: 0.8,
      BLOOM_THRESHOLD: 0.6,
      BLOOM_SOFT_KNEE: 0.7,
    };

    function color_hover(e) {
      pointers[0].down = true;
      pointers[0].color = generateColor();
      pointers[0].moved = pointers[0].down;
      pointers[0].dx = (e.clientX - pointers[0].x) * 5.0;
      pointers[0].dy = (e.clientY - pointers[0].y) * 5.0;
      pointers[0].x = e.clientX;
      pointers[0].y = e.clientY;
    }

    function color_hover_with_XY(e, X, Y, speed) {
      speed = speed || 50;
      var i = 0;
      while (i != speed) {
        pointers[0].down = true;
        pointers[0].color = generateColor();
        pointers[0].moved = pointers[0].down;
        pointers[0].dx = (e.clientX + X - pointers[0].x) * 5.0;
        pointers[0].dy = (e.clientY + Y - pointers[0].y) * 5.0;
        pointers[0].x = e.clientX + X;
        pointers[0].y = e.clientY + Y;
        i++;
      }
    }

    function pointerPrototype() {
      this.id = -1;
      this.x = 0;
      this.y = 0;
      this.dx = 0;
      this.dy = 0;
      this.down = false;
      this.moved = false;
      this.color = [30, 0, 300];
    }

    let pointers = [];
    let splatStack = [];
    let bloomFramebuffers = [];
    pointers.push(new pointerPrototype());

    const { gl, ext } = getWebGLContext(canvas);

    if (isMobile()) config.SHADING = false;
    if (!ext.supportLinearFiltering) {
      config.SHADING = false;
      config.BLOOM = false;
    }

    //startGUI();

    function getWebGLContext(canvas) {
      const params = {
        alpha: true,
        depth: false,
        stencil: false,
        antialias: false,
        preserveDrawingBuffer: false,
      };

      let gl = canvas.getContext("webgl2", params);
      const isWebGL2 = !!gl;
      if (!isWebGL2)
        gl =
          canvas.getContext("webgl", params) ||
          canvas.getContext("experimental-webgl", params);

      let halfFloat;
      let supportLinearFiltering;
      if (isWebGL2) {
        gl.getExtension("EXT_color_buffer_float");
        supportLinearFiltering = gl.getExtension("OES_texture_float_linear");
      } else {
        halfFloat = gl.getExtension("OES_texture_half_float");
        supportLinearFiltering = gl.getExtension(
          "OES_texture_half_float_linear"
        );
      }

      gl.clearColor(0.0, 0.0, 0.0, 1.0);

      const halfFloatTexType = isWebGL2
        ? gl.HALF_FLOAT
        : halfFloat.HALF_FLOAT_OES;
      let formatRGBA;
      let formatRG;
      let formatR;

      if (isWebGL2) {
        formatRGBA = getSupportedFormat(
          gl,
          gl.RGBA16F,
          gl.RGBA,
          halfFloatTexType
        );
        formatRG = getSupportedFormat(gl, gl.RG16F, gl.RG, halfFloatTexType);
        formatR = getSupportedFormat(gl, gl.R16F, gl.RED, halfFloatTexType);
      } else {
        formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
      }

      // if (formatRGBA == null)
      //   ga('send', 'event', isWebGL2 ? 'webgl2' : 'webgl', 'not supported')
      // else ga('send', 'event', isWebGL2 ? 'webgl2' : 'webgl', 'supported')

      return {
        gl,
        ext: {
          formatRGBA,
          formatRG,
          formatR,
          halfFloatTexType,
          supportLinearFiltering,
        },
      };
    }

    function getSupportedFormat(gl, internalFormat, format, type) {
      if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
        switch (internalFormat) {
          case gl.R16F:
            return getSupportedFormat(gl, gl.RG16F, gl.RG, type);
          case gl.RG16F:
            return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);
          default:
            return null;
        }
      }

      return {
        internalFormat,
        format,
      };
    }

    function supportRenderTextureFormat(gl, internalFormat, format, type) {
      let texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        internalFormat,
        4,
        4,
        0,
        format,
        type,
        null
      );

      let fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        texture,
        0
      );

      const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
      if (status != gl.FRAMEBUFFER_COMPLETE) return false;
      return true;
    }

    // function startGUI() {
    //   var gui = new dat.GUI({
    //     width: 300,
    //   })
    //   gui
    //     .add(config, 'SIM_RESOLUTION', {
    //       32: 32,
    //       64: 64,
    //       128: 128,
    //       256: 256,
    //     })
    //     .name('sim resolution')
    //     .onFinishChange(initFramebuffers)
    //   gui
    //     .add(config, 'DYE_RESOLUTION', {
    //       128: 128,
    //       256: 256,
    //       512: 512,
    //       1024: 1024,
    //     })
    //     .name('dye resolution')
    //     .onFinishChange(initFramebuffers)
    //   gui.add(config, 'DENSITY_DISSIPATION', 0.9, 1.0).name('density diffusion')
    //   gui
    //     .add(config, 'VELOCITY_DISSIPATION', 0.9, 1.0)
    //     .name('velocity diffusion')
    //   gui
    //     .add(config, 'PRESSURE_DISSIPATION', 0.0, 1.0)
    //     .name('pressure diffusion')
    //   gui.add(config, 'CURL', 0, 50).name('vorticity').step(1)
    //   gui.add(config, 'SPLAT_RADIUS', 0.01, 1.0).name('splat radius')
    //   gui.add(config, 'SHADING').name('shading')
    //   gui.add(config, 'COLORFUL').name('colorful')
    //   gui.add(config, 'PAUSED').name('paused').listen()

    //   gui
    //     .add(
    //       {
    //         fun: () => {
    //           splatStack.push(parseInt(Math.random() * 20) + 5)
    //         },
    //       },
    //       'fun'
    //     )
    //     .name('Random splats')

    //   let bloomFolder = gui.addFolder('Bloom')
    //   bloomFolder.add(config, 'BLOOM').name('enabled')
    //   bloomFolder.add(config, 'BLOOM_INTENSITY', 0.1, 2.0).name('intensity')
    //   bloomFolder.add(config, 'BLOOM_THRESHOLD', 0.0, 1.0).name('threshold')

    //   let captureFolder = gui.addFolder('Capture')
    //   captureFolder.addColor(config, 'BACK_COLOR').name('background color')
    //   captureFolder.add(config, 'TRANSPARENT').name('transparent')
    //   captureFolder
    //     .add(
    //       {
    //         fun: captureScreenshot,
    //       },
    //       'fun'
    //     )
    //     .name('take screenshot')

    //   let github = gui
    //     .add(
    //       {
    //         fun: () => {
    //           window.open(
    //             'https://github.com/PavelDoGreat/WebGL-Fluid-Simulation'
    //           )
    //           ga('send', 'event', 'link button', 'github')
    //         },
    //       },
    //       'fun'
    //     )
    //     .name('Github')
    //   github.__li.className = 'cr function bigFont'
    //   github.__li.style.borderLeft = '3px solid #8C8C8C'
    //   let githubIcon = document.createElement('span')
    //   github.domElement.parentElement.appendChild(githubIcon)
    //   githubIcon.className = 'icon github'

    //   let twitter = gui
    //     .add(
    //       {
    //         fun: () => {
    //           ga('send', 'event', 'link button', 'twitter')
    //           window.open('https://twitter.com/PavelDoGreat')
    //         },
    //       },
    //       'fun'
    //     )
    //     .name('Twitter')
    //   twitter.__li.className = 'cr function bigFont'
    //   twitter.__li.style.borderLeft = '3px solid #8C8C8C'
    //   let twitterIcon = document.createElement('span')
    //   twitter.domElement.parentElement.appendChild(twitterIcon)
    //   twitterIcon.className = 'icon twitter'

    //   let discord = gui
    //     .add(
    //       {
    //         fun: () => {
    //           // ga('send', 'event', 'link button', 'discord')
    //           window.open('https://discordapp.com/invite/CeqZDDE')
    //         },
    //       },
    //       'fun'
    //     )
    //     .name('Discord')
    //   discord.__li.className = 'cr function bigFont'
    //   discord.__li.style.borderLeft = '3px solid #8C8C8C'
    //   let discordIcon = document.createElement('span')
    //   discord.domElement.parentElement.appendChild(discordIcon)
    //   discordIcon.className = 'icon discord'

    //   let app = gui
    //     .add(
    //       {
    //         fun: () => {
    //           // ga('send', 'event', 'link button', 'app')
    //           window.open('http://onelink.to/5b58bn')
    //         },
    //       },
    //       'fun'
    //     )
    //     .name('Check out new improved version')
    //   app.__li.className = 'cr function appBigFont'
    //   app.__li.style.borderLeft = '3px solid #00FF7F'
    //   let appIcon = document.createElement('span')
    //   app.domElement.parentElement.appendChild(appIcon)
    //   appIcon.className = 'icon app'

    //   if (isMobile()) gui.close()
    // }

    function captureScreenshot() {
      colorProgram.bind();
      gl.uniform4f(colorProgram.uniforms.color, 0, 0, 0, 1);
      blit(density.write.fbo);

      render(density.write.fbo);
      gl.bindFramebuffer(gl.FRAMEBUFFER, density.write.fbo);

      let length = dyeWidth * dyeHeight * 4;
      let pixels = new Float32Array(length);
      gl.readPixels(0, 0, dyeWidth, dyeHeight, gl.RGBA, gl.FLOAT, pixels);

      let newPixels = new Uint8Array(length);

      let id = 0;
      for (let i = dyeHeight - 1; i >= 0; i--) {
        for (let j = 0; j < dyeWidth; j++) {
          let nid = i * dyeWidth * 4 + j * 4;
          newPixels[nid + 0] = clamp01(pixels[id + 0]) * 255;
          newPixels[nid + 1] = clamp01(pixels[id + 1]) * 255;
          newPixels[nid + 2] = clamp01(pixels[id + 2]) * 255;
          newPixels[nid + 3] = clamp01(pixels[id + 3]) * 255;
          id += 4;
        }
      }

      let captureCanvas = document.createElement("canvas");
      let ctx = captureCanvas.getContext("2d");
      captureCanvas.width = dyeWidth;
      captureCanvas.height = dyeHeight;

      let imageData = ctx.createImageData(dyeWidth, dyeHeight);
      imageData.data.set(newPixels);
      ctx.putImageData(imageData, 0, 0);
      let datauri = captureCanvas.toDataURL();

      downloadURI("fluid.png", datauri);

      URL.revokeObjectURL(datauri);
    }

    function clamp01(input) {
      return Math.min(Math.max(input, 0), 1);
    }

    function downloadURI(filename, uri) {
      let link = document.createElement("a");
      link.download = filename;
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    function isMobile() {
      return /Mobi|Android/i.test(navigator.userAgent);
    }

    class GLProgram {
      constructor(vertexShader, fragmentShader) {
        this.uniforms = {};
        this.program = gl.createProgram();

        gl.attachShader(this.program, vertexShader);
        gl.attachShader(this.program, fragmentShader);
        gl.linkProgram(this.program);

        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS))
          throw gl.getProgramInfoLog(this.program);

        const uniformCount = gl.getProgramParameter(
          this.program,
          gl.ACTIVE_UNIFORMS
        );
        for (let i = 0; i < uniformCount; i++) {
          const uniformName = gl.getActiveUniform(this.program, i).name;
          this.uniforms[uniformName] = gl.getUniformLocation(
            this.program,
            uniformName
          );
        }
      }

      bind() {
        gl.useProgram(this.program);
      }
    }

    function compileShader(type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        throw gl.getShaderInfoLog(shader);

      return shader;
    }

    const baseVertexShader = compileShader(
      gl.VERTEX_SHADER,
      `
    precision highp float;

    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform vec2 texelSize;

    void main () {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`
    );

    const clearShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    uniform sampler2D uTexture;
    uniform float value;

    void main () {
        gl_FragColor = value * texture2D(uTexture, vUv);
    }
`
    );

    const colorShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
    precision mediump float;

    uniform vec4 color;

    void main () {
        gl_FragColor = color;
    }
`
    );

    const backgroundShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float aspectRatio;

    #define SCALE 25.0

    void main () {
        vec2 uv = floor(vUv * SCALE * vec2(aspectRatio, 1.0));
        float v = mod(uv.x + uv.y, 2.0);
        v = v * 0.1 + 0.8;
        gl_FragColor = vec4(vec3(v), 1.0);
    }
`
    );

    const displayShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;

    void main () {
        vec3 C = texture2D(uTexture, vUv).rgb;
        float a = max(C.r, max(C.g, C.b));
        gl_FragColor = vec4(C, a);
    }
`
    );

    const displayBloomShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform sampler2D uBloom;
    uniform sampler2D uDithering;
    uniform vec2 ditherScale;

    void main () {
        vec3 C = texture2D(uTexture, vUv).rgb;
        vec3 bloom = texture2D(uBloom, vUv).rgb;
        vec3 noise = texture2D(uDithering, vUv * ditherScale).rgb;
        noise = noise * 2.0 - 1.0;
        bloom += noise / 800.0;
        bloom = pow(bloom.rgb, vec3(1.0 / 2.2));
        C += bloom;
        float a = max(C.r, max(C.g, C.b));
        gl_FragColor = vec4(C, a);
    }
`
    );

    const displayShadingShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform vec2 texelSize;

    void main () {
        vec3 L = texture2D(uTexture, vL).rgb;
        vec3 R = texture2D(uTexture, vR).rgb;
        vec3 T = texture2D(uTexture, vT).rgb;
        vec3 B = texture2D(uTexture, vB).rgb;
        vec3 C = texture2D(uTexture, vUv).rgb;

        float dx = length(R) - length(L);
        float dy = length(T) - length(B);

        vec3 n = normalize(vec3(dx, dy, length(texelSize)));
        vec3 l = vec3(0.0, 0.0, 1.0);

        float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
        C.rgb *= diffuse;

        float a = max(C.r, max(C.g, C.b));
        gl_FragColor = vec4(C, a);
    }
`
    );

    const displayBloomShadingShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform sampler2D uBloom;
    uniform sampler2D uDithering;
    uniform vec2 ditherScale;
    uniform vec2 texelSize;

    void main () {
        vec3 L = texture2D(uTexture, vL).rgb;
        vec3 R = texture2D(uTexture, vR).rgb;
        vec3 T = texture2D(uTexture, vT).rgb;
        vec3 B = texture2D(uTexture, vB).rgb;
        vec3 C = texture2D(uTexture, vUv).rgb;

        float dx = length(R) - length(L);
        float dy = length(T) - length(B);

        vec3 n = normalize(vec3(dx, dy, length(texelSize)));
        vec3 l = vec3(0.0, 0.0, 1.0);

        float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
        C *= diffuse;

        vec3 bloom = texture2D(uBloom, vUv).rgb;
        vec3 noise = texture2D(uDithering, vUv * ditherScale).rgb;
        noise = noise * 2.0 - 1.0;
        bloom += noise / 800.0;
        bloom = pow(bloom.rgb, vec3(1.0 / 2.2));
        C += bloom;

        float a = max(C.r, max(C.g, C.b));
        gl_FragColor = vec4(C, a);
    }
`
    );

    const bloomPrefilterShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform vec3 curve;
    uniform float threshold;

    void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;
        float br = max(c.r, max(c.g, c.b));
        float rq = clamp(br - curve.x, 0.0, curve.y);
        rq = curve.z * rq * rq;
        c *= max(rq, br - threshold) / max(br, 0.0001);
        gl_FragColor = vec4(c, 0.0);
    }
`
    );

    const bloomBlurShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;

    void main () {
        vec4 sum = vec4(0.0);
        sum += texture2D(uTexture, vL);
        sum += texture2D(uTexture, vR);
        sum += texture2D(uTexture, vT);
        sum += texture2D(uTexture, vB);
        sum *= 0.25;
        gl_FragColor = sum;
    }
`
    );

    const bloomFinalShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform float intensity;

    void main () {
        vec4 sum = vec4(0.0);
        sum += texture2D(uTexture, vL);
        sum += texture2D(uTexture, vR);
        sum += texture2D(uTexture, vT);
        sum += texture2D(uTexture, vB);
        sum *= 0.25;
        gl_FragColor = sum * intensity;
    }
`
    );

    const splatShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTarget;
    uniform float aspectRatio;
    uniform vec3 color;
    uniform vec2 point;
    uniform float radius;

    void main () {
        vec2 p = vUv - point.xy;
        p.x *= aspectRatio;
        vec3 splat = exp(-dot(p, p) / radius) * color;
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
    }
`
    );

    const advectionManualFilteringShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uVelocity;
    uniform sampler2D uSource;
    uniform vec2 texelSize;
    uniform vec2 dyeTexelSize;
    uniform float dt;
    uniform float dissipation;

    vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
        vec2 st = uv / tsize - 0.5;

        vec2 iuv = floor(st);
        vec2 fuv = fract(st);

        vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
        vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
        vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
        vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);

        return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
    }

    void main () {
        vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
        gl_FragColor = dissipation * bilerp(uSource, coord, dyeTexelSize);
        gl_FragColor.a = 1.0;
    }
`
    );

    const advectionShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uVelocity;
    uniform sampler2D uSource;
    uniform vec2 texelSize;
    uniform float dt;
    uniform float dissipation;

    void main () {
        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
        gl_FragColor = dissipation * texture2D(uSource, coord);
        gl_FragColor.a = 1.0;
    }
`
    );

    const divergenceShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uVelocity, vL).x;
        float R = texture2D(uVelocity, vR).x;
        float T = texture2D(uVelocity, vT).y;
        float B = texture2D(uVelocity, vB).y;

        vec2 C = texture2D(uVelocity, vUv).xy;
        if (vL.x < 0.0) { L = -C.x; }
        if (vR.x > 1.0) { R = -C.x; }
        if (vT.y > 1.0) { T = -C.y; }
        if (vB.y < 0.0) { B = -C.y; }

        float div = 0.5 * (R - L + T - B);
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
    }
`
    );

    const curlShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uVelocity, vL).y;
        float R = texture2D(uVelocity, vR).y;
        float T = texture2D(uVelocity, vT).x;
        float B = texture2D(uVelocity, vB).x;
        float vorticity = R - L - T + B;
        gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
    }
`
    );

    const vorticityShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uVelocity;
    uniform sampler2D uCurl;
    uniform float curl;
    uniform float dt;

    void main () {
        float L = texture2D(uCurl, vL).x;
        float R = texture2D(uCurl, vR).x;
        float T = texture2D(uCurl, vT).x;
        float B = texture2D(uCurl, vB).x;
        float C = texture2D(uCurl, vUv).x;

        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
        force /= length(force) + 0.0001;
        force *= curl * C;
        force.y *= -1.0;

        vec2 vel = texture2D(uVelocity, vUv).xy;
        gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);
    }
`
    );

    const pressureShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uDivergence;

    vec2 boundary (vec2 uv) {
        return uv;
        // uncomment if you use wrap or repeat texture mode
        // uv = min(max(uv, 0.0), 1.0);
        // return uv;
    }

    void main () {
        float L = texture2D(uPressure, boundary(vL)).x;
        float R = texture2D(uPressure, boundary(vR)).x;
        float T = texture2D(uPressure, boundary(vT)).x;
        float B = texture2D(uPressure, boundary(vB)).x;
        float C = texture2D(uPressure, vUv).x;
        float divergence = texture2D(uDivergence, vUv).x;
        float pressure = (L + R + B + T - divergence) * 0.25;
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
    }
`
    );

    const gradientSubtractShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uVelocity;

    vec2 boundary (vec2 uv) {
        return uv;
        // uv = min(max(uv, 0.0), 1.0);
        // return uv;
    }

    void main () {
        float L = texture2D(uPressure, boundary(vL)).x;
        float R = texture2D(uPressure, boundary(vR)).x;
        float T = texture2D(uPressure, boundary(vT)).x;
        float B = texture2D(uPressure, boundary(vB)).x;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity.xy -= vec2(R - L, T - B);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
`
    );

    const blit = (() => {
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
        gl.STATIC_DRAW
      );
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(
        gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array([0, 1, 2, 0, 2, 3]),
        gl.STATIC_DRAW
      );
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(0);

      return (destination) => {
        gl.bindFramebuffer(gl.FRAMEBUFFER, destination);
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
      };
    })();

    let simWidth;
    let simHeight;
    let dyeWidth;
    let dyeHeight;
    let density;
    let velocity;
    let divergence;
    let curl;
    let pressure;
    let bloom;

    let ditheringTexture = createTextureAsync("LDR_RGB1_0.png");

    const clearProgram = new GLProgram(baseVertexShader, clearShader);
    const colorProgram = new GLProgram(baseVertexShader, colorShader);
    const backgroundProgram = new GLProgram(baseVertexShader, backgroundShader);
    const displayProgram = new GLProgram(baseVertexShader, displayShader);
    const displayBloomProgram = new GLProgram(
      baseVertexShader,
      displayBloomShader
    );
    const displayShadingProgram = new GLProgram(
      baseVertexShader,
      displayShadingShader
    );
    const displayBloomShadingProgram = new GLProgram(
      baseVertexShader,
      displayBloomShadingShader
    );
    const bloomPrefilterProgram = new GLProgram(
      baseVertexShader,
      bloomPrefilterShader
    );
    const bloomBlurProgram = new GLProgram(baseVertexShader, bloomBlurShader);
    const bloomFinalProgram = new GLProgram(baseVertexShader, bloomFinalShader);
    const splatProgram = new GLProgram(baseVertexShader, splatShader);
    const advectionProgram = new GLProgram(
      baseVertexShader,
      ext.supportLinearFiltering
        ? advectionShader
        : advectionManualFilteringShader
    );
    const divergenceProgram = new GLProgram(baseVertexShader, divergenceShader);
    const curlProgram = new GLProgram(baseVertexShader, curlShader);
    const vorticityProgram = new GLProgram(baseVertexShader, vorticityShader);
    const pressureProgram = new GLProgram(baseVertexShader, pressureShader);
    const gradienSubtractProgram = new GLProgram(
      baseVertexShader,
      gradientSubtractShader
    );

    function initFramebuffers() {
      let simRes = getResolution(config.SIM_RESOLUTION);
      let dyeRes = getResolution(config.DYE_RESOLUTION);

      simWidth = simRes.width;
      simHeight = simRes.height;
      dyeWidth = dyeRes.width;
      dyeHeight = dyeRes.height;

      const texType = ext.halfFloatTexType;
      const rgba = ext.formatRGBA;
      const rg = ext.formatRG;
      const r = ext.formatR;
      const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

      if (density == null)
        density = createDoubleFBO(
          dyeWidth,
          dyeHeight,
          rgba.internalFormat,
          rgba.format,
          texType,
          filtering
        );
      else
        density = resizeDoubleFBO(
          density,
          dyeWidth,
          dyeHeight,
          rgba.internalFormat,
          rgba.format,
          texType,
          filtering
        );

      if (velocity == null)
        velocity = createDoubleFBO(
          simWidth,
          simHeight,
          rg.internalFormat,
          rg.format,
          texType,
          filtering
        );
      else
        velocity = resizeDoubleFBO(
          velocity,
          simWidth,
          simHeight,
          rg.internalFormat,
          rg.format,
          texType,
          filtering
        );

      divergence = createFBO(
        simWidth,
        simHeight,
        r.internalFormat,
        r.format,
        texType,
        gl.NEAREST
      );
      curl = createFBO(
        simWidth,
        simHeight,
        r.internalFormat,
        r.format,
        texType,
        gl.NEAREST
      );
      pressure = createDoubleFBO(
        simWidth,
        simHeight,
        r.internalFormat,
        r.format,
        texType,
        gl.NEAREST
      );

      initBloomFramebuffers();
    }

    function initBloomFramebuffers() {
      let res = getResolution(config.BLOOM_RESOLUTION);

      const texType = ext.halfFloatTexType;
      const rgba = ext.formatRGBA;
      const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

      bloom = createFBO(
        res.width,
        res.height,
        rgba.internalFormat,
        rgba.format,
        texType,
        filtering
      );

      bloomFramebuffers.length = 0;
      for (let i = 0; i < config.BLOOM_ITERATIONS; i++) {
        let width = res.width >> (i + 1);
        let height = res.height >> (i + 1);

        if (width < 2 || height < 2) break;

        let fbo = createFBO(
          width,
          height,
          rgba.internalFormat,
          rgba.format,
          texType,
          filtering
        );
        bloomFramebuffers.push(fbo);
      }
    }

    function createFBO(w, h, internalFormat, format, type, param) {
      gl.activeTexture(gl.TEXTURE0);
      let texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        internalFormat,
        w,
        h,
        0,
        format,
        type,
        null
      );

      let fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        texture,
        0
      );
      gl.viewport(0, 0, w, h);
      gl.clear(gl.COLOR_BUFFER_BIT);

      return {
        texture,
        fbo,
        width: w,
        height: h,
        attach(id) {
          gl.activeTexture(gl.TEXTURE0 + id);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          return id;
        },
      };
    }

    function createDoubleFBO(w, h, internalFormat, format, type, param) {
      let fbo1 = createFBO(w, h, internalFormat, format, type, param);
      let fbo2 = createFBO(w, h, internalFormat, format, type, param);

      return {
        get read() {
          return fbo1;
        },
        set read(value) {
          fbo1 = value;
        },
        get write() {
          return fbo2;
        },
        set write(value) {
          fbo2 = value;
        },
        swap() {
          let temp = fbo1;
          fbo1 = fbo2;
          fbo2 = temp;
        },
      };
    }

    function resizeFBO(target, w, h, internalFormat, format, type, param) {
      let newFBO = createFBO(w, h, internalFormat, format, type, param);
      clearProgram.bind();
      gl.uniform1i(clearProgram.uniforms.uTexture, target.attach(0));
      gl.uniform1f(clearProgram.uniforms.value, 1);
      blit(newFBO.fbo);
      return newFBO;
    }

    function resizeDoubleFBO(
      target,
      w,
      h,
      internalFormat,
      format,
      type,
      param
    ) {
      target.read = resizeFBO(
        target.read,
        w,
        h,
        internalFormat,
        format,
        type,
        param
      );
      target.write = createFBO(w, h, internalFormat, format, type, param);
      return target;
    }

    function createTextureAsync(url) {
      let texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGB,
        1,
        1,
        0,
        gl.RGB,
        gl.UNSIGNED_BYTE,
        new Uint8Array([255, 255, 255])
      );

      let obj = {
        texture,
        width: 1,
        height: 1,
        attach(id) {
          gl.activeTexture(gl.TEXTURE0 + id);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          return id;
        },
      };

      let image = new Image();
      image.onload = () => {
        obj.width = image.width;
        obj.height = image.height;
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGB,
          gl.RGB,
          gl.UNSIGNED_BYTE,
          image
        );
      };
      image.src = url;

      return obj;
    }

    initFramebuffers();
    multipleSplats(parseInt(Math.random() * 20) + 5);

    let lastColorChangeTime = Date.now();

    update();

    function update() {
      resizeCanvas();
      input();
      if (!config.PAUSED) step(0.016);
      render(null);
      requestAnimationFrame(update);
    }

    function input() {
      if (splatStack.length > 0) multipleSplats(splatStack.pop());

      for (let i = 0; i < pointers.length; i++) {
        const p = pointers[i];
        if (p.moved) {
          splat(p.x, p.y, p.dx, p.dy, p.color);
          p.moved = false;
        }
      }

      if (!config.COLORFUL) return;

      if (lastColorChangeTime + 100 < Date.now()) {
        lastColorChangeTime = Date.now();
        for (let i = 0; i < pointers.length; i++) {
          const p = pointers[i];
          p.color = generateColor();
        }
      }
    }

    function step(dt) {
      gl.disable(gl.BLEND);
      gl.viewport(0, 0, simWidth, simHeight);

      curlProgram.bind();
      gl.uniform2f(
        curlProgram.uniforms.texelSize,
        1.0 / simWidth,
        1.0 / simHeight
      );
      gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));
      blit(curl.fbo);

      vorticityProgram.bind();
      gl.uniform2f(
        vorticityProgram.uniforms.texelSize,
        1.0 / simWidth,
        1.0 / simHeight
      );
      gl.uniform1i(
        vorticityProgram.uniforms.uVelocity,
        velocity.read.attach(0)
      );
      gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1));
      gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
      gl.uniform1f(vorticityProgram.uniforms.dt, dt);
      blit(velocity.write.fbo);
      velocity.swap();

      divergenceProgram.bind();
      gl.uniform2f(
        divergenceProgram.uniforms.texelSize,
        1.0 / simWidth,
        1.0 / simHeight
      );
      gl.uniform1i(
        divergenceProgram.uniforms.uVelocity,
        velocity.read.attach(0)
      );
      blit(divergence.fbo);

      clearProgram.bind();
      gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0));
      gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE_DISSIPATION);
      blit(pressure.write.fbo);
      pressure.swap();

      pressureProgram.bind();
      gl.uniform2f(
        pressureProgram.uniforms.texelSize,
        1.0 / simWidth,
        1.0 / simHeight
      );
      gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));
      for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(
          pressureProgram.uniforms.uPressure,
          pressure.read.attach(1)
        );
        blit(pressure.write.fbo);
        pressure.swap();
      }

      gradienSubtractProgram.bind();
      gl.uniform2f(
        gradienSubtractProgram.uniforms.texelSize,
        1.0 / simWidth,
        1.0 / simHeight
      );
      gl.uniform1i(
        gradienSubtractProgram.uniforms.uPressure,
        pressure.read.attach(0)
      );
      gl.uniform1i(
        gradienSubtractProgram.uniforms.uVelocity,
        velocity.read.attach(1)
      );
      blit(velocity.write.fbo);
      velocity.swap();

      advectionProgram.bind();
      gl.uniform2f(
        advectionProgram.uniforms.texelSize,
        1.0 / simWidth,
        1.0 / simHeight
      );
      if (!ext.supportLinearFiltering)
        gl.uniform2f(
          advectionProgram.uniforms.dyeTexelSize,
          1.0 / simWidth,
          1.0 / simHeight
        );
      let velocityId = velocity.read.attach(0);
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocityId);
      gl.uniform1i(advectionProgram.uniforms.uSource, velocityId);
      gl.uniform1f(advectionProgram.uniforms.dt, dt);
      gl.uniform1f(
        advectionProgram.uniforms.dissipation,
        config.VELOCITY_DISSIPATION
      );
      blit(velocity.write.fbo);
      velocity.swap();

      gl.viewport(0, 0, dyeWidth, dyeHeight);

      if (!ext.supportLinearFiltering)
        gl.uniform2f(
          advectionProgram.uniforms.dyeTexelSize,
          1.0 / dyeWidth,
          1.0 / dyeHeight
        );
      gl.uniform1i(
        advectionProgram.uniforms.uVelocity,
        velocity.read.attach(0)
      );
      gl.uniform1i(advectionProgram.uniforms.uSource, density.read.attach(1));
      gl.uniform1f(
        advectionProgram.uniforms.dissipation,
        config.DENSITY_DISSIPATION
      );
      blit(density.write.fbo);
      density.swap();
    }

    function render(target) {
      if (config.BLOOM) applyBloom(density.read, bloom);

      if (target == null || !config.TRANSPARENT) {
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.enable(gl.BLEND);
      } else {
        gl.disable(gl.BLEND);
      }

      let width = target == null ? gl.drawingBufferWidth : dyeWidth;
      let height = target == null ? gl.drawingBufferHeight : dyeHeight;

      gl.viewport(0, 0, width, height);

      if (!config.TRANSPARENT) {
        colorProgram.bind();
        let bc = config.BACK_COLOR;
        gl.uniform4f(colorProgram.uniforms.color, 0, 0, 0, 0);
        blit(target);
      }

      if (target == null && config.TRANSPARENT) {
        backgroundProgram.bind();
        gl.uniform1f(
          backgroundProgram.uniforms.aspectRatio,
          canvas.width / canvas.height
        );
        blit(null);
      }

      if (config.SHADING) {
        let program = config.BLOOM
          ? displayBloomShadingProgram
          : displayShadingProgram;
        program.bind();
        gl.uniform2f(program.uniforms.texelSize, 1.0 / width, 1.0 / height);
        gl.uniform1i(program.uniforms.uTexture, density.read.attach(0));
        if (config.BLOOM) {
          gl.uniform1i(program.uniforms.uBloom, bloom.attach(1));
          gl.uniform1i(program.uniforms.uDithering, ditheringTexture.attach(2));
          let scale = getTextureScale(ditheringTexture, width, height);
          gl.uniform2f(program.uniforms.ditherScale, scale.x, scale.y);
        }
      } else {
        let program = config.BLOOM ? displayBloomProgram : displayProgram;
        program.bind();
        gl.uniform1i(program.uniforms.uTexture, density.read.attach(0));
        if (config.BLOOM) {
          gl.uniform1i(program.uniforms.uBloom, bloom.attach(1));
          gl.uniform1i(program.uniforms.uDithering, ditheringTexture.attach(2));
          let scale = getTextureScale(ditheringTexture, width, height);
          gl.uniform2f(program.uniforms.ditherScale, scale.x, scale.y);
        }
      }

      blit(target);
    }

    function applyBloom(source, destination) {
      if (bloomFramebuffers.length < 2) return;

      let last = destination;

      gl.disable(gl.BLEND);
      bloomPrefilterProgram.bind();
      let knee = config.BLOOM_THRESHOLD * config.BLOOM_SOFT_KNEE + 0.0001;
      let curve0 = config.BLOOM_THRESHOLD - knee;
      let curve1 = knee * 2;
      let curve2 = 0.25 / knee;
      gl.uniform3f(
        bloomPrefilterProgram.uniforms.curve,
        curve0,
        curve1,
        curve2
      );
      gl.uniform1f(
        bloomPrefilterProgram.uniforms.threshold,
        config.BLOOM_THRESHOLD
      );
      gl.uniform1i(bloomPrefilterProgram.uniforms.uTexture, source.attach(0));
      gl.viewport(0, 0, last.width, last.height);
      blit(last.fbo);

      bloomBlurProgram.bind();
      for (let i = 0; i < bloomFramebuffers.length; i++) {
        let dest = bloomFramebuffers[i];
        gl.uniform2f(
          bloomBlurProgram.uniforms.texelSize,
          1.0 / last.width,
          1.0 / last.height
        );
        gl.uniform1i(bloomBlurProgram.uniforms.uTexture, last.attach(0));
        gl.viewport(0, 0, dest.width, dest.height);
        blit(dest.fbo);
        last = dest;
      }

      gl.blendFunc(gl.ONE, gl.ONE);
      gl.enable(gl.BLEND);

      for (let i = bloomFramebuffers.length - 2; i >= 0; i--) {
        let baseTex = bloomFramebuffers[i];
        gl.uniform2f(
          bloomBlurProgram.uniforms.texelSize,
          1.0 / last.width,
          1.0 / last.height
        );
        gl.uniform1i(bloomBlurProgram.uniforms.uTexture, last.attach(0));
        gl.viewport(0, 0, baseTex.width, baseTex.height);
        blit(baseTex.fbo);
        last = baseTex;
      }

      gl.disable(gl.BLEND);
      bloomFinalProgram.bind();
      gl.uniform2f(
        bloomFinalProgram.uniforms.texelSize,
        1.0 / last.width,
        1.0 / last.height
      );
      gl.uniform1i(bloomFinalProgram.uniforms.uTexture, last.attach(0));
      gl.uniform1f(
        bloomFinalProgram.uniforms.intensity,
        config.BLOOM_INTENSITY
      );
      gl.viewport(0, 0, destination.width, destination.height);
      blit(destination.fbo);
    }

    function splat(x, y, dx, dy, color) {
      gl.viewport(0, 0, simWidth, simHeight);
      splatProgram.bind();
      gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));
      gl.uniform1f(
        splatProgram.uniforms.aspectRatio,
        canvas.width / canvas.height
      );
      gl.uniform2f(
        splatProgram.uniforms.point,
        x / canvas.width,
        1.0 - y / canvas.height
      );
      gl.uniform3f(splatProgram.uniforms.color, dx, -dy, 1.0);
      gl.uniform1f(splatProgram.uniforms.radius, config.SPLAT_RADIUS / 100.0);
      blit(velocity.write.fbo);
      velocity.swap();

      gl.viewport(0, 0, dyeWidth, dyeHeight);
      gl.uniform1i(splatProgram.uniforms.uTarget, density.read.attach(0));
      gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);
      blit(density.write.fbo);
      density.swap();
    }

    function multipleSplats(amount) {
      for (let i = 0; i < amount; i++) {
        const color = generateColor();
        color.r *= 10.0;
        color.g *= 10.0;
        color.b *= 10.0;
        const x = canvas.width * Math.random();
        const y = canvas.height * Math.random();
        const dx = 1000 * (Math.random() - 0.5);
        const dy = 1000 * (Math.random() - 0.5);
        splat(x, y, dx, dy, color);
      }
    }

    function resizeCanvas() {
      if (
        canvas.width != canvas.clientWidth ||
        canvas.height != canvas.clientHeight
      ) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        initFramebuffers();
      }
    }

    canvas.addEventListener("mousemove", (e) => {
      pointers[0].down = true;
      pointers[0].color = generateColor();
      pointers[0].moved = pointers[0].down;
      pointers[0].dx = (e.offsetX - pointers[0].x) * 5.0;
      pointers[0].dy = (e.offsetY - pointers[0].y) * 5.0;
      pointers[0].x = e.offsetX;
      pointers[0].y = e.offsetY;
    });

    /* canvas.addEventListener('touchmove', e => {
    e.preventDefault();
    const touches = e.targetTouches;
    for (let i = 0; i < touches.length; i++) {
        let pointer = pointers[i];
        pointer.moved = pointer.down;
        pointer.dx = (touches[i].pageX - pointer.x) * 8.0;
        pointer.dy = (touches[i].pageY - pointer.y) * 8.0;
        pointer.x = touches[i].pageX;
        pointer.y = touches[i].pageY;
    }
}, false); */

    canvas.addEventListener("mousedown", () => {
      pointers[0].down = true;
      pointers[0].color = generateColor();
    });

    /* canvas.addEventListener('touchstart', e => {
    e.preventDefault();
    const touches = e.targetTouches;
    for (let i = 0; i < touches.length; i++) {
        if (i >= pointers.length)
            pointers.push(new pointerPrototype());

        pointers[i].id = touches[i].identifier;
        pointers[i].down = true;
        pointers[i].x = touches[i].pageX;
        pointers[i].y = touches[i].pageY;
        pointers[i].color = generateColor();
    }
}); */

    /* window.addEventListener('mouseup', () => {
    pointers[0].down = false;
}); */
    /* 
window.addEventListener('touchend', e => {
    const touches = e.changedTouches;
    for (let i = 0; i < touches.length; i++)
        for (let j = 0; j < pointers.length; j++)
            if (touches[i].identifier == pointers[j].id)
                pointers[j].down = false;
}); */
    /* 
window.addEventListener('keydown', e => {
    if (e.code === 'KeyP')
        config.PAUSED = !config.PAUSED;
    if (e.key === ' ')
        splatStack.push(parseInt(Math.random() * 20) + 5);
}); */

    function generateColor() {
      let c = HSVtoRGB(1.8, 1.0, 1.0);
      c.r = 0.064;
      c.g = 0.064;
      c.b = 0.064;
      // console.log("c", c);
      return c;
    }

    function HSVtoRGB(h, s, v) {
      let r, g, b, i, f, p, q, t;
      i = Math.floor(h * 6);
      f = h * 6 - i;
      p = v * (1 - s);
      q = v * (1 - f * s);
      t = v * (1 - (1 - f) * s);

      switch (i % 6) {
        case 0:
          // eslint-disable-next-line no-unused-expressions
          (r = v), (g = t), (b = p);
          break;
        case 1:
          // eslint-disable-next-line no-unused-expressions
          (r = q), (g = v), (b = p);
          break;
        case 2:
          // eslint-disable-next-line no-unused-expressions
          (r = p), (g = v), (b = t);
          break;
        case 3:
          // eslint-disable-next-line no-unused-expressions
          (r = p), (g = q), (b = v);
          break;
        case 4:
          // eslint-disable-next-line no-unused-expressions
          (r = t), (g = p), (b = v);
          break;
        case 5:
          // eslint-disable-next-line no-unused-expressions
          (r = v), (g = p), (b = q);
          break;
      }

      return {
        r,
        g,
        b,
      };
    }

    function getResolution(resolution) {
      let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
      if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;

      let max = Math.round(resolution * aspectRatio);
      let min = Math.round(resolution);

      if (gl.drawingBufferWidth > gl.drawingBufferHeight)
        return {
          width: max,
          height: min,
        };
      else
        return {
          width: min,
          height: max,
        };
    }

    function getTextureScale(texture, width, height) {
      return {
        x: width / texture.width,
        y: height / texture.height,
      };
    }
  }, []);

  return (
    <div className="homeWrapper">
      <NotificationContainer />
      <canvas className="banner_canvas" id="canvas_banner"></canvas>
      <div className="home" style={{ zIndex: 1, pointerEvents: "none" }}>
        <div className="left-home">
          <h1>Swap Without a Trace</h1>
          <p>
            After performing a HoudiniSwap, there will be no traceable
            connection between the sending wallet and receiving wallet. Poof,
            your crypto is anonymous.
          </p>
          <div className="input-div" id="id-search">
            <input
              type="text"
              placeholder="Search by Houdini ID"
              id="houdini-search"
            />
            <FontAwesomeIcon icon={faSearch} onClick={searchOrderId} />
          </div>
        </div>
        <div className="right-home">
          <div className="top-home">
            <div className="col">
              <h1>Swap</h1>
              <h2>Anonymous, Secure, KYC-Free.</h2>
            </div>
            {/* <RefreshControl icon={faRotate} onClick={APIcall} /> */}
          </div>
          <div className="input-swap">
            {/* input 1 ---------------------------------- */}
            <div
              className={`wrapper-swap ${openDrop.drop1 && "border-radius"}`}
            >
              <div
                className="swap-col"
                // style={{ opacity: isLoading ? 0.4 : 1 }}
              >
                <h3>Send:</h3>
                <input
                  style={{ color: input1.color }}
                  type="number"
                  placeholder="0.0"
                  value={input1.value}
                  onChange={handleChange}
                  min="0"
                />
                {!isLoading &&
                  input1.value > 0 &&
                  (input1.value <= minAmount ||
                    (input1.value >= maxAmount && maxAmount > 0)) && (
                    <div className="warning-alert">
                      <img
                        src={warningIcon}
                        alt="min-value-warn"
                        className="warning-icon"
                      />
                      {input1.value <= minAmount ? "Min: " : "Max: "}
                      {input1.value <= minAmount ? minAmount : maxAmount}{" "}
                      {getElemName(input1.name)}
                    </div>
                  )}
              </div>

              <div
                className="right-col"
                // style={{ opacity: isLoading ? 0.4 : 1 }}
              >
                <div
                  className="coin"
                  ref={dropdown1Ref}
                  onClick={() => {
                    // if (isLoading) return;
                    setOpenDrop((prev) => {
                      if (prev.drop1) {
                        return { drop1: false, drop2: false };
                      } else {
                        return { drop1: true, drop2: false };
                      }
                    });
                  }}
                >
                  <img src={input1.icon} alt="" />
                  <h2>{getElemName(input1.name)}</h2>
                  <FontAwesomeIcon icon={faChevronDown} width="9" />
                </div>
                <p>
                  1 {getElemName(input1.name)} ≈ {currency}{" "}
                  {getElemName(input2.name)}
                </p>
              </div>
              <div
                className={`drop-down-swap ${openDrop.drop1 && "open-drop"}`}
              >
                {dropItems.map((elem, idx) => {
                  return (
                    <div
                      style={{
                        pointerEvents: idx < 14 ? "all" : "none",
                        cursor: idx < 14 ? "pointer" : "not-allowed",
                        opacity: idx < 14 ? "1" : "0.2",
                      }}
                      onClick={() => selectCoin(elem, idx, "send")}
                      key={"drop" + idx}
                      className="swap-drop"
                    >
                      <img src={elem.icon} alt="" />
                      <h1>{getElemName(elem.name)}</h1>
                    </div>
                  );
                })}
              </div>
            </div>
            <img
              onClick={handleArrows}
              src={upDown}
              alt=""
              className="abs-img"
            />
            {/* input 2 ---------------------------------- */}
            <div
              className={`wrapper-swap ${openDrop.drop2 && "border-radius"}`}
            >
              <div
                className="swap-col"
                // style={{ opacity: isLoading ? 0.4 : 1 }}
              >
                <h3>Receive:</h3>
                <input
                  style={{ color: input2.color }}
                  type="number"
                  placeholder="0.0"
                  value={input2.value}
                  disabled
                />
              </div>

              <div
                className="right-col"
                // style={{ opacity: isLoading ? 0.4 : 1 }}
              >
                <div
                  className="coin"
                  ref={dropdown2Ref}
                  onClick={() => {
                    // if (isLoading) return;
                    setOpenDrop((prev) => {
                      if (prev.drop2) {
                        return { drop1: false, drop2: false };
                      } else {
                        return { drop1: false, drop2: true };
                      }
                    });
                  }}
                >
                  <img src={input2.icon} alt="" />
                  <h2>{getElemName(input2.name)}</h2>
                  <FontAwesomeIcon icon={faChevronDown} width="9" />
                </div>
                <p>
                  1 {getElemName(input2.name)} ≈{" "}
                  {input1.name !== input2.name ? currency2 : currency}{" "}
                  {getElemName(input1.name)}
                </p>
              </div>
              <div
                className={`drop-down-swap ${openDrop.drop2 && "open-drop"}`}
              >
                {dropItems.map((elem, idx) => {
                  return (
                    <div
                      style={{
                        pointerEvents: idx < 14 ? "all" : "none",
                        cursor: idx < 14 ? "pointer" : "not-allowed",
                        opacity: idx < 14 ? "1" : "0.2",
                      }}
                      onClick={() => selectCoin(elem, idx, "receive")}
                      // onClick={() => {
                      //   setOpenDrop({ drop1: false, drop2: false });
                      //   setInput2({
                      //     name: elem.name,
                      //     icon: elem.icon,
                      //     value: "",
                      //     color: elem.color,
                      //   });
                      // }}
                      key={"drop" + idx}
                      className="swap-drop"
                    >
                      <img src={elem.icon} alt="" />
                      <h1>{getElemName(elem.name)}</h1>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="recieve">
            <h2>Receiving Wallet ({input2.name}) Address:</h2>
            <input
              type="text"
              placeholder={`Receiving Wallet (${input2.name}) Address`}
              id="receiver-address"
              value={receiveAddress}
              onChange={(e) => setReceiveAddress(e.target.value)}
            />
          </div>
          <p className="note">
            *Only send from wallets. Transactions sent from a Smart Contract are
            not accepted.
          </p>
          <div className="swap-btn" onClick={handleExchange}>
            {isLoading ? (
              <>
                <h6>{!swapClicked ? "Fetching Price" : "Anonymizing"}</h6>
                <div className="spinner">
                  <div className="bounce1"></div>
                  <div className="bounce2"></div>
                  <div className="bounce3"></div>
                </div>
              </>
            ) : (
              "SWAP NOW"
            )}
          </div>
          <div
            className="input-div"
            style={{ marginTop: "1em" }}
            id="mobile-id-search"
          >
            <input
              type="text"
              placeholder="Search by Houdini ID"
              id="houdini-search-v2"
            />
            <FontAwesomeIcon icon={faSearch} onClick={searchOrderId2} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

// const rotate = keyframes`
//   from {
//     transform: rotate(0deg);
//   }
//   to {
//     transform: rotate(360deg);
//   }
// `;

// const RefreshControl = styled(FontAwesomeIcon)`
//   -webkit-animation: ${rotate} 1s linear infinite;
//   -moz-animation: ${rotate} 1s linear infinite;
//   animation: ${rotate} 1s linear infinite;
// `;
