class Drawer {
  width;
  height;
  depth;

  constructor(width, height, depth) {
    this.width = width;
    this.height = height;
    this.depth = depth;
  }

  getObject() {
    const foundation = new THREE.BoxBufferGeometry(this.width -0.05 , 0.01, this.depth - 0.05);
    const frontElement = new THREE.BoxBufferGeometry(this.width - 0.05 , this.height , 0.01);
    const backElement = new THREE.BoxBufferGeometry(this.width - 0.02, this.height - 0.02, 0.01);
    const sideElement = new THREE.BoxBufferGeometry(0.01, this.height - 0.02, this.depth);
    const handle = new THREE.TorusBufferGeometry(0.01, 0.03, 6, 6, 6);

    const textureLoader = new THREE.TextureLoader();
    const whiteWoodMaterial = new THREE.MeshPhongMaterial({map: textureLoader.load("/materials/white-wood.jpg")});
    const handleMaterial = new THREE.MeshPhongMaterial({
      color: 0x000000,
      map: textureLoader.load("/materials/dark-wood.jpg")
    });

    const foundationObj = new THREE.Mesh(foundation, whiteWoodMaterial);
    const sideLeft = new THREE.Mesh(sideElement, whiteWoodMaterial);
    const sideRight = sideLeft.clone();
    const front = new THREE.Mesh(frontElement, whiteWoodMaterial);
    const back = new THREE.Mesh(backElement, whiteWoodMaterial);
    const handleObj = new THREE.Mesh(handle, handleMaterial);

    sideLeft.position.set(-this.width/2 + 0.05, 0, 0);
    sideRight.position.set(this.width/2 - 0.05, 0, 0);
    back.position.set(0, 0, this.depth/2 );
    front.position.set(0, 0, -this.depth/2 );
    handleObj.position.set(0, 0, -this.depth/2 );

    sideLeft.castShadow = true;
    sideLeft.receiveShadow = true;
    sideRight.castShadow = true;
    sideRight.receiveShadow = true;
    back.castShadow = true;
    back.receiveShadow = true;
    front.castShadow = true;
    front.receiveShadow = true;
    handleObj.castShadow = true;
    handleObj.receiveShadow = true;
    
    return new THREE.Group()
      .add(foundationObj)
      .add(sideRight)
      .add(sideLeft)
      .add(front)
      .add(back)
      .add(handleObj);
  }
}
