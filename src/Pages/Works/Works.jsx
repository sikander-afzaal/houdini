import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "./Works.css";
import img from "../../Assets/works/works-bg.png";
import imgMob from "../../Assets/works/mob-bg.png";
import box1 from "../../Assets/works/box (1).png";
import box2 from "../../Assets/works/box (2).png";
import box3 from "../../Assets/works/box (3).png";
import box4 from "../../Assets/works/box (4).png";
import BoxWork from "../../Components/BoxWork/BoxWork";
import atom from "../../Assets/works/atom.png";
import shine from "../../Assets/works/shine.png";
function Works() {
  return (
    <div className="homeWrapper">
      <div className="works">
        <div className="top-works">
          <h2 className="small-head">How it works</h2>
          <h1 className="head">
            First ever <br /> conduit system.
          </h1>
          <div className="row-works">
            <BoxWork
              title={"Swap"}
              desc={
                "Anonymizes your crypto by swapping it first to Monero on Exchange A."
              }
              img={box1}
            />
            <BoxWork
              title={"Anonymity"}
              desc={"Send your anonymous Monero to Exchange B"}
              img={box2}
            />
            <BoxWork
              title={"POOF"}
              desc={
                "Swaps the Monero on Exchange B to your desired receiving currency"
              }
              img={box3}
            />
            <BoxWork
              title={"Privacy"}
              desc={
                "Sends receiving currency to your desired wallet, breaking all links between the sender and receiver"
              }
              img={box4}
            />
          </div>
          <Splide
            options={{
              width: "100%",
              perPage: 1,
              perMove: 1,
              drag: true,
              arrows: false,
              type: "loop",
              gap: "20px",
            }}
            className="slider"
            aria-label="My Favorite Images"
          >
            <SplideSlide>
              <BoxWork
                title={"Swap"}
                desc={
                  "Anonymizes your crypto by swapping it first to Monero on Exchange A."
                }
                img={box1}
              />
            </SplideSlide>
            <SplideSlide>
              <BoxWork
                title={"Anonymity"}
                desc={"Send your anonymous Monero to Exchange B"}
                img={box2}
              />
            </SplideSlide>
            <SplideSlide>
              <BoxWork
                title={"POOF"}
                desc={
                  "Swaps the Monero on Exchange B to your desired receiving currency"
                }
                img={box3}
              />
            </SplideSlide>
            <SplideSlide>
              <BoxWork
                title={"Privacy"}
                desc={
                  "Sends receiving currency to your desired wallet, breaking all links between the sender and receiver"
                }
                img={box4}
              />
            </SplideSlide>
          </Splide>
          <img src={img} alt="" className="bg-work" />
          <img src={imgMob} alt="" className="bg-work-mob" />
        </div>
        <div className="work-section">
          <img src={shine} className="shine" alt="" />
          <div className="right-section">
            <h2 className="small-head">Why this works</h2>
            <h1 className="head">Trusted by millions.</h1>
            <p>
              When a Monero transaction is sent, there is no way to see the
              sending party, receiving party, nor the transaction value.
              <br />
              <br />
              By sending Monero from one exchange to another, it vanishes from
              the ledger, then suddenly reappears to a new exchange that has no
              tie to the former.
            </p>
          </div>
        </div>
        <div className="work-section">
          <div className="right-section">
            <h2 className="small-head">Why we built this</h2>
            <h1 className="head">Decentralization.</h1>
            <p>
              Decentralization and anonymity should go hand-in-hand. Why should
              everyone be able to track where you earn your money and where it
              is spent?
              <br />
              <br />
              Karen across the street doesn’t have access to view your bank
              account, so why should crypto be any different! HoudiniSwap makes
              it easy to swap transactions between wallets without a trace. Bye
              bye nosy neighbors!
            </p>
          </div>
          <img src={atom} className="shine" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Works;
