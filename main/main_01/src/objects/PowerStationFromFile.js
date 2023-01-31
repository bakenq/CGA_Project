import * as THREE from 'three';
import {GLTFLoader} from 'gltfloader';

export default class PowerStationFromFile extends THREE.Group {

    constructor() {
        super();
        this.gltfLoader = new GLTFLoader();
        this.loadingDone = false;
        this.animationMixer = null;
        this.animations = new Map();
        this.state = {
            ArmUp: false,
            ArmDown: false,
            RottionBlatL: false,
            RotationBlatR: false
        };
        this.load(this);
    }

    load(thisPowerstation) {

        this.gltfLoader.load('src/models/PowerstationAnimationFin.gltf', function (gltf) {
            gltf.scene.traverse(function (child) {
                if (child.isMesh) {
                    //console.log(child.name);
                    child.parentPowerstation = thisPowerstation;
                    child.receiveShadow = true;
                    child.castShadow = true;
                }
            });

            thisPowerstation.animationMixer = new THREE.AnimationMixer(gltf.scene);
            for (let i = 0; i < gltf.animations.length; i++){
                let action = thisPowerstation.animationMixer.clipAction(gltf.animations[i]);
                action.clampWhenFinished = true;
                action.setLoop(THREE.LoopOnce);
                thisPowerstation.animations.set(gltf.animations[i].name, action);
                console.log(gltf.animations[i].name);
            }

            //PowerStationFromFile.add(gltf.scene);
            gltf.scene.position.set(0, 0, 0);
            thisPowerstation.add(gltf.scene);
            thisPowerstation.loadingDone = true;
            thisPowerstation.animationMixer.addEventListener('finished', thisPowerstation.updateFunctionalState.bind(thisPowerstation));

        });
    }









    addPhysics(){
        window.physics.addCylinder(this,3,8, 8, 70, 32,0,35,-1,0,85,0,true);
        //window.physics.addBox(this,3,10, 3, 60, 0,24,0,true);
    }
}