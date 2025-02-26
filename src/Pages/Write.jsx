import React, { useState } from "react";
import { contractAddress, abi } from "../App";
import Web3 from "web3";

const Write = () => {
  
  const [content, setContent] = useState("");

  const postBlog = async () => {
    try {
      const web3 = new Web3(window.ethereum || "https://rpc-mumbai.maticvigil.com");
      const contract = new web3.eth.Contract(abi, contractAddress);

      // Get the user's account
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      // Call the postBlog function in the contract
      await contract.methods.postBlog(content).send({ from: account });

      alert("Blog posted successfully!");
      setContent("");
    } catch (error) {
      console.error("Error posting blog:", error);
      alert("Failed to post blog: " + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Write a Blog</h1>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your blog here..."
        style={styles.textarea}
      />
      <button onClick={postBlog} style={styles.button}>Post Blog</button>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
  },
  textarea: {
    width: "100%",
    height: "100px",
    marginBottom: "10px",
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Write;