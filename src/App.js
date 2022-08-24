import "./App.css";

import Header from "./Layout/Header/Header";
import Home from "./Pages/Home/Home";
<<<<<<< HEAD
import TrackingInformation from "./Pages/TrackingInformation/TrackingInformation";
import Footer from "./Layout/Footer/Footer";

import { Routes, Route } from "react-router-dom";
import StakeSpoof from "./Pages/StakeSpoof/StakeSpoof";
=======
import { Routes, Route, useLocation } from "react-router-dom";
import Works from "./Pages/Works/Works";
import { useEffect } from "react";
>>>>>>> 105139e4cd36a417d840397e06fe5ac1c3da1ee0
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
<<<<<<< HEAD
        <Route element={<TrackingInformation />} path="/track" />
        <Route element={<StakeSpoof />} path="/stake" />
=======
        <Route element={<Works />} path="/works" />
>>>>>>> 105139e4cd36a417d840397e06fe5ac1c3da1ee0
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
