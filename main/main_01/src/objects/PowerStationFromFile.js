import * as THREE from 'three';
import {GLTFLoader} from 'gltfloader';

export default class PowerStationFromFile extends THREE.Group {

    constructor() {
        super();
        this.gltfLoader = new GLTFLoader();
        this.load(this);
    }

    load(thisPowerstation) {

        this.gltfLoader.load('src/models/powerstation.gltf', function (gltf) {
            gltf.scene.traverse(function (child) {
                if (child.isMesh) {
                    //console.log(child.name);
                    child.receiveShadow = true;
                    child.castShadow = true;
                }
            });
            //PowerStationFromFile.add(gltf.scene);
            gltf.scene.position.set(0, 0, 0);
            thisPowerstation.add(gltf.scene);
            thisPowerstation.loadingDone = true;
        });
    }
}