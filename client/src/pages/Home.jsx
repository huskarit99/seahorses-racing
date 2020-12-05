import React from "react";
import ufo from "../images/ufo.png";
const Home = () => {
  return (
    <div className="container">
      <div className="header">
        <img src={ufo} alt="" className="logoImage" />
        <h1 className="name">Seahorses Racing</h1>
      </div>
      <form>
        <div className="gameInputContainer">
          <input
            type="text"
            name=""
            id=""
            className="gameInput"
            placeholder="Username"
          />
        </div>
        <div className="gameInputContainer">
          <input
            type="text"
            name=""
            id=""
            className="gameInput"
            placeholder="Room ID"
          />
        </div>
        <input
          type="submit"
          value="START"
          className="gameButton horizontalCenter"
          style={{ marginTop: "1rem" }}
        />
        <input
          type="submit"
          value="GET ID"
          className="gameButton horizontalCenter"
          style={{ marginTop: "1rem" }}
        />
      </form>
    </div>
  );
};

export default Home;
