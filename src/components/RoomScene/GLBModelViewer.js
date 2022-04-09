import { useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function GLBModelViewer({
  glbUrl,
  size,
  localScale,
  id,
  clearColor,
  isWireframe,
  hasShadow,
}) {
  function setupModel(data) {
    const model = data.scene.children[0];

    return model;
  }

  async function runModel() {
    var scene = new THREE.Scene();

    // Load Camera Perspektive
    var camera = new THREE.PerspectiveCamera(25, 400 / 400, 1, 5000);
    camera.position.set(0.5, 2, 25);

    // Load a Renderer
    var renderer = new THREE.WebGLRenderer({ alpha: true });
    // renderer.setClearColor(clearColor ? clearColor : 0x000000);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(size, size);
    var container = document.getElementById(id);

    container.appendChild(renderer.domElement);

    // Load the Orbitcontroller
    // var controls = new OrbitControls(camera, renderer.domElement);
    // scene.add(new THREE.AxesHelper(500));
    // Load Light
    var hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 4);
    scene.add(hemiLight);
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 2.3;
    renderer.shadowMap.enabled = true;
    // var ambientLight = new THREE.AmbientLight(0xcccccc);
    // scene.add(ambientLight);

    // var directionalLight = new THREE.DirectionalLight(0xffffff);
    // directionalLight.position.set(0, 1, 1).normalize();
    // scene.add(directionalLight);
    let spotlight = new THREE.SpotLight(0xffa95c, 4);
    spotlight.castShadow = true;
    spotlight.shadow.bias = -0.0001;
    spotlight.shadow.mapSize.width = 1024 * 4;
    spotlight.shadow.mapSize.height = 1024 * 4;

    scene.add(spotlight);
    var loader = new GLTFLoader();
    loader.load(glbUrl, function (gltf) {
      var object = gltf.scene;

      gltf.scene.scale.set(localScale, localScale, localScale);
      gltf.scene.position.x = 0; //Position (x = right+ left-)
      gltf.scene.position.y = 0; //Position (y = up+, down-)
      gltf.scene.position.z = 0; //Position (z = front +, back-)
      gltf.scene.rotation.y = 3.14159265358979323846264338327950288419;
      gltf.scene.traverse((n) => {
        if (n.isMesh) {
          if (hasShadow) {
            n.castShadow = true;
            n.receiveShadow = true;
          }
          if (isWireframe) {
            n.material.wireframe = true;
            n.material.color.setHex(0xffffff);
          }
          if (n.material.map) {
            n.material.map.anisotropy = 16;
          }
        }
      });
      // var geo = new THREE.EdgesGeometry(gltf.scene); // or WireframeGeometry( geometry )

      // var mat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });

      // var wireframe = new THREE.LineSegments(geo, mat);

      // scene.add(wireframe);
      scene.add(gltf.scene);
    });

    function animate() {
      render();
      scene.rotation.y += 0.005;
      spotlight.position.set(
        camera.position.x + 10,
        camera.position.y + 10,
        camera.position.z + 10
      );
      requestAnimationFrame(animate);
    }

    function render() {
      renderer.render(scene, camera);
    }

    render();
    animate();
  }

  useEffect(() => {
    runModel();
  }, []);
  return <div />;
}
