import React from "react";

import XMR from "../../Assets/xmr-black-white.png";

import illustration from "../../Assets/tracking-illustration.png";

import "./StakeSpoof.css";

export default function StakeSpoof() {
  return (
    <div className="stake__wrapper">
      <div className="stake">
        <div className="stake__section1">
          <h1 className="stake__mainHeading">Stake $POOF</h1>

          <p className="stake__section1Para">
            stake your $POOF as we embark on our mission to the moon.
          </p>
        </div>

        <div className="stake__section2">
          <div className="stake__section2Top">
            <div className="stake__section2TopBtn stake__section2TopBtnActive">
              <h1>5% $POOF APY</h1>
              <span>14 days</span>
            </div>

            <div className="stake__section2TopBtn">
              <h1>10% $POOF APY</h1>
              <span>20 days</span>
            </div>

            <div className="stake__section2TopBtn">
              <h1>20% $POOF APY</h1>
              <span>70 days</span>
            </div>
          </div>

          <div className="stake__section2CenterUp">
            <div>
              <span>Quantity:</span>
              <h1>0.0</h1>
            </div>

            <div>
              <img src={XMR} alt="XMR" />

              <h1>POOF</h1>
            </div>
          </div>

          <div className="stake__section2CenterDown">
            <div className="stake__section2CenterDownData">
              <span>Total Amount</span>

              <h1>0.0</h1>
            </div>

            <div className="stake__section2CenterDownData">
              <span>Period</span>

              <h1>14 days</h1>
            </div>

            <div className="stake__section2CenterDownData">
              <span>$POOF APY</span>

              <h1>5%</h1>
            </div>

            <div className="stake__section2CenterDownData">
              <span>Pool Participation</span>

              <h1>20</h1>
            </div>

            <div className="stake__section2CenterDownData">
              <span>Etd. Yearly Earnings</span>

              <h1>0.00 $POOF</h1>
            </div>

            <div className="stake__section2CenterDownData">
              <span>Redemption Date</span>

              <h1>13/06/2022</h1>
            </div>
          </div>

          <div className="stake__section2Bottom">
            <button className="stake__btn stake__section2Approve">
              Approve
            </button>

            <button className="stake__btn stake__section2Stake">Stake</button>
          </div>
        </div>

        <div className="stake__section3">
          <img
            src={illustration}
            alt="Illustration"
            className="stake__section3Bg"
          />
          <div className="stake__section3Content">
            <h1 className="stake__mainHeading">Redeem $POOF</h1>

            <div className="stake__stats">
              <div className="stake__stat">
                <span className="stake__statName">$POOF Staked</span>

                <h1 className="stake__statValue">0.00</h1>
              </div>

              <div className="stake__stat">
                <span className="stake__statName">$POOF Earning</span>

                <h1 className="stake__statValue">0.00</h1>
              </div>

              <div className="stake__stat">
                <span className="stake__statName">Your Stake Holdings</span>

                <h1 className="stake__statValue">0.00</h1>
              </div>
            </div>

            <button className="stake__btn stake__redeem">Redeem</button>
          </div>
        </div>
      </div>
    </div>
  );
}
