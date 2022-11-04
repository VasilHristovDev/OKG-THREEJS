class Painting {
  width;
  height;
  image;
  frameWidth;
  //image accepts path as string to the image to be displayed
  constructor(width, height, frameWidth, image) {
    this.width = width;
    this.height = height;
    this.image = image;
    this.frameWidth = frameWidth;
  }

  getObject() {
    const frameWidth = new THREE.BoxBufferGeometry(this.width, this.frameWidth, this.frameWidth);
    const frameHeight = new THREE.BoxBufferGeometry(this.frameWidth, this.height, this.frameWidth);
    const plate = new THREE.BoxBufferGeometry(this.width, this.height, 0.002);

    const textureLoader = new THREE.TextureLoader();
    const woodMaterial = new THREE.MeshPhongMaterial({color: 0x855E42, map: textureLoader.load("/materials/wood.jpg") });
    const paintingMaterial = new THREE.MeshPhongMaterial({map: textureLoader.load(this.image)});

    const topFrameWidth = new THREE.Mesh(frameWidth, woodMaterial);
    const bottomFrameWidth = new THREE.Mesh(frameWidth, woodMaterial);
    const leftFrameHeight = new THREE.Mesh(frameHeight, woodMaterial);
    const rightFrameHeight = new THREE.Mesh(frameHeight, woodMaterial);
    const painting = new THREE.Mesh(plate, paintingMaterial);

    topFrameWidth.position.set(0, this.height/2, 0.001);
    bottomFrameWidth.position.set(0, -this.height/2, 0.001);
    leftFrameHeight.position.set(-this.width/2,0, 0.001);
    rightFrameHeight.position.set(this.width/2,0, 0.001);

    topFrameWidth.castShadow = true;
    topFrameWidth.receiveShadow = true;
    bottomFrameWidth.castShadow = true;
    bottomFrameWidth.receiveShadow = true;
    leftFrameHeight.castShadow = true;
    leftFrameHeight.receiveShadow = true;
    rightFrameHeight.castShadow = true;
    rightFrameHeight.receiveShadow = true;
    painting.castShadow = true;
    painting.receiveShadow = true;

    return new THREE.Group()
      .add(topFrameWidth)
      .add(bottomFrameWidth)
      .add(leftFrameHeight)
      .add(rightFrameHeight)
      .add(painting);
  }
}
