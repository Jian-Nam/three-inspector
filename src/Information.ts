import { Object3D } from "three";
import GUI from "lil-gui";

class Information {
  public container: HTMLElement;
  private root: GUI;
  private currentFolder: GUI | null = null;

  constructor() {
    this.container = document.createElement("div");
    this.container.style.position = "absolute";
    this.container.style.right = "0";
    document.body.appendChild(this.container);

    this.root = new GUI({
      title: "Information",
      container: this.container,
    });
  }
  update(object: Object3D) {
    this.clear();
    this.currentFolder = this.root.addFolder(`${object.name || object.uuid}`);
    this.addObjectFieldControls(object, this.currentFolder);
  }

  addObjectFieldControls(object: Record<string, any>, folder: GUI) {
    const fields = Object.keys(object) as (keyof object)[];

    fields.forEach((field) => {
      const target = object[field];
      if (target === null || target === undefined) return;
      if (target instanceof Object3D) {
        const props = !!target.name ? "name" : "uuid";
        folder.add(target, props).name(field).disable();
        return;
      }
      if (typeof target === "object" && target !== null) {
        const newFolder = folder.addFolder(field);
        this.addObjectFieldControls(target, newFolder);
        newFolder.close();
        return;
      }
      folder?.add(object, field).listen().disable();
    });
  }

  clear() {
    this.currentFolder?.destroy();
  }
}

export default new Information();
