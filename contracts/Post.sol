// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

contract Post {

    // define structure of article
    struct Article {
        address authorAddress;
        string authorAlias;
        string category;
        string title;
        string contentHash;
        string imageHash;
        uint256 timestamp;
        uint256 articleId;
    }

    // unique post Id
    uint public postId = 0;

    // mapping to store all articles
    mapping (uint => Article) public articles;

    // mapping to store author's articles
    mapping (address => uint[]) public authorArticles;

    // contract owner's address
    address payable owner;

    uint gasLimit;

    constructor() payable {
        gasLimit = 200000;

        // set contract deployer as the owner
        owner = payable(msg.sender);
    }

    // ---  MODIFIERS --- //

    modifier onlyAuthor(uint _postId) {
        require(articles[_postId].authorAddress == msg.sender);
        _;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    modifier postExists(uint _postId) {
        require(articles[_postId].authorAddress != address(0) && _postId > 0 && _postId <= postId, "Post does not exist.");
        _;
    }

    modifier hasEnoughDeposits() {
        require(msg.sender.balance >= tx.gasprice * gasLimit, "Not enough ether to perform this operation");
        _;
    }

    //==================================

    // --- FUNCTIONS --- //

    function createPost(string memory _authorAlias, string memory _category, string memory _title, string memory _contentHash, string memory _imageHash) external hasEnoughDeposits() {

        require(bytes(_title).length > 0, "Title must not be empty.");
        
        // increment post Id to new article's post Id
        postId++;

       articles[postId] = (
        Article(msg.sender, _authorAlias, _category, _title, _contentHash, _imageHash, block.timestamp, postId)
       );

       // Add the post ID to the author's articles mapping
        authorArticles[msg.sender].push(postId);
    }

    function updatePost(uint _postId, string memory _title, string memory _contentHash) external onlyAuthor(_postId) postExists(_postId) hasEnoughDeposits() {
        
        // Update title and content of article
        articles[_postId].title = _title;
        articles[_postId].contentHash = _contentHash;
    }

    function deletePost(uint _postId) external onlyAuthor(_postId) postExists(_postId) hasEnoughDeposits() {
        address author = articles[_postId].authorAddress;
        
        delete articles[_postId]; 

        uint[] storage authorPostIds = authorArticles[author];
        for (uint i = 0; i < authorPostIds.length; i++) {
            if (authorPostIds[i] == _postId) {
                authorPostIds[i] = authorPostIds[authorPostIds.length - 1];
                authorPostIds.pop();
                break;
            }
        }
    }

    function getPost(uint _postId) external view returns (Article memory) {
        return articles[_postId];
    }

    function getAuthorArticleIds(address _authorAddress) external view returns(uint[] memory) {
        return authorArticles[_authorAddress];
    }
    
    /*
    CAN'T RETURN MAPPING IN SOLIDITY, NEED TO FIND A WORKAROUND
    function getArticles() external view returns (Article[] memory) {
        // Return all articles
        return articles;
    }
    */

    //==================================

    struct Donation {
        string name;
        string message;
        uint256 amount;
    }

    // list of donations made
    Donation[] donations;

    // function to donate
    function donate(string memory _name, string memory _message, uint256 _amount) external payable {
        donations.push(Donation(
            _name,
            _message,
            _amount
        ));
        owner.transfer(msg.value);
    }

    // function to retrieve all donations
    function getDonations() external view returns (Donation[] memory) {
        return donations;
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}

}
