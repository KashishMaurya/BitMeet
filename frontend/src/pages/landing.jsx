import React from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";

export default function LandingPage() {
  const router = useNavigate();

  return (
    <div className="landingPageContainer">
      <nav>
        <div className="navHeader">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <h2>BitMeet</h2>
          </Link>
        </div>

        <div className="navlist">
          <p
            onClick={() => {
              router("/guest-join");
            }}
          >
            Join as Guest
          </p>
          <p
            onClick={() => {
              router("/auth");
            }}
          >
            Register
          </p>
          <div
            onClick={() => {
              router("/auth");
            }}
            role="button"
          >
            <p>Login</p>
          </div>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div className="landingText">
          <h1>
            <span style={{ color: "#FF9839" }}>Connect</span> with your loved
            ones
          </h1>

          <p>Cover a distance by BitMeet</p>

          <div role="button" style={{ textAlign: "center" }}>
            <Link to={"/auth"}>Get Started</Link>
          </div>
        </div>

        <div>
          <img src="/mobile.png" alt="mobile" />
        </div>
      </div>
    </div>
  );
}
