import topLeftTile from "../b-top-left-tile.png";
import topRightTile from "../b-top-right-tile.png";
import bottomLeftTile from "../b-bottom-left-tile.png";
import bottomRightTile from "../b-bottom-right-tile.png";
import leftTile from "../b-left-tile.png";
import rightTile from "../b-right-tile.png";

export default function Panel({ children }) {
  return (
    <div style={{ width: "500px" }}>
      <TopPanel />
      <div style={{ display: "flex", backgroundColor: "#6e3f31" }}>
        <LeftPannel />
        <div style={{ width: "100%" }}>{children}</div>
        <RightPannel />
      </div>

      <BottomPanel />
    </div>
  );
}

function TopPanel() {
  return (
    <div style={{ display: "flex" }}>
      <div>
        <img src={topLeftTile} alt="top-left-corner" />
      </div>
      <div className="b-top-tile" style={{ width: "100%" }}></div>
      <div>
        <img src={topRightTile} alt="top-right-corner" />
      </div>
    </div>
  );
}

function BottomPanel() {
  return (
    <div style={{ display: "flex" }}>
      <div>
        <img src={bottomLeftTile} alt="bottom-left-corner" />
      </div>
      <div className="b-bottom-tile" style={{ width: "100%" }}></div>
      <div>
        <img src={bottomRightTile} alt="bottom-right-corner" />
      </div>
    </div>
  );
}

function LeftPannel() {
  return <img className="b-left-tile" src={leftTile} />;
}

function RightPannel() {
  return <img className="b-right-tile" src={rightTile} />;
}
