pragma solidity ^0.8.12;
import "@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

interface IURIRouter {
    function tokenURI(uint256 tokenId) external view returns (string memory);
}

interface INonStandardNFT {
    function ownerOf(uint256 tokenId) external view returns (address);
}

contract CyberDeck is ERC721PresetMinterPauserAutoId {
    using Strings for uint256;
    uint256 public price = .12 ether;
    bool public hasMaxSupply = false;
    uint256 public maxSupply = 0;
    address payable treasury;
    IURIRouter uriRouter;

    struct ParentNFT {
        address tokenAddress;
        uint256 tokenId;
    }

    string URIRoot =
        "ipfs://Qmb4ApbzaijNt71SZn3rNaiaFdtEkFMScyiBP2tr2vz6tc/default.json";

    mapping(uint256 => ParentNFT) public parentNfts;
    mapping(address => mapping(uint256 => bool)) public mintedStatus;
    mapping(address => bool) public allowedNfts;
    bool public isExclusive = true;
    mapping(address => bool) public standardStatus;
    mapping(address => address) public nonStandardRouters;

    using Counters for Counters.Counter;
    Counters.Counter public _tokenIds;

    constructor(address payable treasuryAddress)
        ERC721PresetMinterPauserAutoId("LFG CyberDeck", "CYDECK", URIRoot)
    {
        treasury = treasuryAddress;
    }

    function _createParentNFT(
        address _parentTokenAddress,
        uint256 _parentTokenId,
        uint256 _tokenId
    ) private {
        parentNfts[_tokenId] = ParentNFT({
            tokenAddress: _parentTokenAddress,
            tokenId: _parentTokenId
        });
    }

    function exists(uint256 _tokenId) public view returns (bool) {
        return _exists(_tokenId);
    }

    function buy(address _parentTokenAddress, uint256 _parentTokenId)
        public
        payable
    {
        if (isExclusive) {
            require(allowedNfts[_parentTokenAddress], "NFT is not exclusive");
        }
        require(
            _parentTokenAddress != address(this),
            "This NFT cannot be used"
        );

        require(msg.value >= price, "Insufficient Funds");

        if (standardStatus[_parentTokenAddress]) {
            IERC721 _nft = IERC721(_parentTokenAddress);
            require(
                _nft.ownerOf(_parentTokenId) == msg.sender,
                "You are not owner of this NFT"
            );
        } else {
            require(
                INonStandardNFT(nonStandardRouters[_parentTokenAddress])
                    .ownerOf(_parentTokenId) == msg.sender,
                "You are not owner of this NFT"
            );
        }
        require(
            !mintedStatus[_parentTokenAddress][_parentTokenId],
            "NFT has already been used to mint"
        );
        uint256 currentID = _tokenIds.current();
        _createParentNFT(_parentTokenAddress, _parentTokenId, currentID);
        mintedStatus[_parentTokenAddress][_parentTokenId] = true;
        _mint(msg.sender, currentID);
        _tokenIds.increment();
        //TODO: pay guys
        payGuys();
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        return uriRouter.tokenURI(tokenId);
    }

    function setAllowedNft(
        address _nftAddress,
        bool _allowed,
        bool _standard,
        address _nonStandardRouter
    ) public {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, _msgSender()),
            "You don't have permission to do this."
        );
        allowedNfts[_nftAddress] = _allowed;
        standardStatus[_nftAddress] = _standard;
        if (!_standard) {
            nonStandardRouters[_nftAddress] = _nonStandardRouter;
        }
    }

    function setIsExclusive(bool _e) public {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, _msgSender()),
            "You don't have permission to do this."
        );
        isExclusive = _e;
    }

    function setURIRouter(address _u) public {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, _msgSender()),
            "You don't have permission to do this."
        );
        uriRouter = IURIRouter(_u);
    }

    function setURIRoot(string memory _u) public {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, _msgSender()),
            "You don't have permission to do this."
        );
        URIRoot = _u;
    }

    function setPrice(uint256 _p) public {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, _msgSender()),
            "You don't have permission to do this."
        );
        price = _p;
    }

    function setMaxSupply(bool _hasMaxSupply, uint256 _maxSupply) public {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, _msgSender()),
            "You don't have permission to do this."
        );
        if (_hasMaxSupply) {
            require(_maxSupply >= _tokenIds.current(), "Max Supply too low");
            hasMaxSupply = true;
            maxSupply = _maxSupply;
        } else {
            hasMaxSupply = _hasMaxSupply;
            maxSupply = _maxSupply;
        }
    }

    function payGuys() private {
        uint256 balance = address(this).balance;
        treasury.transfer(balance);
    }

    function withdrawal() public {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, _msgSender()),
            "You don't have permission to do this."
        );
        uint256 balance = address(this).balance;
        treasury.transfer(balance);
    }
}
