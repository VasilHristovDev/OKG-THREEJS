class Flooring {
  width;
  height;
  depth;
  image;

  constructor(width, height, depth, image) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.image = image;
  }
  getObject() {
    const flooring = new THREE.BoxBufferGeometry(this.width, this.height, this.depth);

    const textureLoader = new THREE.TextureLoader();
    const flooringTexture = textureLoader.load(this.image);
    flooringTexture.wrapS = THREE.RepeatWrapping;
    flooringTexture.wrapT = THREE.RepeatWrapping;
    flooringTexture.repeat.set(3,4);
    const flooringMaterial = new THREE.MeshPhongMaterial({map: flooringTexture});

    const flooringObj = new THREE.Mesh(flooring, flooringMaterial);
    flooringObj.castShadow = true;
    flooringObj.receiveShadow = true;

    return flooringObj;
  }
}
