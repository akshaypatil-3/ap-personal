import React from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import "./assets/styles/main.scss";
import "./App.css";
import SideNav from "./components/sidenav/SideNav";
import Routes from "./routes";

function callAPI() {
  console.log("call api to get repsonse**");
}

function App() {
  return (
    <div className="App">
      <Header />

      <div className="mainContainer">
        <SideNav />
        <div className="right">
          <div className="container">
            <Routes />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
