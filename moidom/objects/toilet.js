class Toilet {
  static getObject() {
    const foundation = new THREE.BoxBufferGeometry(0.3, 0.5, 0.5);
    const seatFoundation = new THREE.BoxBufferGeometry(0.5, 0.2, 0.5);
    const seat = new THREE.BoxBufferGeometry(0.5, 0.15, 0.5);
    const upper = new THREE.BoxBufferGeometry(0.5, 0.5, 0.15);

    const height = 0.95;
    const depth = 0.6;
    const textureLoader = new THREE.TextureLoader();
    const fayansMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      map: textureLoader.load("https://gruppoconcorde-cdn.thron.com/delivery/public/image/gruppoconcorde/ec3a471e-2a39-4bc4-bea1-6b005c49b7af/sccw3m/std/409x0/AtlasConcorde_BoostNatural_Kaolin_50x120_Matte_A64V_3DTexture.jpg?format=WEBP&")
    });

    const foundationObj = new THREE.Mesh(foundation, fayansMaterial);
    const seatFoundationObj = new THREE.Mesh(seatFoundation, fayansMaterial);
    const seatObj = new THREE.Mesh(seat, fayansMaterial);
    const upperObj = new THREE.Mesh(upper, fayansMaterial);

    foundationObj.position.set(0, -height/2,0);
    seatFoundationObj.position.set(0, -height/2 + 0.3, 0);
    seatObj.position.set(0,-height/2 + 0.35, -0.2);
    upperObj.position.set(0, height/2 - 0.4, depth/2 - 0.1);

    foundationObj.receiveShadow = true;
    foundationObj.castShadow = true;
    seatFoundationObj.receiveShadow = true;
    seatFoundationObj.castShadow = true;
    seatObj.receiveShadow = true;
    seatObj.castShadow = true;
    upperObj.receiveShadow = true;
    upperObj.castShadow = true;

    return new THREE.Group()
      .add(foundationObj)
      .add(seatFoundationObj)
      .add(seatObj)
      .add(upperObj);

  }
}
