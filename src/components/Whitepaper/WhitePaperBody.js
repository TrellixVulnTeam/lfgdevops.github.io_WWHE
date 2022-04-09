import { useEffect, useRef } from "react";
import useKeyPress from "../useKeyPress";
import { WidthContainer } from "../WidthContainer";
import wp from "./Whitepaper.json";
import WhitePaperPoint from "./WhitePaperPoint";
import WhitePaperPre from "./WhitePaperPre";
import WhitePaperSubtitle from "./WhitePaperSubtitle";
import WhitePaperText from "./WhitePaperText";
import WhitePaperTitle from "./WhitePaperTitle";
import ComputerModel from "../RoomScene/ComputerModel";

const o = `              
    *((((((###         
    **(((((((((##       
    *(((((((((((###     
   ,*(((((((((((((###   
   ,(((((((((((((((((   
  ,,((((((((((((((((((( 
 ,,,,(((((((((((((///// 
   ,,((((((((((((((//// 
     ,,(((((((((((///// 
       ,,,,//////////// 
        ,,,,//.../////
`;

const osLogo = `                 
                ///                
         ///////////////////        
      /////////////////////////     
    //////////////@@/////////////   
  //////////////@@@@/////////////// 
 ////////////@@//@@@@@@/////////////
 ///////////@@@@/@@@@@@@////////////
//////////@@@@@//@@@@@@@////////////
.///////////////@@@@@@@//////(//////
 ///////@@@@@@////@@///#@@@@////////
  ///////@@@@@@@@@@@@@@@@@@//////// 
   ///////////////////////////////  
     ///////////////////////////    
       //////////////////////.      
            /////////////           `;

export default function WhitePaperBody({}) {
  const revealDuration = 0.5;
  const duration = 1.5;
  const isPlaying = true;
  const down = useKeyPress("s");
  const up = useKeyPress("w");

  // const myRef = useRef();

  // useEffect(() => {
  //   const node = myRef.current;
  //   const active = document.activeElement;
  //   console.log(active.nextSibling);

  //   if (down && active.nextSibling) {
  //     console.log("down");
  //     active.nextSibling.focus();
  //   }
  //   if (up && active.previousSibling) {
  //     active.previousSibling.focus();
  //   }
  // }, [up, down]);

  return (
    <>
      <WidthContainer>
        <div style={{ height: "20px" }}></div>

        <WhitePaperTitle
          characters={wp["1-title"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperText
          characters={wp["2-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperPre
          characters={o}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <div style={{ height: "20px" }}></div>
        <WhitePaperText
          characters={wp["4-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperSubtitle
          characters={wp["5-title"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperText
          characters={wp["6-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperPre
          characters={osLogo}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperText
          characters={wp["8-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperText
          characters={wp["9-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperText
          characters={wp["10-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperText
          characters={wp["11-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperSubtitle
          characters={wp["12-title"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <ComputerModel />
        <WhitePaperText
          characters={wp["13-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperSubtitle
          characters={wp["14-title"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperText
          characters={wp["15-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperSubtitle
          characters={wp["16-title"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperText
          characters={wp["17-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperPoint
          characters={wp["18-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperPoint
          characters={wp["19-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperPoint
          characters={wp["20-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperPoint
          characters={wp["21-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperText
          characters={wp["22-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperText
          characters={wp["23-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperPoint
          characters={wp["24-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperPoint
          characters={wp["25-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperPoint
          characters={wp["26-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperPoint
          characters={wp["27-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperPoint
          characters={wp["28-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperPoint
          characters={wp["29-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperPoint
          characters={wp["30-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperPoint
          characters={wp["31-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperPoint
          characters={wp["32-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperPoint
          characters={wp["33-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperPoint
          characters={wp["34-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperText
          characters={wp["35-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperText
          characters={wp["36-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperText
          characters={wp["37-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperSubtitle
          characters={wp["38-subtitle"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperText
          characters={wp["39-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperPoint
          characters={wp["40-point"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperPoint
          characters={wp["41-point"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperPoint
          characters={wp["42-point"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperPoint
          characters={wp["43-point"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperPoint
          characters={wp["44-point"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperText
          characters={wp["45-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperText
          characters={wp["46-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperText
          characters={wp["47-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperText
          characters={wp["48-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperSubtitle
          characters={wp["49-title"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperText
          characters={wp["50-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperSubtitle
          characters={wp["51-subtitle"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperText
          characters={wp["53-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperText
          characters={wp["54-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperText
          characters={wp["55-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperText
          characters={wp["56-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperSubtitle
          characters={wp["57-subtitle"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperText
          characters={wp["58-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperText
          characters={wp["59-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperText
          characters={wp["61-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperSubtitle
          characters={wp["66-subtitle"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <WhitePaperText
          characters={wp["67-paragraph"]}
          revealDuration={revealDuration}
          duration={duration}
          isPlaying={isPlaying}
        />
        <div style={{ padding: "84px" }}></div>
      </WidthContainer>
    </>
  );
}
