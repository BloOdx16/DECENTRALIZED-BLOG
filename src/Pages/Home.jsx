import React, { useEffect, useState } from "react";
import { contractAddress, abi } from "../App";
import Web3 from "web3";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  const likeBlog = async (id) => {
    try {
      const web3 = new Web3(window.ethereum || "https://rpc-mumbai.maticvigil.com");
      const contract = new web3.eth.Contract(abi, contractAddress);
  
      // Get the user's account
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
  
      // Call the likeBlog function (no ETH sent)
      await contract.methods.likeBlog(id).send({ from: account });
  
      alert("Blog liked successfully!");
      window.location.reload(); // Refresh the page to update likes
    } catch (error) {
      console.error("Error liking blog:", error);
      alert("Failed to like blog: " + error.message);
    }
  };

  useEffect(() => {
    const loadBlogs = async () => {
      const web3 = new Web3(window.ethereum || "https://rpc-mumbai.maticvigil.com");
      const contract = new web3.eth.Contract(abi, contractAddress);
      const blogCount = await contract.methods.blogCount().call();
      const blogs = [];
      for (let i = 1; i <= blogCount; i++) {
        const blog = await contract.methods.getBlog(i).call();
        blogs.push(blog);
      }
      setBlogs(blogs);
    };
    loadBlogs();
  
  }, []);

  
  return (
    <div style={styles.container}>
      <h1>Home</h1>
      {blogs.map((blog) => (
        <div key={blog.id} style={styles.blog}>
          <h2>{blog.content}</h2>
          <p>Author: {blog.author}</p>
          <p>Likes: {blog.likes}</p>
          <button onClick={() => likeBlog(blog.id)} style={styles.button}>
          Like
          </button>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
  },
  blog: {
    border: "1px solid #ccc",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    marginRight: "10px",
  },
};

export default Home;