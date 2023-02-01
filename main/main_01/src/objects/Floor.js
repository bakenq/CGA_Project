import * as THREE from 'three';

export default class Floor extends THREE.Group {

  constructor() {
    super();

    const floorGeometry = new THREE.PlaneGeometry(400, 400);
    const floorMaterial = new THREE.MeshStandardMaterial({color: 0xffffff, roughness: 0.3});

    const floorTexture = new THREE.TextureLoader().load('src/images/SeamlessWater.png');
    floorTexture.repeat.set(4, 4);
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorMaterial.map = floorTexture;

    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.set(THREE.MathUtils.degToRad(-90), 0, 0);
    floor.receiveShadow = true;
    this.add(floor);
  }

  addSound() {
    const sound = new THREE.PositionalAudio(window.audioListener);
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load('src/sounds/ocean.wav', function (buffer) {
      sound.setBuffer(buffer);
      sound.setRefDistance(30);
      sound.setVolume(0.4);
      sound.setLoop(true);
      sound.play();
    });
    this.add(sound);
  }
}