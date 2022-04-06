import { Center, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Panel from "../components/Panel";
import { SunkenInput, SunkenTextArea } from "../components/SunkenInput";
import { WidthContainer } from "../components/WidthContainer";
import TypeAnimation from "react-type-animation";
import useKeyPress from "../components/useKeyPress";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const mKey = useKeyPress("m");
  const tKey = useKeyPress("t");
  const [tweetMessage, setTweetMessage] = useState("");

  useEffect(() => {
    if (mKey) {
      navigate("/mint");
    }
  }, [mKey]);

  useEffect(() => {
    if (tKey) {
      navigate("/tweet");
    }
  }, [tKey]);

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
              <TypeAnimation
                cursor={false}
                sequence={[500, "Commands: "]}
                wrapper="p"
              />
              <TypeAnimation
                cursor={false}
                sequence={[1000, "Press 'M' to Mint a CyberDeck"]}
                wrapper="p"
              />
              <TypeAnimation
                cursor={true}
                sequence={[2000, "Press 'T' to Tweet from PrimevalDao"]}
                wrapper="p"
              />
            </output>
          </pre>
        </div>
      </WidthContainer>
    </>
  );
}
