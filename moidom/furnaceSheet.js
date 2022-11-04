class FurnaceSheet {
  width;
  depth;
  numWidth;
  numDepth;

  constructor(width, depth, numWidth, numDepth) {
    this.width = width;
    this.depth = depth;
    this.numWidth = numWidth;
    this.numDepth = numDepth;
  }

  getObject() {
    const widthSide = new THREE.BoxBufferGeometry(this.width, 0.005, 0.005);
    const depthSide = new THREE.BoxBufferGeometry(0.005, 0.005, this.depth);

    const sheetMaterial = new THREE.MeshPhongMaterial({color: 0x111111});
    const sheetsGroup = new THREE.Group();

    const frameLeft = new THREE.Mesh(depthSide, sheetMaterial);
    const frameRight = frameLeft.clone();
    const frameBack = new THREE.Mesh(widthSide, sheetMaterial);
    const frameFront = frameBack.clone();

    for (let i = 0; i < this.numWidth; i++) {
     const obj = frameFront.clone();
     obj.position.set(0, 0, this.depth/2 - (this.depth/this.numDepth) * (i + 1) - (this.depth/this.numDepth)/2 + 0.05);
     obj.castShadow = true;
     obj.receiveShadow = true;
     sheetsGroup.add(obj);
    }

    for (let i = 0; i < this.numDepth; i++) {
      const obj = frameLeft.clone();
      obj.position.set(-this.width/2 + (this.width/this.numWidth) * (i + 1) + (this.width/this.numWidth)/2 - 0.05, 0,0 );
      obj.castShadow = true;
      obj.receiveShadow = true;
      sheetsGroup.add(obj);
    }
    frameBack.position.set(0,0,-this.depth/2);
    frameFront.position.set(0,0, this.depth/2);
    frameLeft.position.set(-this.width/2,0,0);
    frameRight.position.set(this.width/2,0,0);

    frameLeft.castShadow = true;
    frameLeft.receiveShadow = true;
    frameBack.receiveShadow = true;
    frameBack.castShadow = true;
    frameFront.receiveShadow = true;
    frameFront.castShadow = true;
    frameRight.castShadow = true;
    frameRight.receiveShadow = true;

    return sheetsGroup
      .add(frameLeft)
      .add(frameRight)
      .add(frameFront)
      .add(frameBack);
  }
}
