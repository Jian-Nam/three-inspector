import SceneDebugger from "../index.esm.js";
import * as THREE from "three";
import GUI from "lil-gui";

// 전역 객체 THREE와 GUI 사용 (CDN에서 로드)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material1 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const material2 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const material3 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const cube1 = new THREE.Mesh(geometry, material1);
const cube2 = new THREE.Mesh(geometry, material2);
const cube3 = new THREE.Mesh(geometry, material3);
cube1.name = "red cube";
cube2.name = "green cube";
cube3.name = "blue cube";

cube2.position.x = 2;
cube3.position.y = 1.5;

scene.add(cube1);
scene.add(cube2);
cube2.add(cube3);

// SceneDebugger 실행
const debuggerInstance = new SceneDebugger(scene);

function animate() {
  requestAnimationFrame(animate);
  cube1.rotation.x += 0.01;
  cube1.rotation.y += 0.01;

  cube2.rotation.x += 0.01;
  cube2.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// 2초 후 객체 추가
setTimeout(() => {
  const sphere1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  );

  const sphere2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  );

  sphere1.position.y = 1.5;
  sphere2.position.y = 3;
  cube1.add(sphere1);
  cube2.add(sphere2);
}, 2000);
