import React from "react";

import orderRecieved from "../../Assets/order-recieved.png";
import anonymizing from "../../Assets/anonymizing.png";
import swapping from "../../Assets/swapping.png";
import done from "../../Assets/done.png";

import ethereum from "../../Assets/eth.png";

import copy from "../../Assets/copy.png";

import illustration from "../../Assets/tracking-illustration.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import "./TrackingInformation.css";

export default function TrackingInformation() {
  return (
    <div className="track__wrapper">
      <div className="track">
        <div className="track__section1">
          <h1 className="track__subheading">Post Swap</h1>

          <h1 className="track__heading">Tracking Information</h1>

          <p className="track__para">
            After performing a HoudiniSwap, there will be no traceable
            connection between the sending wallet and receiving wallet. Poof,
            your crypto is anonymous.
          </p>
        </div>

        <div className="track__section2">
          <div className="track__step">
            <img src={orderRecieved} alt="Order Recieved" />
            <span>Order Recieved</span>
          </div>

          <div className="track__divider track__lineDivider"></div>

          <div className="track__step">
            <img src={anonymizing} alt="Anonymizing" />
            <span>Anonymizing</span>
          </div>

          <div className="track__divider"></div>

          <div className="track__step">
            <img src={swapping} alt="Swapping" />
            <span>Swapping</span>
          </div>

          <div className="track__divider"></div>

          <div className="track__step">
            <img src={done} alt="Done" />
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
                  <img src={ethereum} />
                  ETH
                </span>
              </div>

              <div className="track__cardItemBottom">
                <h1>1.00</h1>

                <span>
                  <img src={copy} alt="Copy" /> 0x3d007F2AC...6De
                </span>
              </div>
            </div>

            <div className="track__cardItem">
              <div className="track__cardItemTop">
                <span>Recieve:</span>

                <span>
                  <img src={ethereum} />
                  ETH
                </span>
              </div>

              <div className="track__cardItemBottom">
                <h1>0.9779601</h1>

                <span>
                  <img src={copy} alt="Copy" /> 0x1Fbd8f970...D0f0
                </span>
              </div>
            </div>
          </div>

          <div className="track__card">
            <h1 className="track__cardHeading">Tracking Info</h1>

            <div className="track__cardItem2">
              <div className="track__cardItem2Left">
                <span> Houdini ID:</span>

                <h1>
                  6Y5...ZdH <img src={copy} alt="Copy" />
                </h1>
              </div>

              <div className="track__cardItem2Right">
                <span>Creation time</span>

                <span>
                  8/13/2022, <br className="track__br" /> 1:52:19 AM
                </span>
              </div>
            </div>

            <div className="track__cardItem2">
              <div className="track__cardItem2Left">
                <span>Send by:</span>

                <h1>Order Expired</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="track__section4">
          Once Order Received below lights up, your transaction is in motion. On
          average, it takes 20 minutes to arrive in your Receiving Address.
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

            <div className="track__section5Icon">
              <FontAwesomeIcon icon={faPaperPlane} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
