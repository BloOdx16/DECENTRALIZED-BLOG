// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DecentralizedBlog {
    struct Blog {
        uint id;
        address payable author; 
        string content;
        uint likes;
    }

    mapping(uint => Blog) public blogs;
    uint public blogCount;

    event BlogPosted(uint id, address author, string content);
    event BlogLiked(uint id, uint likes);

    // Function to post a blog
    function postBlog(string memory _content) public {
        blogCount++;
        blogs[blogCount] = Blog(blogCount, payable(msg.sender), _content, 0); 
        emit BlogPosted(blogCount, msg.sender, _content);
    }

    // Function to like a blog 
    function likeBlog(uint _id) public {
        require(_id > 0 && _id <= blogCount, "Invalid blog ID");

        // Transfer 0.00001 ETH to the author from the contract's balance
        uint amount = 0.00001 ether;
        require(address(this).balance >= amount, "Insufficient contract balance");
        blogs[_id].author.transfer(amount);

        // Increment likes
        blogs[_id].likes++;
        emit BlogLiked(_id, blogs[_id].likes);
    }

    // Function to get blog details
    function getBlog(uint _id) public view returns (uint, address, string memory, uint) {
        require(_id > 0 && _id <= blogCount, "Invalid blog ID");
        Blog memory blog = blogs[_id];
        return (blog.id, blog.author, blog.content, blog.likes);
    }

    // Function to fund the contract (you can send ETH to the contract)
    function fundContract() public payable {
        require(msg.value > 0, "ETH amount must be greater than 0");
    }

    // Function to check the contract's balance
    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }
}
