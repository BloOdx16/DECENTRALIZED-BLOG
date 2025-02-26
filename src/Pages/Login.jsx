import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const navigate = useNavigate();

  // Handle email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in successfully!");
      navigate("/");
    } catch (error) {
      alert("Failed to log in: " + error.message);
    }
  };

  // Handle signup
  const handleSignUp = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Account created successfully!");
    navigate("/"); 
  };

  // Handle wallet connection
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        setWalletAddress(accounts[0]);
        alert("Wallet connected successfully!");
      } else {
        alert("Please install MetaMask to connect your wallet!");
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      alert("Failed to connect wallet: " + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Login / Sign Up</h1>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Login
        </button>
        <button onClick={handleSignUp} style={styles.button}>
          Sign Up
        </button>
      </form>

      <div style={styles.walletSection}>
        <button onClick={connectWallet} style={styles.button}>
          {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...` : "Connect Wallet"}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "300px",
    margin: "0 auto",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
  },
  walletSection: {
    marginTop: "20px",
  },
};

export default Login;