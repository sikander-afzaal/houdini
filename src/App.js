import "./App.css";
import Header from "./Layout/Header/Header";
import Footer from "./Layout/Footer/Footer";
import TrackingInformation from "./Pages/TrackingInformation/TrackingInformation";

function App() {
  return (
    <div className="App">
      <Header />
      <TrackingInformation />
      <Footer />
    </div>
  );
}

export default App;
