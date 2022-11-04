class Cupboard {
  width;
  height;
  depth;
  heightLevels;
  widthLevels;
  hasDrawers;
  numberOfDrawersPerLevel;
  colorFoundation;
  colorDrawers;

  constructor(width, height, depth, heightLevels, widthLevels,
              hasDrawers = false,
              numberOfDrawersPerLevel = 0,
              colorFoundation = 0xffffff,
              colorDrawers = 0xffffff) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.heightLevels = heightLevels;
    this.widthLevels = widthLevels;
    this.hasDrawers = hasDrawers;
    this.numberOfDrawersPerLevel = numberOfDrawersPerLevel;
    this.colorFoundation = colorFoundation;
    this.colorDrawers = colorDrawers;
  }
  getDrawers() {
    const drawerGroup = new THREE.Group();
    for (let i = 0; i < this.heightLevels; i++) {
      for (let j = 0; j < this.widthLevels; j++) {
        const drawer = new Drawer(
          this.width/this.widthLevels,
          this.height/ this.heightLevels,
          this.depth - 0.1)
          .getObject();

        drawer.position.set(
          this.width/2 - (this.width/this.widthLevels) * (j + 1) + (this.width/this.widthLevels) / 2,
          this.height/2 - (this.height/ this.heightLevels) * (i + 1) + (this.height/ this.heightLevels) /2,
          0);
        drawerGroup.add(drawer);
      }
    }
    console.log(drawerGroup);
    return drawerGroup;
  }

  getObject() {
    const widthPlate = new THREE.BoxBufferGeometry(this.width, 0.03, this.depth);
    const heightPlate = new THREE.BoxBufferGeometry(0.03, this.height, this.depth);

    const textureLoader = new THREE.TextureLoader();
    const woodTexture = textureLoader.load("../materials/dark-wood.jpg");
    const frameMaterial = new THREE.MeshPhongMaterial({color: this.colorFoundation, map: woodTexture});

    const topPlate = new THREE.Mesh(widthPlate, frameMaterial);
    const bottomPlate = topPlate.clone();
    const leftPlate = new THREE.Mesh(heightPlate, frameMaterial);
    const rightPlate = leftPlate.clone();

    const cupboardGroup = new THREE.Group();

    for (let i = 0; i < this.heightLevels - 1; i++) {
      const middleWidthPlate = new THREE.Mesh(widthPlate, frameMaterial);
      middleWidthPlate.position.set(0, (this.height / 2) - (this.height / this.heightLevels) * (i + 1), 0);
      cupboardGroup.add(middleWidthPlate);
    }

    for (let i = 0; i < this.widthLevels - 1; i++) {
      const middleHeightPlate = new THREE.Mesh(heightPlate, frameMaterial);
      middleHeightPlate.position.set((this.width / 2) - (this.width / this.widthLevels) * (i + 1), 0);
      cupboardGroup.add(middleHeightPlate);
    }
    topPlate.position.set(0, this.height / 2, 0);
    bottomPlate.position.set(0, -this.height / 2, 0);
    leftPlate.position.set(-this.width / 2, 0, 0);
    rightPlate.position.set(this.width / 2, 0, 0);
    if(this.hasDrawers) {
      cupboardGroup.add(this.getDrawers());
    }
    return cupboardGroup
      .add(topPlate)
      .add(bottomPlate)
      .add(leftPlate)
      .add(rightPlate);
  }
}
