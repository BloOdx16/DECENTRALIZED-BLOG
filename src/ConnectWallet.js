import Web3 from "web3";

export const ConnectWallet = async () => {
  try {
    // Check if MetaMask is installed
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);

      // Request account access
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Get the user's account
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      return account;
    } else {
      alert("Please install MetaMask to use this app!");
      return null;
    }
  } catch (error) {
    console.error("Error connecting to MetaMask:", error);
    return null;
  }
};