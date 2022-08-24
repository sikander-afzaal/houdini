import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import ReviewBox from "../../Components/ReviewBox/ReviewBox";
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
import review1 from "../../Assets/works/review (1).png";
import review2 from "../../Assets/works/review (2).png";
import review3 from "../../Assets/works/review (3).png";
import blob from "../../Assets/tracking-illustration.png";
import blobMob from "../../Assets/mob-ill.png";

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
        <div className="reviews">
          <img src={blob} alt="" className="blob" />
          <img src={blobMob} alt="" className="blob-mob" />
          <h2 className="small-head">What people are saying</h2>
          <h1 className="head">Testimonials.</h1>
          <Splide
            className="review-slider"
            options={{
              width: "90%",
              perPage: 3,
              perMove: 1,
              drag: true,
              pagination: false,
              arrows: true,
              type: "loop",
              gap: "20px",
              breakpoints: {
                1080: {
                  perPage: 2,
                },
                740: {
                  perPage: 1,
                  arrows: false,
                  pagination: true,
                },
              },
            }}
          >
            <SplideSlide>
              <ReviewBox
                para={[
                  "HoudiniSwap gives me power! I did the KYC with Binance, so they know who I am. The government could always audit them to find all of my trades.",
                  "I just HoudiniSwap out of Binance and into a Trust wallet. Poof! I now feel like a true crypto basement warrior, thank you!",
                ]}
                name={"J. Mathew"}
                img={review1}
                stars={5}
              />
            </SplideSlide>
            <SplideSlide>
              <ReviewBox
                para={[
                  "Feels amazing to be free! I made 100+ trades last month, which could all be tied back to my gov’t ID from Crypto.com.",
                  "Now, I HoudiniSwap out my KYC coins from Crypto.com into a MetaMask wallet so my trades are not tied to my IRL identity. Bye bye taxman. Everyone should be doing this!",
                ]}
                name={"Lara Sam"}
                img={review2}
                stars={5}
              />
            </SplideSlide>
            <SplideSlide>
              <ReviewBox
                para={[
                  "Honestly f**k the government. I feel like I’m part of a quiet revolution whenever I use HoudiniSwap.",
                  "I totally agree that anonymity and crypto should go hand in hand. You guys rock.",
                ]}
                name={"Smith James"}
                img={review3}
                stars={5}
              />
            </SplideSlide>
          </Splide>
        </div>
      </div>
    </div>
  );
}

export default Works;
