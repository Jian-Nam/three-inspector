import { Object3D, Scene } from "three";
import HierarchySection from "./HierarchySection";
import GUI from "lil-gui";

class Hierarchy {
  private hierarchySections: Map<string, HierarchySection>;
  private rootFolder: GUI;
  public container: HTMLElement;

  constructor() {
    this.hierarchySections = new Map<string, HierarchySection>();
    this.container = document.createElement("div");
    this.container.style.position = "absolute";
    document.body.appendChild(this.container);

    this.rootFolder = new GUI({
      title: "Hierarchy",
      container: this.container,
    });
  }

  public getHierarchyByUuid(uuid: string) {
    return this.hierarchySections.get(uuid);
  }

  public addHierarchySection(hierarchySection: HierarchySection) {
    this.hierarchySections.set(hierarchySection.uuid, hierarchySection);
  }

  public clearHierarchy() {
    this.hierarchySections.forEach((hierarchy) => hierarchy.destroy());
    this.hierarchySections.clear();
  }

  public updateHierarchy(scene: Scene) {
    this.clearHierarchy();
    scene.traverse((obj) => {
      if (obj instanceof Object3D) {
        const parentFolder = this.getParentFolder(obj);
        parentFolder.open();
        const hieerarchySection = new HierarchySection(obj, parentFolder);
        this.addHierarchySection(hieerarchySection);
      }
    });
  }

  public getParentFolder(object: Object3D) {
    const parentHierarchy =
      object.parent && this.getHierarchyByUuid(object.parent?.uuid);

    if (!!parentHierarchy) return parentHierarchy.folder;

    return this.rootFolder;
  }
}

export default new Hierarchy();
