pragma solidity ^0.8.12;
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

using ECDSA for bytes32;

contract Verifier {
    function verifyMessage(string memory message, bytes memory signature)
        public
        view
        returns (address)
    {
        //hash the plain text message
        bytes32 messagehash = keccak256(bytes(message));

        address signerAddress = messagehash.toEthSignedMessageHash().recover(
            signature
        );

        return signerAddress;
    }
}
