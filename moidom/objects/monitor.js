class Monitor {
  inches;
  image;
  isTV;

  constructor(inches, isTV = false, image = "/materials/default-monitor.jpg") {
    this.inches = inches;
    this.isTV = isTV;
    this.image = image;
  }

  getMouse(frameMaterial) {
    const mouse = new THREE.BoxBufferGeometry(0.05, 0.02, 0.1);
    const button = new THREE.BoxBufferGeometry(0.02, 0.01, 0.02);

    const mouseObj = new THREE.Mesh(mouse, frameMaterial);
    const leftButton = new THREE.Mesh(button, new THREE.MeshPhongMaterial({color: 0x777777}));
    const rightButton = leftButton.clone();
    leftButton.position.set(-0.015, 0.01, -0.03);
    rightButton.position.set(0.015, 0.01, -0.03);

    return  new THREE.Group().add(mouseObj).add(leftButton).add(rightButton);
  }

  getKeyboard(frameMaterial) {
    const widthKeyboard = 0.3;
    const heightKeyboard = 0.02;
    const depthKeyboard = 0.1;

    const keysPerRow = 20;
    const keysPerColumn = 5;
    const widthKey = widthKeyboard / keysPerRow - 0.0005;
    const depthKey = depthKeyboard / keysPerColumn - 0.0005;

    const keyboardFoundation = new THREE.BoxBufferGeometry(widthKeyboard, heightKeyboard, depthKeyboard);
    const keyboardObj = new THREE.Mesh(keyboardFoundation, frameMaterial);
    const keyboardGroup = new THREE.Group().add(keyboardObj);

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 20; j++) {
        const color = Math.floor(Math.random()*16777215).toString(16);
        const key = new THREE.BoxBufferGeometry(widthKey, 0.01, depthKey);
        const keyObj = new THREE.Mesh(key, new THREE.MeshPhongMaterial({color: "#"+color}));
        keyObj.position.set(-widthKeyboard/2 + (widthKey * (j + 1)), 0.01, -depthKeyboard/2 + (depthKey * (i + 1)));
        keyboardGroup.add(keyObj);
      }
    }

    return keyboardGroup;
  }

  getObject() {
    const widthGetter = 0.872;
    const heightGetter = 0.49;
    var width = this.inches * widthGetter;
    var height = this.inches * heightGetter;

    const monitorScreen = new THREE.BoxBufferGeometry(width, height, 0.001);
    const monitorBack = new THREE.BoxBufferGeometry(width, height, 0.01);
    const widthFrame = new THREE.BoxBufferGeometry(width, 0.01, 0.01);
    const heightFrame = new THREE.BoxBufferGeometry(0.01, height, 0.01);


    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(this.image);
    const screenMaterial = new THREE.MeshPhongMaterial({map: texture});
    const frameMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      map: textureLoader.load("https://img.freepik.com/premium-photo/texture-black-carbon-fiber_28943-725.jpg")
    });

    const screenObj = new THREE.Mesh(monitorScreen, screenMaterial);
    const backObj = new THREE.Mesh(monitorBack, frameMaterial);
    const topFrame = new THREE.Mesh(widthFrame, frameMaterial);
    const bottomFrame = topFrame.clone();
    const leftFrame = new THREE.Mesh(heightFrame, frameMaterial);
    const rightFrame = leftFrame.clone();

    topFrame.position.set(0, height / 2, 0.01);
    bottomFrame.position.set(0, -height / 2, 0.01);
    leftFrame.position.set(-width / 2, 0, 0.01);
    rightFrame.position.set(width / 2, 0, 0.01);

    backObj.position.set(0, 0, -0.001);
    screenObj.position.set(0, 0, 0.005);

    const monitorGroup = new THREE.Group()
      .add(screenObj)
      .add(topFrame)
      .add(bottomFrame)
      .add(leftFrame)
      .add(rightFrame)
      .add(backObj);

    if (!this.isTV) {
      const foundation = new THREE.BoxBufferGeometry(width / 3, 0.03, width / 3);
      const connector = new THREE.BoxBufferGeometry(width / 5, height / 3, 0.01);
      const foundationObj = new THREE.Mesh(foundation, frameMaterial);
      const connectorObj = new THREE.Mesh(connector, frameMaterial);
      foundationObj.position.set(0, -height / 2 - height / 3, 0);
      connectorObj.position.set(0, -height / 2 - (height / 6), 0);

      const mouseGroup = this.getMouse(frameMaterial);
      mouseGroup.position.set( width/2 + width/3,-height/2 - height/3, width/2);

      const keyboardGroup = this.getKeyboard(frameMaterial);
      keyboardGroup.position.set(-width/2 + width/3, -height/2 - height/3, width/2);

      monitorGroup
        .add(foundationObj)
        .add(connectorObj)
        .add(mouseGroup)
        .add(keyboardGroup);
    } else {
      const leg = new THREE.BoxBufferGeometry(0.1, 0.05, 0.1);
      const leftLeg = new THREE.Mesh(leg, frameMaterial);
      const rightLeg = leftLeg.clone();

      leftLeg.position.set(-width / 2 + width / 4, -height / 2 - 0.025, 0);
      rightLeg.position.set(width / 2 - width / 4, -height / 2 - 0.025, 0);

      monitorGroup
        .add(leftLeg)
        .add(rightLeg);
    }
    return monitorGroup;
  }
}
