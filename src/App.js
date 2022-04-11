import { useState, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Web3 from "web3";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import { Web3Context } from "./contexts/Web3Context";
import CyberDeck from "./abis/CyberDeck.json";
import FakeNFT from "./abis/FakeNFT.json";
import ERC721 from "./abis/ERC721.json";

import CONFIG from "./config.json";
import Home from "./Pages/Home";
import BootupScreen from "./components/BootupScreen";
import { WidthContainer } from "./components/WidthContainer";
import ConnectWalletScreen from "./components/ConnectWalletScreen";
import useKeyPress from "./components/useKeyPress";
import Whitepaper from "./Pages/Whitepaper";
import TerminalScreen from "./components/TerminalScreen";
import RoomSceneLoader from "./components/RoomScene/RoomSceneLoader";
import App3D from "./App3D";
import Mint from "./Pages/Mint";
import errorParser from "./utils/errorParser";

const allNFTS = [
  "0x614e92021a82240bc73AB61e899FA75d91087964",
  "0x55B2431d6Aa7AD9A726f652305f21314d636A9c6",
  "0xa74C87459c8B03aB5234B4CcdD743e53DAd34f3C",
];

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [web3, setWeb3] = useState(null);
  const [cyberDeck, setCyberDeck] = useState(null);
  const [fakeNft, setFakeNft] = useState(null);
  const [supplyAvailable, setSupplyAvailable] = useState(0);
  const [balanceOf, setBalanceOf] = useState(0);
  const [supply, setTotalSupply] = useState(null);
  const [price, setPrice] = useState(null);
  const [account, setAccount] = useState(null);
  const [currentNetwork, setCurrentNetwork] = useState(null);
  const clearKeyPress = useKeyPress("c");

  const [blockchainExplorerURL, setBlockchainExplorerURL] = useState(
    "https://etherscan.io/"
  );
  const [openseaURL, setOpenseaURL] = useState(
    "https://opensea.io/collection/hogwash-polygon"
  );

  const [isMinting, setIsMinting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState(null);

  const [currentTime, setCurrentTime] = useState(new Date().getTime());
  const [revealTime, setRevealTime] = useState(0);
  const [ownedTokens, setOwnedTokens] = useState(null);
  const [allowedNfts, setAllowedNfts] = useState([]);
  const [ownedAllowedNfts, setOwnedAllowedNfts] = useState([]);

  // ANIMATION CONSTS
  const [isLoadingInitialData, setIsLoadingInitialData] = useState(false);
  const [isLoadingCyberdeck, setIsLoadingCyberdeck] = useState(false);
  const [isLoadingUserTokens, setIsLoadingUserTokens] = useState(false);
  const [clearedBootup, setClearedBootup] = useState(false);

  const mintNFTHandler = async ({ tokenAddress, tokenId }) => {
    // Mint NFT
    if (cyberDeck) {
      setIsMinting(true);
      setIsError(false);
      const price = await cyberDeck.methods.price().call();

      await cyberDeck.methods
        .buy(tokenAddress, tokenId)
        .send({
          from: account,
          value: parseInt(price.toString()).toString(),
        })
        .on("receipt", async () => {
          try {
            await loadBlockchainData(true);
          } catch (e) {}
        })
        .on("error", (error) => {
          window.alert(
            errorParser.parseError({
              error: error.message.toString(),
              errorSet: errorParser.cyberDeckErrors,
            })
          );
          setIsError(true);
        });
    }

    setIsMinting(false);
  };

  async function getParentNft({ _account, _index, _cyberDeck }) {
    try {
      const tokenId = await _cyberDeck.methods
        .tokenOfOwnerByIndex(_account, _index)
        .call();
      const parentNft = await _cyberDeck.methods.parentNfts(tokenId).call();
      const nftContract = new web3.eth.Contract(
        ERC721.abi,
        parentNft.tokenAddress
      );

      const ownerOfParent = await nftContract.methods
        .ownerOf(parentNft.tokenId)
        .call();
      let resp = {
        cyberDeckOwner: _account,
        index: _index,
        tokenId: tokenId,
        parentTokenAddress: parentNft.tokenAddress,
        parentTokenId: parentNft.tokenId,
        parentTokenOwner: ownerOfParent,
      };
      return { tokenData: resp };
    } catch (e) {
      let resp = {
        cyberDeckOwner: _account,
        index: _index,
        tokenId: -1,
        error: e,
      };
      return resp;
    }
  }

  async function getNftAndMetadata({}) {}

  async function getAllowedNFT({ nftAddress, _account }) {
    try {
      const nftContract = new web3.eth.Contract(FakeNFT.abi, nftAddress);
      const _bo = await nftContract.methods.balanceOf(_account).call();
      let otp = [];
      const [name, symbol] = await Promise.all([
        nftContract.methods.name().call(),
        nftContract.methods.symbol().call(),
      ]);
      if (_bo < 1) {
        return [];
      }

      for (let i = 0; i < _bo; i++) {
        otp.push(nftContract.methods.tokenOfOwnerByIndex(_account, i).call());
      }

      const tIds = await Promise.all(otp);
      let twd = [];
      for (const id of tIds) {
        twd.push({
          name: name,
          symbol: symbol,
          address: nftAddress,
          tokenId: id,
        });
      }
      return twd;
    } catch (e) {
      return [];
    }
  }

  async function getAllAllowedNFTs({ _account }) {
    let ap = [];
    for (const a of allNFTS) {
      ap.push(getAllowedNFT({ nftAddress: a, _account: _account }));
    }

    const al = await Promise.all(ap);
    let allEm = [];
    for (const l of al) {
      allEm = [...allEm, ...l];
    }
    setOwnedAllowedNfts(allEm);
  }
  async function getOwnedTokens({ _account, _cyberDeck }) {
    const _balanceOf = await _cyberDeck.methods.balanceOf(_account).call();

    let tokenPromises = [];
    for (let i = 0; i < _balanceOf; i++) {
      tokenPromises.push(
        getParentNft({ _account: _account, _index: i, _cyberDeck: _cyberDeck })
      );
    }

    let ot = await Promise.all(tokenPromises);
    ot = ot.filter(
      ({ tokenData }) =>
        tokenData &&
        !tokenData.error &&
        tokenData.parentTokenOwner &&
        tokenData.parentTokenOwner.toString() === _account.toString()
    );
    setOwnedTokens(ot);
  }

  useEffect(() => {
    if (clearKeyPress && !isLoadingInitialData) {
      setClearedBootup(true);
    }
  }, [clearKeyPress]);

  const loadBlockchainData = async (_clearedBootup) => {
    // Fetch Contract, Data, etc.
    if (web3) {
      setClearedBootup(_clearedBootup);
      setIsLoadingInitialData(true);
      const networkId = await web3.eth.net.getId();
      setCurrentNetwork(networkId);

      try {
        if (
          !CyberDeck.networks[networkId] ||
          !CyberDeck.networks[networkId].address
        ) {
          setIsLoadingInitialData(false);

          // window.alert("Please Connect to the Ethereum Mainnet");
          return;
        }
        const cyberDeck = new web3.eth.Contract(
          CyberDeck.abi,
          CyberDeck.networks[networkId].address
        );
        const fakeNft = new web3.eth.Contract(
          FakeNFT.abi,
          FakeNFT.networks[networkId].address
        );
        setIsLoadingCyberdeck(true);

        setCyberDeck(cyberDeck);
        setFakeNft(fakeNft);
        const price = await cyberDeck.methods.price().call();
        const maxSupply = await cyberDeck.methods.maxSupply().call();
        const totalSupply = await cyberDeck.methods.totalSupply().call();
        setPrice(price);
        setTotalSupply(totalSupply);
        setSupplyAvailable(maxSupply - totalSupply);

        if (networkId !== 5777) {
          setBlockchainExplorerURL(
            CONFIG.NETWORKS[networkId].blockchainExplorerURL
          );
          setOpenseaURL(CONFIG.NETWORKS[networkId].openseaURL);
        }

        if (account) {
          setIsLoadingUserTokens(true);
          await getAllAllowedNFTs({ _account: account });
          await getOwnedTokens({ _account: account, _cyberDeck: cyberDeck });
        }
        setIsLoadingInitialData(false);
        // setIsLoadingCyberdeck(false);
        // setIsLoadingUserTokens(false);
      } catch (error) {
        setIsError(true);
        setMessage(
          "Contract not deployed to current network, please change network in MetaMask"
        );
      }
    }
  };
  const loadWeb3 = async () => {
    if (typeof window.ethereum !== "undefined" && !account) {
      const web3 = new Web3(window.ethereum, {
        transactionConfirmationBlocks: 1,
      });
      setWeb3(web3);

      const accounts = await web3.eth.getAccounts();

      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        setMessage("Please connect with MetaMask");
      }

      window.ethereum.on("accountsChanged", function (accounts) {
        setAccount(accounts[0]);
        setMessage(null);
      });

      window.ethereum.on("chainChanged", (chainId) => {
        // Handle the new chain.
        // Correctly handling chain changes can be complicated.
        // We recommend reloading the page unless you have good reason not to.
        window.location.reload();
      });
    }
  };

  const web3Handler = async () => {
    if (web3) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    }
  };

  useEffect(() => {
    loadWeb3();
    loadBlockchainData(false);
  }, [account]);

  return (
    <div className="App">
      <>
        <Web3Context.Provider
          value={{
            account,
            setAccount,
            cyberDeck,
            web3,
            web3Handler,
            supply,
            mintNFTHandler,
            ownedAllowedNfts,
            ownedTokens,
          }}
        >
          {false ? (
            <>
              <TerminalScreen>
                <ConnectWalletScreen />
              </TerminalScreen>
            </>
          ) : (
            <>
              {!clearedBootup && location.pathname.length > 1 ? (
                <TerminalScreen>
                  <BootupScreen
                    isLoadingCyberdeck={isLoadingCyberdeck}
                    isLoadingUserTokens={isLoadingUserTokens}
                    isLoadingInitialData={isLoadingInitialData}
                    account={account}
                  />
                </TerminalScreen>
              ) : (
                <Routes>
                  <Route
                    path="/whitepaper"
                    element={
                      <TerminalScreen>
                        <Whitepaper />
                      </TerminalScreen>
                    }
                  />
                  <Route
                    path="/home"
                    element={
                      <TerminalScreen>
                        <Home />
                      </TerminalScreen>
                    }
                  />
                  <Route
                    path="/mint"
                    element={
                      <TerminalScreen>
                        <Mint />
                      </TerminalScreen>
                    }
                  />
                  <Route path="/" element={<App3D />} />
                </Routes>
              )}
            </>
          )}
        </Web3Context.Provider>
      </>
    </div>
  );
}

function MyApp() {
  return (
    <div id={"app"} className="app2d">
      <Router>
        {/* <ChakraProvider> */}
        <App />
        {/* </ChakraProvider> */}
      </Router>
    </div>
  );
}

export default MyApp;
