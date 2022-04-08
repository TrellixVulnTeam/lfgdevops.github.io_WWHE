import GLBModelViewer from "./GLBModelViewer";

// const shirtUrl =
//   "https://collectees.mypinata.cloud/ipfs/QmXgXhtRRDRJXfcYRaR6zYdF2sgmHY7ZtTKWndjFoXnmeN/cream-glb.glb";

// const shirtUrl = "../../assets/computer.glb";

const shirtUrl =
  "https://collectees.mypinata.cloud/ipfs/QmdSrNvEvJ3aaqidmJsgerMZNfDwXH4PazqicSvANXriSS/computer.glb";

export default function RoomScene() {
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <div id={"room-scene"}></div>
      <GLBModelViewer
        glbUrl={shirtUrl}
        size={300}
        localScale={10}
        id={"room-scene"}
        clearColor={"#000000"}
        isWireframe={true}
        hasShadow={false}
      />
    </div>
  );
}
