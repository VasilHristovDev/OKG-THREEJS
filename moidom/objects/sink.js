class Sink {
  width;
  height;
  depth;

  constructor(width, height, depth) {
    this.width = width;
    this.height = height;
    this.depth = depth;
  }

  getObject() {
    const pathTube = new THREE.CurvePath();
    pathTube.curves.push(new THREE.Curve());
    const sinkFoundation = new THREE.SphereBufferGeometry(0.2, 64, 32, 0, 6.28, 1.64619455048105, 1.80327418316054);

    const textureLoader = new THREE.TextureLoader();
    const kaolin = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      map: textureLoader.load("https://gruppoconcorde-cdn.thron.com/delivery/public/image/gruppoconcorde/ec3a471e-2a39-4bc4-bea1-6b005c49b7af/sccw3m/std/409x0/AtlasConcorde_BoostNatural_Kaolin_50x120_Matte_A64V_3DTexture.jpg?format=WEBP&")
    })
    kaolin.side = THREE.DoubleSide;
    const sinkObj = new THREE.Mesh(sinkFoundation, kaolin);
    sinkObj.position.set(0, this.height / 2 + 0.2, 0);
    const tubeMaterial = new THREE.MeshPhongMaterial({color: 0x333333})
    const cylinderFoundation = new THREE.CylinderBufferGeometry(0.03, 0.03, 0.25);
    const smallerCylinder = new THREE.CylinderBufferGeometry(0.01, 0.01, 0.1);

    const smallerCylinderObj  = new THREE.Mesh(smallerCylinder, tubeMaterial);
    const foundationObj = new THREE.Mesh(cylinderFoundation, tubeMaterial);

    foundationObj.position.set(-0.2,this.height/2 + 0.125, 0.15);
    smallerCylinderObj.position.set(-0.15,this.height/2 + 0.2, 0.1);
    smallerCylinderObj.rotateX(Math.PI /2);
    smallerCylinderObj.rotateZ(Math.PI /4);


    return new THREE.Group()
      .add(sinkObj)
      .add(new Cupboard(this.width, this.height, this.depth, 1, 2, true).getObject())
      .add(foundationObj)
      .add(smallerCylinderObj);
  }
}
