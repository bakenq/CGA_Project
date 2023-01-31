import * as THREE from 'three';

export default class Background extends THREE.Group {

    constructor() {
        super();

        const backgroundGeometry = new THREE.PlaneGeometry(400, 200);
        const backgroundMaterial = new THREE.MeshStandardMaterial({color: 0xffffff, roughness: 0.3});

        const backgroundTexture = new THREE.TextureLoader().load('src/images/background2.jpg');
        //backgroundTexture.repeat.set(4, 4);
        backgroundTexture.wrapS = THREE.RepeatWrapping;
        backgroundTexture.wrapT = THREE.RepeatWrapping;
        backgroundMaterial.map = backgroundTexture;

        const background = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
        background.rotation.set(0,THREE.MathUtils.degToRad(-90), 0);
       // background.receiveShadow = true;
        this.add(background);
    }
}