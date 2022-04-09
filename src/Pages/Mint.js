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

const c = [
  "Ether Rock 1",
  "Ether Rock 7",
  "Lunar Token 54",
  "Belly Button Lint",
];
export default function Mint() {
  const { mintNFTHandler, ownedAllowedNfts } = useContext(Web3Context);
  const navigate = useNavigate();
  const mKey = useKeyPress("m");
  const { account } = useContext(Web3Context);
  const [tweetMessage, setTweetMessage] = useState("");
  const [selection, setSelection] = useState(c[1]);
  const [currentlyMinting, setCurrentlyMinting] = useState(false);

  async function mint() {
    if (ownedAllowedNfts.length > 0) {
      setCurrentlyMinting(true);
      mintNFTHandler();
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
                  `Press 'M' to Mint a 1,000 ETH CyberDeck for ${selection}`,
                ]}
                wrapper="p"
              />
              <div>{`Valid NFT's (${4}) - Use W and A to navigate`}</div>

              <VertArrowScrollList
                items={c}
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
