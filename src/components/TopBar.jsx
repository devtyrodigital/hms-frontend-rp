import React from "react";
import "../styles/top-bar.css";
import SearchBar from "./SearchBar";
import Notification from "./Notification";

const logo = "logo";
const TopBar = () => {
  return (
    <div style={{
      margin: 0,
      backgroundColor: "white",
      padding: "1rem 1rem",
      textAlign: 'center',
      borderBottom: "1px solid grey",

      // position: "sticky",
      // top: 0
    }}>
      <section style={{
        backgroundColor: "white",
        margin: 0,
        padding: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#000000",
      }}>
        {logo && <img src={logo} alt="Logo" />}
        <h2 style={{
          padding: 0,
          margin: 0,
          fontSize: '1.4rem',
          fontWeight: 'bold',
        }}> Receptionist Portal</h2>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Notification />
          <SearchBar />
        </div>
      </section>
    </div>
  );
};

export default TopBar;
