import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.link}>Home</Link>
      <Link to="/write" style={styles.link}>Write</Link>
      <Link to="/profile" style={styles.link}>Profile</Link>
      <Link to="/login" style={styles.link}>Login</Link>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-around",
    padding: "10px",
    backgroundColor: "#333",
    color: "#fff",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "18px",
  },
};

export default Navbar;