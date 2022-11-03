class Fireplace {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  //TODO: Fix materials and make more details
  getObject() {
    const foundation = new THREE.BoxBufferGeometry(this.width, this.height/3, this.width);
    let connector = new THREE.ConeGeometry(this.width * Math.sqrt(2)/2, this.height/3, 4);
    const chimney = new THREE.BoxBufferGeometry(this.width/2, this.height/3 + 0.3, 0.4);

    const textureLoader = new THREE.TextureLoader();
    const material = new THREE.MeshPhongMaterial({map:textureLoader.load("../materials/fireplace.jpg")});;

    const foundationObj = new THREE.Mesh(foundation, material);
    const connectorObj = new THREE.Mesh(connector, material);
    const chimneyObj = new THREE.Mesh(chimney, material);

    foundationObj.position.set(0,-this.height/3,0);
    chimneyObj.position.set(0,this.height/3- 0.3,0);
    connectorObj.rotateY(Math.PI/4);
    return new THREE.Group().add(foundationObj).add(connectorObj).add(chimneyObj);
  }
}
