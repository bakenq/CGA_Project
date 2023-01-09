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

    addPhysics(){
        window.physics.addCylinder(this,3,8, 8, 70, 32,0,35,-1,0,85,0,true);
        window.physics.addBox(this,3,10, 3, 60, 0,24,0,true);
    }
}