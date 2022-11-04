class Desk {
  width;
  depth;
  numberDrawers;

  constructor(width, depth, numberDrawers) {
    this.width = width;
    this.depth = depth;
    this.numberDrawers = numberDrawers;
  }

  getObject() {
    const foundation = new THREE.BoxBufferGeometry(this.width, 0.03, this.depth);
    const sideShort = new THREE.BoxBufferGeometry(0.03, 0.7, this.depth);
    const sideLong = new THREE.BoxBufferGeometry(this.width, 0.7, 0.03);

    const textureLoader = new THREE.TextureLoader();
    const deskMaterial = new THREE.MeshPhongMaterial({map: textureLoader.load("/materials/dark-wood.jpg")});

    const foundationObj = new THREE.Mesh(foundation, deskMaterial);
    const sideShortLeft = new THREE.Mesh(sideShort, deskMaterial);
    const sideShortRight = sideShortLeft.clone();
    const insideShort = sideShortLeft.clone();
    const sideLongObj = new THREE.Mesh(sideLong, deskMaterial);

    sideShortLeft.position.set(-this.width/2 + 0.03, -0.35,0);
    sideShortRight.position.set(this.width/2 - 0.03, -0.35,0);
    sideLongObj.position.set(0, -0.35,this.depth/2 - 0.03);
    insideShort.position.set((-this.width/2)+(this.width/3 * 2) - 0.1, -0.35,0);

    const deskGroup = new THREE.Group()
      .add(foundationObj)
      .add(sideShortRight)
      .add(sideShortLeft)
      .add(insideShort)
      .add(sideLongObj);

    for (let i = 0; i < this.numberDrawers; i++) {
      const drawer = new Drawer(this.width/3, 0.8/this.numberDrawers, this.depth);
      const drawerObj = drawer.getObject();
      drawerObj.position.set((this.width/3) - 0.05, (-0.5/this.numberDrawers) * (i + 1), -0.05);
      deskGroup.add(drawerObj);
    }
    return deskGroup;
  }
}
