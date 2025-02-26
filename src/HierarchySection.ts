import GUI from "lil-gui";
import { Object3D } from "three";
import Information from "./Information";

export default class HierarchySection {
  object: Object3D;
  folder: GUI;

  constructor(object: Object3D, parentFolder: GUI) {
    this.object = object;
    this.folder = parentFolder.addFolder(this.getTitleButton());
    this.folder.close();

    const folderDOM = this.folder.domElement.querySelector(
      ".title"
    ) as HTMLElement;
    if (!!folderDOM) folderDOM.style.display = "flex";

    const customButton = this.folder.domElement.querySelector(".cb");
    customButton?.addEventListener("click", (e) => {
      Information.update(this.object);
      e.stopPropagation();
    });
    return this;
  }

  getTitleButton() {
    const buttonStyle = `
        display: inline; 
        vertical-align: middle; 
        text-align: left; 
        background-color: transparent; 
        border: none; height: 100%;
    `;

    return `<button class="cb" style="${buttonStyle}">${
      this.object.name || this.object.uuid
    }</button>`;
  }

  destroy() {
    this.folder.destroy();
  }

  get uuid() {
    return this.object.uuid;
  }
}
