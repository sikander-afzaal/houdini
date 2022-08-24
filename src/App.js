import "./App.css";

import Header from "./Layout/Header/Header";
import Home from "./Pages/Home/Home";
import TrackingInformation from "./Pages/TrackingInformation/TrackingInformation";
import Footer from "./Layout/Footer/Footer";

import { Routes, Route } from "react-router-dom";
import StakeSpoof from "./Pages/StakeSpoof/StakeSpoof";
function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<TrackingInformation />} path="/track" />
        <Route element={<StakeSpoof />} path="/stake" />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
