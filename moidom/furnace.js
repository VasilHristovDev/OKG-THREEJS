class Furnace {
  width;
  height;
  depth;
  levels;
  constructor(width, height, depth, levels) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.levels = levels;
  }

  getObject() {
    const heightLongSide = this.height - 2*this.height/5;
    const widthLongSide = this.width/8;
    const heightShortSide = this.height/5;
    const widthShortSide = this.width;
    const heightInside = this.height - heightShortSide*2;

    const widthGeometry = new THREE.BoxBufferGeometry(widthShortSide, heightShortSide, this.depth);
    const heightGeometry = new THREE.BoxBufferGeometry(widthLongSide, heightLongSide, this.depth);
    const visibleGeometry = new THREE.BoxBufferGeometry(this.width - 2 * widthLongSide, heightLongSide, 0.01);
    const back = new THREE.BoxBufferGeometry(this.width, this.height + 0.1, 0.05);

    const textureLoader = new THREE.TextureLoader();
    const furnaceMaterial = new THREE.MeshPhongMaterial({color: 0x333333});
    const sidesMaterial = new THREE.MeshPhongMaterial({color: 0xC0C0C0, shininess: 100, specular: 0xffffff});
    const glassMaterial = new THREE.MeshPhongMaterial({color: 0xC7E3E1, shininess: 100, specular: 'cyan', transparent: true, opacity: 0.2})

    const topObj = new THREE.Mesh(widthGeometry, furnaceMaterial);
    const bottomObj = topObj.clone();
    const leftObj = new THREE.Mesh(heightGeometry, sidesMaterial);
    const rightObj = leftObj.clone();
    const glassObj = new THREE.Mesh(visibleGeometry, glassMaterial);
    const backObj = new THREE.Mesh(back, furnaceMaterial);

    topObj.position.set(0, this.height/2 - heightShortSide/2, 0);
    bottomObj.position.set(0, -this.height/2 + heightShortSide/2, 0);
    leftObj.position.set(-this.width/2 + widthLongSide/2,0,0);
    rightObj.position.set(this.width/2 - widthLongSide/2,0,0);
    backObj.position.set(0,0.1,-this.depth/2 + 0.05);
    glassObj.position.set(0,0, this.depth/2);

    topObj.castShadow = true;
    topObj.receiveShadow = true;
    bottomObj.receiveShadow = true;
    bottomObj.castShadow = true;
    leftObj.receiveShadow = true;
    leftObj.castShadow = true;
    rightObj.castShadow = true;
    rightObj.receiveShadow = true;
    backObj.castShadow = true;
    backObj.receiveShadow = true;
    glassObj.receiveShadow = true;
    glassObj.castShadow = true;


    const furnaceGroup = new THREE.Group()
      .add(topObj)
      .add(bottomObj)
      .add(leftObj)
      .add(rightObj)
      .add(backObj)
      .add(glassObj);

    for (let i = 0; i < 2; i++) {
      const sheet = new FurnaceSheet(this.width - 2*widthLongSide, this.depth, 6,6).getObject();
      sheet.position.set(0, this.height/2 - (heightInside/2) * (i + 1), 0);
      furnaceGroup.add(sheet);
    }

    return furnaceGroup;
  }
}
