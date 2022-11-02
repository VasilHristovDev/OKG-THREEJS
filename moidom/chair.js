class Chair {
  colorCushion;
  constructor(colorCushion) {
    this.colorCushion = colorCushion;
  }

  getObject() {
    const seat = new THREE.BoxBufferGeometry(0.4, 0.1, 0.4);
    const leg = new THREE.BoxBufferGeometry(0.05, 0.5,0.05);
    const backLeg = new THREE.BoxBufferGeometry(0.05, 1, 0.05);
    const cushion = new THREE.BoxBufferGeometry(0.36, 0.05, 0.36);
    const bridgeLegs = new THREE.BoxBufferGeometry(0.25, 0.05, 0.05);

    const textureLoader = new THREE.TextureLoader();
    const chairMaterial = new THREE.MeshPhongMaterial({map: textureLoader.load("../materials/wood.jpg")});
    const cushionMaterial = new THREE.MeshPhongMaterial({map: textureLoader.load("../materials/blanket.jpg"), color: this.colorCushion});

    const seatObj = new THREE.Mesh(seat, chairMaterial);
    const frontLeftLeg = new THREE.Mesh(leg, chairMaterial);
    const frontRightLeg = new THREE.Mesh(leg, chairMaterial);
    const backLeftLeg = new THREE.Mesh(backLeg, chairMaterial);
    const backRightLeg = new THREE.Mesh(backLeg, chairMaterial);
    const leg1Bridge = new THREE.Mesh(bridgeLegs, chairMaterial);
    const leg2Bridge = new THREE.Mesh(bridgeLegs, chairMaterial);
    const cushionObj = new THREE.Mesh(cushion, cushionMaterial);

    frontLeftLeg.position.set(-0.15, -0.2, 0.15);
    frontRightLeg.position.set(0.15, -0.2, 0.15);
    backLeftLeg.position.set(0.15, 0.05, -0.15);
    backRightLeg.position.set(-0.15, 0.05, -0.15);
    leg1Bridge.position.set(0, 0.3, -0.15);
    leg2Bridge.position.set(0, 0.5, -0.15);
    cushionObj.position.set(0, 0.05, 0);
    return  new THREE.Group().add(seatObj).add(frontLeftLeg).add(frontRightLeg).add(backRightLeg).add(backLeftLeg).add(cushionObj).add(leg1Bridge).add(leg2Bridge);
  }
}
