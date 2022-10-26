import "./Works.css";
import { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import ReviewBox from "../../Components/ReviewBox/ReviewBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

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
import step3 from "../../Assets/step3.svg";
import step1 from "../../Assets/step1.svg";
import blobMob from "../../Assets/mob-ill.png";

function Works() {
  const STEPS__DATA = [
    {
      step: "Step 1",
      head: "Choose the crypto swap pair",
      desc: "Choose between any combination of cryptos.",
    },
    {
      step: "Step 2",
      head: "Input the amount to swap",
      desc: "Wait while HoudiniSwap gathers rates from multiple exchanges and optimizes for the lowest cost.",
    },
    {
      step: "Step 3",
      head: "Input the receiving wallet address",
      desc: "The receiving wallet address should match the address format of the receiving currency. For example, ETH address start with 0x...",
    },
    {
      step: "Step 4",
      head: "Send funds to address generated",
      desc: "Open your personal wallet and send the funds to the address generated on the Order Page. For enhanced security, HoudiniSwap does not utilize a wallet connect.",
    },
    {
      step: "Step 5",
      head: "Done!",
      desc: "On average, it takes 20-minutes for a swap to complete. Follow along progress on the Order Page.",
    },
    {
      step: "Step 6",
      head: "Still need help? Contact support.",
      desc: "Our support team is available 24/7. Contact us anytime with questions, feedback, or ideas!",
    },
  ];
  const [steps, setSteps] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      if (steps === STEPS__DATA.length - 1) {
        setSteps(0);
      } else {
        setSteps((prev) => {
          return prev + 1;
        });
      }
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, [steps]);

  return (
    <div className="homeWrapper">
      <div className="works">
        <div className="top-works">
          <h2 className="small-head">How it works</h2>
          <h1 className="head weight-400">
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
            <h1 className="head weight-400">Trusted by millions.</h1>
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
        <div className="flex-col">
          <div>
            <h2 className="small-head">How To Swap</h2>
            <h1 className="head">Easy and Secure</h1>
          </div>
          <div className="steps-div">
            <div className="left-steps">
              <div className="steps-desc">
                {/* <h3>{STEPS__DATA[steps].step}</h3> */}
                <h2 className="small-head">{STEPS__DATA[steps].head}</h2>
                <p>{STEPS__DATA[steps].desc}</p>
              </div>
              <div className="pagination">
                {STEPS__DATA.map((elem, idx) => {
                  return (
                    <div
                      onClick={() => setSteps(idx)}
                      key={idx + "pagination"}
                      className={`page ${steps === idx ? "active-page" : ""}`}
                    >
                      <div onClick={() => setSteps(idx)}></div>
                    </div>
                  );
                })}
              </div>
              <div className="navigation">
                <FontAwesomeIcon
                  onClick={() =>
                    setSteps((prev) => {
                      if (prev === 0) {
                        return 5;
                      } else {
                        return prev - 1;
                      }
                    })
                  }
                  icon={faChevronLeft}
                />
                <p>
                  {steps + 1}/{STEPS__DATA.length}
                </p>
                <FontAwesomeIcon
                  onClick={() =>
                    setSteps((prev) => {
                      if (prev === 5) {
                        return 0;
                      } else {
                        return prev + 1;
                      }
                    })
                  }
                  icon={faChevronRight}
                />
              </div>
            </div>
            <div className="right-steps">
              {steps === 0 && (
                <div className="bg-purple">
                  <img src={step1} alt="" />
                </div>
              )}
              {steps === 1 && (
                <div className="bg-purple">
                  <img src={step3} alt="" />
                </div>
              )}
              {steps === 2 && (
                <div className="bg-purple">
                  <img src={step3} alt="" />
                </div>
              )}
              {steps === 3 && (
                <div className="bg-purple">
                  <img src={step3} alt="" />
                </div>
              )}
              {steps === 4 && (
                <div className="bg-purple">
                  <img src={step3} alt="" />
                </div>
              )}
              {steps === 5 && (
                <div className="bg-purple">
                  <img src={step3} alt="" />
                </div>
              )}
            </div>
          </div>
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
