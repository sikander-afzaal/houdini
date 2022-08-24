import "./App.css";

import Header from "./Layout/Header/Header";
import Home from "./Pages/Home/Home";

import TrackingInformation from "./Pages/TrackingInformation/TrackingInformation";
import Footer from "./Layout/Footer/Footer";

import StakeSpoof from "./Pages/StakeSpoof/StakeSpoof";

import { Routes, Route, useLocation } from "react-router-dom";
import Works from "./Pages/Works/Works";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="App">
      <Header />

      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<TrackingInformation />} path="/track" />
        <Route element={<StakeSpoof />} path="/stake" />
        <Route element={<Works />} path="/works" />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
