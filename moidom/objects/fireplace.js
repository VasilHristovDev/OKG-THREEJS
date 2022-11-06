class Fireplace {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  //TODO: Add bars
  getObject() {
    const foundationHeight = this.height/3;
    const foundationSide = new THREE.BoxBufferGeometry(this.width/6, foundationHeight, this.width);
    const foundationBack = new THREE.BoxBufferGeometry(this.width, foundationHeight, this.width/6);
    const foundationBottom = new THREE.BoxBufferGeometry(this.width - 2* this.width/6, foundationHeight/6, this.width - this.width/6);

    let connector = new THREE.ConeGeometry(this.width * Math.sqrt(2)/2, this.height/3, 4);
    const chimney = new THREE.BoxBufferGeometry(this.width/2, this.height/3 + 0.3, 0.4);

    const textureLoader = new THREE.TextureLoader();
    const brickTexture = textureLoader.load("/materials/fireplace.jpg");
    brickTexture.wrapS = THREE.RepeatWrapping;
    brickTexture.wrapT = THREE.RepeatWrapping;
    brickTexture.repeat.set(1,2);
    const material = new THREE.MeshPhongMaterial({ map: brickTexture});

    const foundationLeft = new THREE.Mesh(foundationSide, material);
    const foundationRight = new THREE.Mesh(foundationSide, material);
    const foundationBackObj = new THREE.Mesh(foundationBack, material);
    const foundationBottomObj = new THREE.Mesh(foundationBottom, material);

    const connectorObj = new THREE.Mesh(connector, material);
    const chimneyObj = new THREE.Mesh(chimney, material);

    foundationLeft.castShadow = true;
    foundationLeft.receiveShadow = true;
    foundationRight.castShadow = true;
    foundationRight.receiveShadow = true;
    foundationBackObj.castShadow = true;
    foundationBackObj.receiveShadow = true;
    foundationBottomObj.castShadow = true;
    foundationBottomObj.receiveShadow = true;

    connectorObj.castShadow = true;
    connectorObj.receiveShadow = true;
    chimneyObj.castShadow = true;
    chimneyObj.receiveShadow = true;

    foundationLeft.position.set(-this.width/2 + this.width/12,-this.height/3,0);
    foundationRight.position.set(this.width/2 - this.width/12,-this.height/3,0);
    foundationBackObj.position.set(0,-this.height/3, this.width/2 - this.width/6);
    foundationBottomObj.position.set(0,-this.height/2 + foundationHeight/12,0);
    chimneyObj.position.set(0,this.height/3- 0.3,0);
    connectorObj.rotateY(Math.PI/4);
    return new THREE.Group()
      .add(foundationLeft)
      .add(foundationRight)
      .add(foundationBackObj)
      .add(foundationBottomObj)
      .add(connectorObj)
      .add(chimneyObj);
  }
}
