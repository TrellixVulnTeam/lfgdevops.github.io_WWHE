import useKeyPress from "./useKeyPress";

export default function StarterScreen() {
  const l = useKeyPress("l");
  const f = useKeyPress("f");
  const g = useKeyPress("g");

  return (
    <div className="starter-screen">
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexFlow: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ fontSize: "188px", textAlign: "center" }}>
          Lost Forgotten Gems
        </div>
        <div style={{ fontSize: "100px", padding: "24px" }}>
          Hold "LFG" to continue
        </div>
        <div
          style={{
            fontSize: "100px",
            display: "flex",
            justifyContent: "space-around",
            // textDecoration: "underline",
            width: "30%",
          }}
        >
          <div>{l ? "L" : "_"}</div>
          <div>{f ? "F" : "_"}</div>
          <div>{g ? "G" : "_"}</div>
        </div>
      </div>
    </div>
  );
}
