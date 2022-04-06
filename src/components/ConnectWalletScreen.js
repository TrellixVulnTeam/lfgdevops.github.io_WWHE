import { useContext, useEffect } from "react";
import { Web3Context } from "../contexts/Web3Context";
import TypeAnimation from "react-type-animation";
import { WidthContainer } from "./WidthContainer";
import useKeyPress from "./useKeyPress";

export default function ConnectWalletScreen() {
  const keyPress = useKeyPress("l");
  const { account, setAccount, web3Handler } = useContext(Web3Context);
  useEffect(() => {
    if (keyPress) {
      console.log("hi");
      web3Handler();
    }
  }, [keyPress]);
  return (
    <WidthContainer>
      <div style={{ textAlign: "left" }}>
        {/* <input type="text" onkeypress={web3Handler} /> */}
        <pre>
          <output>
            <TypeAnimation
              cursor={false}
              sequence={["LFG CyberDeck"]}
              wrapper="h1"
            />
            <TypeAnimation
              cursor={true}
              sequence={["Press 'L' to connect wallet"]}
              wrapper="h2"
            />
          </output>
        </pre>
      </div>
    </WidthContainer>
  );
}
