class WindowPanel {
  numberOfPanels;
  widthPanel;
  heightPanel;

  constructor(widthPanel, heightPanel, numberOfPanels) {
    this.widthPanel = widthPanel;
    this.heightPanel = heightPanel;
    this.numberOfPanels = numberOfPanels;
  }

  getObject() {
    const outerFrameTop = new THREE.BoxBufferGeometry(this.widthPanel + 0.1, 0.1, 0.22);
    const outerFrameBottom = new THREE.BoxBufferGeometry(this.widthPanel + 0.1, 0.1, 0.22);
    const outerFrameLeft = new THREE.BoxBufferGeometry(0.1, this.heightPanel, 0.22);
    const outerFrameRight = new THREE.BoxBufferGeometry(0.1, this.heightPanel, 0.22);

    const glass = new THREE.BoxBufferGeometry(this.widthPanel, this.heightPanel, 0.1);

    const glassMaterial = new THREE.MeshPhongMaterial({color: 'cyan', transparent: true, opacity: 0.3});
    const woodTexture = new THREE.TextureLoader();
    const frameMaterial = new THREE.MeshPhongMaterial({
      color: 0xBA7c45,
      transparent: true,
      map: woodTexture.load("/materials/wood.jpg")
    });

    const frameTopObj = new THREE.Mesh(outerFrameTop, frameMaterial);
    const frameBottomObj = new THREE.Mesh(outerFrameBottom, frameMaterial);
    const frameLeftObj = new THREE.Mesh(outerFrameLeft, frameMaterial);
    const frameRightObj = new THREE.Mesh(outerFrameRight, frameMaterial);

    frameTopObj.position.set(0, this.heightPanel / 2, 0);
    frameBottomObj.position.set(0, -this.heightPanel / 2, 0);
    frameLeftObj.position.set(-this.widthPanel / 2, 0, 0);
    frameRightObj.position.set(this.widthPanel / 2, 0, 0);

    const glassObj = new THREE.Mesh(glass, glassMaterial);
    const Group = new THREE.Group().add(frameTopObj).add(frameBottomObj).add(frameLeftObj).add(frameRightObj).add(glassObj);

    for (let i = 0; i < this.numberOfPanels - 1; i++) {
      const helperHorizontal = new THREE.BoxBufferGeometry(0.1, this.heightPanel, 0.22);
      const helperHorizontalObj = new THREE.Mesh(helperHorizontal, frameMaterial);
      helperHorizontalObj.position.set(-this.widthPanel/2 + this.widthPanel/this.numberOfPanels * (i + 1), 0, 0);
      helperHorizontalObj.castShadow = true;
      helperHorizontalObj.receiveShadow = true;
      Group.add(helperHorizontalObj);
    }

    return Group;
  }
}
