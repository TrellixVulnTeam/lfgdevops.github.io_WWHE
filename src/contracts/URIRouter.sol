pragma solidity ^0.8.12;

import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "./CyberDeck.sol";

contract URIRouter is AccessControlEnumerable {
    mapping(address => string) ipfsURIRoots; // ipfs://a1b2c3d4/
    CyberDeck cyberDeck;
    string defaultURI =
        "ipfs://QmTn58CWyNHmyVxtwaVU5NKE1t2BNDWr1cWDTMA9Mn8KrP/default.json";

    constructor(address _cyberDeckAddress) {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        cyberDeck = CyberDeck(_cyberDeckAddress);
    }

    function tokenURI(uint256 _tId)
        public
        view
        virtual
        returns (string memory)
    {
        require(cyberDeck.exists(_tId), "Token does not exist");
        (address tokenAddress, uint256 tokenId) = cyberDeck.parentNfts(_tId);
        string memory baseURI = ipfsURIRoots[tokenAddress];
        if (bytes(baseURI).length == 0) {
            return defaultURI;
        } else {
            return string(abi.encodePacked(baseURI, tokenId, ".json"));
        }
    }

    function addIpfsURIRoot(address _nftAddress, string memory _root) public {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, _msgSender()),
            "You don't have permission to do this."
        );
        ipfsURIRoots[_nftAddress] = _root;
    }
}
