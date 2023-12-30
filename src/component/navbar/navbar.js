import React from "react";
import "./navbar.css"
import logo from "../../assets/logo.svg"



const Navbar = () => {
  return (
    
    <div className="navbar">
      <div className="logos">
        <img src={logo} alt="logo here"></img>
      </div>
      <ul className="navbarUL">
        <li>keazoN<span className="nav">Books</span></li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </div>
  );
};

export default Navbar;
