class Bed {
  width;
  height;
  panels;
  color;
  pillowColor;
  blanketColor;

  constructor(width, height, panels, color, pillowColor, blanketColor) {
    this.width = width;
    this.height = height;
    this.panels = panels;
    this.color = color;
    this.pillowColor = pillowColor;
    this.blanketColor = blanketColor;
  }

  getPillow(geometry, material, index) {
    const pillowObj = new THREE.Mesh(geometry, material);
    pillowObj.rotateX(Math.PI / 2);
    pillowObj.rotateZ(Math.PI / 2);
    pillowObj.position.y = 0.21;
    pillowObj.position.x = this.width / 2 - 0.1;
    pillowObj.position.z = (-this.height / 2 + (this.height / this.panels * (index + 1))) - 0.6;

    return pillowObj;
  }

  getBlanket(geometry, material, index) {
    const blanketObj = new THREE.Mesh(geometry, material);
    blanketObj.position.set(-this.width/2 + 0.3, 0.1, -this.height / 2 + (this.height / this.panels * (index + 1)) - 0.5)
    return blanketObj;
  }


  getObject() {
    const foundation = new THREE.BoxBufferGeometry(this.width, this.height, 0.1);
    const leg = new THREE.BoxBufferGeometry(0.1, 0.2, 0.1);
    const pillow = new THREE.Shape();

    const extrudeSettings = {
      steps: 3,
      depth: 0.1,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.1,
      bevelOffset: 0,
      bevelSegments: 1
    };
    pillow.moveTo(0, 0);
    pillow.lineTo(0, 0.2);
    pillow.lineTo(0.3, 0.2);
    pillow.lineTo(0.3, 0);
    pillow.lineTo(0, 0);

    const texture = new THREE.TextureLoader();
    const foundationMaterial = new THREE.MeshPhongMaterial({
      color: this.color,
      map: texture.load("/materials/bed.jpg")
    });
    const legMaterial = new THREE.MeshPhongMaterial({map: texture.load("/materials/wood.jpg")});
    const pillowGeometry = new THREE.ExtrudeBufferGeometry(pillow, extrudeSettings);
    const pillowMaterial = new THREE.MeshPhongMaterial({color: this.pillowColor, map: texture.load("/materials/pillow.jpg")});

    const blanketGeometry = new THREE.BoxBufferGeometry(0.5, 0.05, 0.7);
    const blanketMaterial = new THREE.MeshPhongMaterial({color: this.blanketColor, map: texture.load("/materials/blanket.jpg")})

    const foundationMattressObj = new THREE.Mesh(foundation, foundationMaterial);
    const foundationWood = new THREE.Mesh(new THREE.BoxBufferGeometry(this.width, this.height, 0.05), legMaterial);

    const legTopLeft = new THREE.Mesh(leg, legMaterial);
    const legTopRight = new THREE.Mesh(leg, legMaterial);
    const legBottomLeft = new THREE.Mesh(leg, legMaterial);
    const legBottomRight = new THREE.Mesh(leg, legMaterial);

    legBottomRight.position.set(this.width / 2 - 0.05, -0.2, this.height / 2 - 0.05);
    legBottomLeft.position.set(-this.width / 2 + 0.05, -0.2, this.height / 2 - 0.05);
    legTopLeft.position.set(-this.width / 2 + 0.05, -0.2, -this.height / 2 + 0.05);
    legTopRight.position.set(this.width / 2 - 0.05, -0.2, -this.height / 2 + 0.05);
    foundationWood.position.y = -0.075;
    foundationMattressObj.rotateX(Math.PI / 2);
    foundationWood.rotateX(Math.PI / 2);

    const bedGroup = new THREE.Group();
    bedGroup.add(foundationMattressObj).add(foundationWood).add(legTopRight).add(legTopLeft).add(legBottomLeft).add(legBottomRight);

    for (let i = 0; i < this.panels; i++) {
      const pillowObj = this.getPillow(pillowGeometry, pillowMaterial, i);
      const blanketObj = this.getBlanket(blanketGeometry, blanketMaterial, i);
      bedGroup.add(pillowObj);
      bedGroup.add(blanketObj);
    }
    return bedGroup;
  }
}
