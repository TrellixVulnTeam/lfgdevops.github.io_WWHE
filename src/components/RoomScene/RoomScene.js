import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three/src/Three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  useGLTF,
  PresentationControls,
  Environment,
  ContactShadows,
  Html,
} from "@react-three/drei";
import MyApp from "../../App";
import Model from "./Lowpolyroom1";
import StarterScreen from "../StarterScreen";
import useKeyPress from "../useKeyPress";
import { useNavigate } from "react-router-dom";

export default function RoomScene() {
  const navigate = useNavigate();
  const l = useKeyPress("l");
  const f = useKeyPress("f");
  const g = useKeyPress("g");

  useEffect(() => {
    if (l && f && g) {
      navigate("/whitepaper");
    }
  }, [l, f, g]);
  return (
    <Suspense fallback={<div>:)</div>}>
      <Canvas shadows dpr={[4, 3]} camera={{ position: [0, 0, 0], fov: 50 }}>
        <ambientLight intensity={0.5} />

        <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 1500 }}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            shadow-mapSize={[512 * 16, 512 * 16]}
            castShadow
          />
          {/* <Html
            scale={0.0055}
            rotation={[0, 0, 0]}
            position={[-0.085, 0, -0.2]}
            transform
            occlude
          >
            <MyApp />
          </Html> */}
          <Html
            scale={0.009}
            rotation={[0, 0, 0]}
            position={[-0.0695, 0.0375, -0.84]}
            transform
            occlude
          >
            <StarterScreen l={l} f={f} g={g} />
          </Html>
          <Html
            scale={0.0036}
            rotation={[0, -Math.PI / 16, 0]}
            position={[0.114, 0.0115, -0.31]}
            transform
            occlude
          >
            <div style={{}}>
              <iframe
                src="https://opensea.io/explore-collections?tab=top"
                title={"display"}
                height={1000}
                width={1000}
              ></iframe>
            </div>
          </Html>
          <Model position={[0.25, -0.6, 0]} castShadow={true} />
          {/* <Watch rotation={[0, 0, 0]} position={[0.1, -0.2, 0]} scale={0.003} /> */}
        </PresentationControls>
        <ContactShadows
          rotation-x={Math.PI / 2}
          position={[0, -1.4, 0]}
          opacity={0.75}
          width={10}
          height={10}
          blur={2.6}
          far={2}
        />
        <Environment preset="city" />
      </Canvas>
    </Suspense>
  );
}

function Watch(props) {
  const ref = useRef();
  const { scene } = useLoader(
    GLTFLoader,
    "https://collectees.mypinata.cloud/ipfs/QmPj7tZRQrkbAish8c89hUYfXMzFWv33aguz3tuVWHhSLT/lowpolyroom1.glb"
  );
  // const { nodes, materials, scene } = useGLTF(
  //   "https://collectees.mypinata.cloud/ipfs/QmdSrNvEvJ3aaqidmJsgerMZNfDwXH4PazqicSvANXriSS/computer.glb"
  // );
  useFrame((state) => {
    // const t = state.clock.getElapsedTime();
    // ref.current.rotation.x = +Math.cos(t / 4) / 8;
    // ref.current.rotation.y = Math.PI * 0.91 + Math.sin(t / 4) / 8;
    // ref.current.rotation.z = (1 + Math.sin(t / 1.5)) / 20;
    // ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
  });
  // console.log("NODES: ", nodes);
  // console.log("Materials: ", materials);

  return (
    <group ref={ref} {...props} dispose={null}>
      {/* <mesh
        geometry={nodes.Scene.children[0]}
        material={materials.glass}
      >
        <Html
          scale={100}
          rotation={[Math.PI / 2, 0, 0]}
          position={[180, -350, 50]}
          transform
          occlude
        >
          <div className="annotation">
            6.550 $ <span style={{ fontSize: "1.5em" }}>🥲</span>
          </div>
        </Html>
      </mesh> */}
      <primitive object={scene} scale={120} castShadow position={[0, -0, -0]}>
        <Html
          scale={0.0055}
          rotation={[0, Math.PI, 0]}
          position={[-0.085, 0.25, -0.02]}
          transform
          occlude
        >
          <MyApp />
        </Html>
      </primitive>
      {/* <mesh
        castShadow
        receiveShadow
        geometry={nodes.Scene.children[0].geometry}
        material={materials.watch}
      /> */}
    </group>
  );
}
