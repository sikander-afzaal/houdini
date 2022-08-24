import React from "react";

import orderRecieved from "../../Assets/order-recieved.png";
import anonymizing from "../../Assets/anonymizing.png";
import swapping from "../../Assets/swapping.png";
import done from "../../Assets/done.png";

import ethereum from "../../Assets/ethereum.png";

import "./TrackingInformation.css";

export default function TrackingInformation() {
  return (
    <div className="trackingInformation__wrapper">
      <div className="trackingInformation">
        <div className="trackingInformation__section1">
          <h1 className="trackingInformation__subheading">Post Swap</h1>

          <h1 className="trackingInformation__heading">Tracking Information</h1>

          <p className="trackingInformation__para">
            After performing a HoudiniSwap, there will be no traceable
            connection between the sending wallet and receiving wallet. Poof,
            your crypto is anonymous.
          </p>
        </div>

        <div className="trackingInformation__section2">
          <div className="trackingInformation__step">
            <img src={orderRecieved} alt="Order Recieved" />
            <span>Order Recieved</span>
          </div>

          <div className="trackingInformation__divider trackingInformation__lineDivider"></div>

          <div className="trackingInformation__step">
            <img src={anonymizing} alt="Anonymizing" />
            <span>Anonymizing</span>
          </div>

          <div className="trackingInformation__divider"></div>

          <div className="trackingInformation__step">
            <img src={swapping} alt="Swapping" />
            <span>Swapping</span>
          </div>

          <div className="trackingInformation__divider"></div>

          <div className="trackingInformation__step">
            <img src={done} alt="Done" />
            <span>Done</span>
          </div>
        </div>

        <div className="trackingInformation__section3">
          <div className="trackingInformation__card">
            <h1 className="trackingInformation__cardHeading">Transaction</h1>

            <div className="trackingInformation__cardItem">
              <div className="trackingInformation__cardItemTop">
                <span>Send:</span>

                <span>
                  <img src={ethereum} />
                  ETH
                </span>
              </div>

              <div className="trackingInformation__cardItemBottom">
                <span>1.00</span>
              </div>
            </div>

            <div className="trackingInformation__cardItem"></div>
          </div>

          <div className="trackingInformation__card">
            <h1 className="trackingInformation__cardHeading">Tracking Info</h1>

            <div className="trackingInformation__cardItem"></div>

            <div className="trackingInformation__cardItem"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
