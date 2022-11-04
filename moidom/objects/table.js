class Table {
  width;
  color;
  depth;
  hasCloth;

  constructor(width, depth, hasCloth = true, color = 0xffffff) {
    this.width = width;
    this.depth = depth;
    this.color = color;
    this.hasCloth = hasCloth;
  }

  getObject() {
    const foundation = new THREE.BoxBufferGeometry(this.width, 0.05, this.depth);
    const leg = new THREE.BoxBufferGeometry(0.05, 0.7, 0.05);
    const tableCloth = new THREE.BoxBufferGeometry(this.width, 0.001, this.depth);
    const tableClothSideLong = new THREE.BoxBufferGeometry(this.width, 0.2, 0.001);
    const tableClothSideShort = new THREE.BoxBufferGeometry(0.001, 0.2, this.depth);

    const textureLoader = new THREE.TextureLoader();
    const woodMaterial = new THREE.MeshPhongMaterial({map: textureLoader.load("/materials/wood.jpg")});

    const foundationObj = new THREE.Mesh(foundation, woodMaterial);
    const bottomLeftLeg = new THREE.Mesh(leg, woodMaterial);
    const bottomRightLeg = new THREE.Mesh(leg, woodMaterial);
    const topLeftLeg = new THREE.Mesh(leg, woodMaterial);
    const topRightLeg = new THREE.Mesh(leg, woodMaterial);

    const tableGroup = new THREE.Group();

    if (this.hasCloth) {
      const clothMaterial = new THREE.MeshStandardMaterial({
        color: 0xff12412,
        map: textureLoader.load("/materials/blanket.jpg")
      });
      const tableClothObj = new THREE.Mesh(tableCloth, clothMaterial);
      const tableClothRightSideLong = new THREE.Mesh(tableClothSideLong, clothMaterial);
      const tableClothLeftSideLong = new THREE.Mesh(tableClothSideLong, clothMaterial);
      const tableClothTopShort = new THREE.Mesh(tableClothSideShort, clothMaterial);
      const tableClothBottomShort = new THREE.Mesh(tableClothSideShort, clothMaterial);

      tableClothObj.position.set(0, 0.0251, 0);
      tableClothRightSideLong.position.set(0, -0.075, -this.depth / 2);
      tableClothLeftSideLong.position.set(0, -0.075, this.depth / 2);
      tableClothTopShort.position.set(this.width / 2, -0.075, 0);
      tableClothBottomShort.position.set(-this.width / 2, -0.075, 0);

      tableClothObj.castShadow = true;
      tableClothObj.receiveShadow = true;
      tableClothRightSideLong.castShadow = true;
      tableClothRightSideLong.receiveShadow = true;
      tableClothLeftSideLong.castShadow = true;
      tableClothLeftSideLong.receiveShadow = true;
      tableClothTopShort.castShadow = true;
      tableClothTopShort.receiveShadow = true;
      tableClothBottomShort.castShadow = true;
      tableClothBottomShort.receiveShadow = true;

      tableGroup
        .add(tableClothObj)
        .add(tableClothRightSideLong)
        .add(tableClothLeftSideLong)
        .add(tableClothTopShort)
        .add(tableClothBottomShort);
    }

    bottomLeftLeg.position.set(this.width / 2 - 0.05, -0.35, this.depth / 2 - 0.05);
    bottomRightLeg.position.set(this.width / 2 - 0.05, -0.35, -this.depth / 2 + 0.05);
    topLeftLeg.position.set(-this.width / 2 + 0.05, -0.35, this.depth / 2 - 0.05);
    topRightLeg.position.set(-this.width / 2 + 0.05, -0.35, -this.depth / 2 + 0.05);

    bottomLeftLeg.castShadow = true;
    bottomLeftLeg.receiveShadow = true;
    bottomRightLeg.castShadow = true;
    bottomRightLeg.receiveShadow = true;
    topLeftLeg.castShadow = true;
    topLeftLeg.receiveShadow = true;
    topRightLeg.castShadow = true;
    topRightLeg.receiveShadow = true;

    return tableGroup
      .add(foundationObj)
      .add(bottomLeftLeg)
      .add(bottomRightLeg)
      .add(topLeftLeg)
      .add(topRightLeg);
  }
}
