import { Center, Heading, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import Panel from "../components/Panel";
import { SunkenInput, SunkenTextArea } from "../components/SunkenInput";
import { WidthContainer } from "../components/WidthContainer";
import TypeAnimation from "react-type-animation";
import useKeyPress from "../components/useKeyPress";
import { useNavigate } from "react-router-dom";
import { Web3Context } from "../contexts/Web3Context";
import ComputerModel from "../components/RoomScene/ComputerModel";
import VertArrowScrollList from "../components/VertArrowScrollList";
import ScrollListItem from "../components/ScrollListItem";

function isUsedNft({ cyberDeckNfts, address, tokenId }) {
  for (const c of cyberDeckNfts) {
    if (
      c.tokenData.parentTokenAddress === address &&
      c.tokenData.parentTokenId.toString() === tokenId.toString()
    ) {
      return true;
    }
  }
  return false;
}

function filterNFTS({ cyberDeckNfts, allowedNfts }) {
  let nonUsed = [];
  for (const a of allowedNfts) {
    const { tokenId, address } = a;
    const isUsed = isUsedNft({
      cyberDeckNfts: cyberDeckNfts,
      address: address,
      tokenId: tokenId,
    });
    if (!isUsed) {
      nonUsed.push(a);
    }
  }
  return nonUsed;
}

export default function Mint() {
  const { mintNFTHandler, ownedAllowedNfts, ownedTokens } =
    useContext(Web3Context);
  const navigate = useNavigate();
  const mKey = useKeyPress("m");
  const { account } = useContext(Web3Context);
  const [tweetMessage, setTweetMessage] = useState("");
  const [selection, setSelection] = useState(ownedAllowedNfts[0]);
  const [currentlyMinting, setCurrentlyMinting] = useState(false);
  const [nonUsedNFTs, setNonUsedNFTS] = useState(
    filterNFTS({ cyberDeckNfts: ownedTokens, allowedNfts: ownedAllowedNfts })
  );

  async function mint() {
    if (ownedAllowedNfts.length > 0) {
      setCurrentlyMinting(true);
      mintNFTHandler({
        tokenAddress: selection.address,
        tokenId: selection.tokenId,
      });
      setCurrentlyMinting(false);
    }
  }

  useEffect(() => {
    if (mKey) {
      if (!currentlyMinting) {
        mint();
      }
    }
  }, [mKey]);

  useEffect(() => {
    setNonUsedNFTS(
      filterNFTS({ cyberDeckNfts: ownedTokens, allowedNfts: ownedAllowedNfts })
    );
  }, [ownedTokens, ownedAllowedNfts]);

  return (
    <>
      <WidthContainer>
        <div style={{ textAlign: "left" }}>
          <pre>
            <output>
              <TypeAnimation
                cursor={false}
                sequence={["LFG CyberDeck"]}
                wrapper="h2"
              />
              <TypeAnimation cursor={false} sequence={[account]} wrapper="p" />
              <TypeAnimation cursor={false} sequence={[" "]} wrapper="p" />
              <TypeAnimation
                cursor={false}
                sequence={[
                  500,
                  "Mint your own CyberDeck to gain access to Web3 through your legacy NFT.",
                ]}
                wrapper="p"
              />
              <ComputerModel />
              <TypeAnimation
                cursor={false}
                sequence={[
                  `Press 'M' to Mint a 1,000 ETH CyberDeck for ${selection.name} #${selection.tokenId}`,
                ]}
                wrapper="p"
              />
              <div>{`Valid NFT's (${nonUsedNFTs.length}) - Use W and S to navigate`}</div>

              <VertArrowScrollList
                items={nonUsedNFTs}
                ListItemComponent={ScrollListItem}
                setSelection={setSelection}
              />
            </output>
          </pre>
        </div>
      </WidthContainer>
    </>
  );
}

function SelectionStage({}) {
  return (
    <div>
      <VertArrowScrollList />
    </div>
  );
}
