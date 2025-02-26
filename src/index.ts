import * as THREE from "three";
import hieerarchy from "./Hierarchy.js";

export class SceneDebugger {
  scene: THREE.Scene;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    scene.name = "scene";
    this.updateGUI();
    this.startMonitoring();
  }

  updateGUI() {
    this.clearGUI();
    hieerarchy.updateHierarchy(this.scene);
  }

  clearGUI() {}

  startMonitoring() {
    const originalAdd = THREE.Object3D.prototype.add;
    const originalRemove = THREE.Object3D.prototype.remove;

    const updateGUI = this.updateGUI.bind(this);

    THREE.Object3D.prototype.add = function (...objects) {
      const result = originalAdd.apply(this, objects);
      updateGUI();
      return result;
    };

    THREE.Object3D.prototype.remove = (...objects) => {
      const result = originalRemove.apply(this, objects);
      this.updateGUI();
      return result;
    };
  }

  destroy() {}
}

export default SceneDebugger;
