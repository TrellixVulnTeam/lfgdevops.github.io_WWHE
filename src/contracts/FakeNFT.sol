pragma solidity ^0.8.12;
import "@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract FakeNFT is ERC721PresetMinterPauserAutoId {
    constructor(
        string memory name,
        string memory symbol,
        string memory uriRoot
    ) ERC721PresetMinterPauserAutoId(name, symbol, uriRoot) {}

    function buy() public {
        _mint(msg.sender, totalSupply() + 1);
    }
}
