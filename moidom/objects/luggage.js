class Luggage {
  width;
  height;
  depth;
  color;
  textureLoader = new THREE.TextureLoader();

  constructor(width, height, depth, color) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.color = color;

    if(this.constructor === Luggage) {
      throw new Error("Luggage is an abstract class and cannot be instantiated");
    }
  }
  getObject() {
    throw new Error("Method getObject() must be implemented!");
  }

}

class LuggageWithWheels extends Luggage {
  handleHeight;
  wheelSets;
  constructor(width, height, depth, color, wheelSets = 1, handleHeight = height/3) {
    super(width, height, depth, color);
    this.handleHeight = handleHeight;
    this.wheelSets = wheelSets;
  }
  getObject() {
    const widthWall = new THREE.BoxBufferGeometry(this.width, this.height, 0.01);
    const heightWall = new THREE.BoxBufferGeometry(0.01, this.height, this.depth/2 - 0.025);
    const depthWall = new THREE.BoxBufferGeometry(this.width, 0.01, this.depth/2 -0.025);

    const zipWidth = new THREE.BoxBufferGeometry(this.width, 0.01, 0.025);
    const zipHeight = new THREE.BoxBufferGeometry(0.01, this.height, 0.025);

    const handleSide = new THREE.BoxBufferGeometry(0.02, this.handleHeight, 0.02);
    const handleMiddle = new THREE.BoxBufferGeometry(this.width/3 + 0.02, 0.02, 0.02);

    const wallMaterial = new THREE.MeshPhongMaterial({color: this.color});
    const zipTexture = this.textureLoader.load("materials/zip.jpg");
    zipTexture.wrapS = THREE.RepeatWrapping;
    zipTexture.wrapT = THREE.RepeatWrapping;
    zipTexture.repeat.set(10,1);

    const zipMaterial = new THREE.MeshPhongMaterial({map: zipTexture});
    const handleMaterial = new THREE.MeshPhongMaterial({color: 0x000000});

    const depthWallTopFront = new THREE.Mesh(depthWall, wallMaterial);
    const depthWallTopBack = depthWallTopFront.clone();
    const depthWallBottomFront = depthWallTopFront.clone();
    const depthWallBottomBack = depthWallTopFront.clone();

    depthWallTopFront.position.set(0, this.height/2, -this.depth/2 + 0.05);
    depthWallTopBack.position.set(0, this.height/2, this.depth/2 - 0.05);
    depthWallBottomFront.position.set(0, -this.height/2, -this.depth/2 + 0.05);
    depthWallBottomBack.position.set(0, -this.height/2, this.depth/2 - 0.05);

    const heightWallLeftFront = new THREE.Mesh(heightWall, wallMaterial);
    const heightWallLeftBack = heightWallLeftFront.clone();
    const heightWallRightFront = heightWallLeftFront.clone();
    const heightWallRightBack = heightWallLeftFront.clone();

    heightWallLeftFront.position.set(-this.width/2, 0, -this.depth/2 +0.05);
    heightWallLeftBack.position.set(-this.width/2, 0, this.depth/2 - 0.05);
    heightWallRightFront.position.set(this.width/2, 0, -this.depth/2 + 0.05);
    heightWallRightBack.position.set(this.width/2, 0, this.depth/2 - 0.05);

    const widthWallFront = new THREE.Mesh(widthWall, wallMaterial);
    const widthWallBack = widthWallFront.clone();

    widthWallBack.position.set(0,0, this.depth/2 - 0.0125);
    widthWallFront.position.set(0,0, -this.depth/2 + 0.0125);

    const zipLeft = new THREE.Mesh(zipHeight, zipMaterial);
    const zipRight = zipLeft.clone();
    const zipTop = new THREE.Mesh(zipWidth, zipMaterial);
    const zipBottom = zipTop.clone();

    zipLeft.position.set(-this.width/2, 0, 0);
    zipRight.position.set(this.width/2, 0, 0);
    zipTop.position.set(0, this.height/2, 0);
    zipBottom.position.set(0, -this.height/2, 0);

    const handleLeft = new THREE.Mesh(handleSide, handleMaterial);
    const handleRight = handleLeft.clone();
    const handleMiddleObj = new THREE.Mesh(handleMiddle, handleMaterial);

    handleLeft.position.set(-this.width/5, this.height/2 + this.handleHeight/2, 0);
    handleRight.position.set(this.width/5, this.height/2 + this.handleHeight/2, 0);
    handleMiddleObj.position.set(0, this.height/2 + this.handleHeight, 0);

    const LuggageGroup = new THREE.Group()
      .add(depthWallTopFront).add(depthWallTopBack)
      .add(depthWallBottomFront).add(depthWallBottomBack)
      .add(heightWallLeftFront).add(heightWallLeftBack)
      .add(heightWallRightFront).add(heightWallRightBack)
      .add(widthWallFront).add(widthWallBack)
      .add(zipLeft).add(zipRight)
      .add(zipTop).add(zipBottom)
      .add(handleLeft).add(handleRight)
      .add(handleMiddleObj);

    for (let i = 0; i < this.wheelSets; i++) {
      const outsideGeometry = new THREE.CylinderBufferGeometry(0.03, 0.03, 0.02, 32, 16);
      const insideGeometry = new THREE.CylinderBufferGeometry(0.01, 0.01, 0.022, 32, 16);

      const singleWheelGroup1 = new THREE.Group()
        .add(new THREE.Mesh(outsideGeometry, handleMaterial))
        .add(new THREE.Mesh(insideGeometry, new THREE.MeshPhongMaterial({color: 0xdffffff})));

      const singleWheelGroup2 = singleWheelGroup1.clone();
      singleWheelGroup1.position.set(-this.width/2 + this.width/4, -this.height/2 - 0.015, Math.pow(-1, i) * this.depth/2);
      singleWheelGroup2.position.set(this.width/2 - this.width/4, -this.height/2 - 0.015, Math.pow(-1, i) * this.depth/2);

      singleWheelGroup2.rotateZ(Math.PI/2);
      singleWheelGroup1.rotateZ(Math.PI/2);
      LuggageGroup
        .add(singleWheelGroup1)
        .add(singleWheelGroup2);
    }
    return LuggageGroup;
  }
}

class Briefcase extends Luggage {
  isOpen;
  constructor(width, height, depth, color, isOpen) {
    super(width, height, depth, color);
    this.isOpen = isOpen;
  }
  getObject() {

  }
}
