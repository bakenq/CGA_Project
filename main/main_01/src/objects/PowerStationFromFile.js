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

        this.gltfLoader.load('src/models/PowerstationAnimationFinal.gltf', function (gltf) {
            gltf.scene.traverse(function (child) {
                if (child.isMesh) {
                    //console.log(child.name);
                    child.parentPowerstation = thisPowerstation;
                    child.receiveShadow = true;
                    child.castShadow = true;

                }
                if (child.name === 'Arm') {
                    document.powerstationFromFile_sound = document.createElement('audio');
                    document.powerstationFromFile_sound.src = 'src/sounds/TurbSound.mp3';
                    document.powerstationFromFile_sound.loop = false;
                    document.powerstationFromFile_sound.volume = 1.0;

                    document.powerstationFromFile_soundReverse = document.createElement('audio');
                    document.powerstationFromFile_soundReverse.src = 'src/sounds/TurbSoundReverse.mp3';
                    document.powerstationFromFile_soundReverse.loop = false;
                    document.powerstationFromFile_soundReverse.volume = 1.0;
                }
            });

            thisPowerstation.animationMixer = new THREE.AnimationMixer(gltf.scene);
            for (let i = 0; i < gltf.animations.length; i++) {
                let action = thisPowerstation.animationMixer.clipAction(gltf.animations[i]);
                if (gltf.animations[i].name === 'RottionBlatL' || gltf.animations[i].name === 'RotationBlatR') {
                    //console.log(gltf.animations[i].name);
                    action.clampWhenFinished = true;
                    action.setLoop(THREE.Loop);
                    thisPowerstation.animations.set(gltf.animations[i].name, action);
                } else {
                    action.clampWhenFinished = true;
                    action.setLoop(THREE.LoopOnce);
                    thisPowerstation.animations.set(gltf.animations[i].name, action);
                }
            }

            gltf.scene.position.set(0, 0, 0);
            thisPowerstation.add(gltf.scene);
            thisPowerstation.loadingDone = true;
            // Hab leider keinen anderen listener type als "finished" gefunden
            thisPowerstation.animationMixer.addEventListener('finished', thisPowerstation.updateFunctionalState.bind(thisPowerstation));

        });
    }

    updateFunctionalState() {
        if (!this.state.ArmUp) {
            document.powerstationFromFile_sound.play();
        } else if (this.state.ArmUp) {
            document.powerstationFromFile_soundReverse.play();
        }
    }

    addPhysics(){
        if (this.loadingDone === false) {
            window.setTimeout(this.addPhysics.bind(this), 100);
        } else {
            // Auch hier: nur die letzte hinzugefügte Physics Box ist an das Modell gebunden
            window.physics.addCylinder(this,3,8, 8, 75, 32,0,37,0,0,0,0,true);
            //window.physics.addBox(this,3,10, 3, 60, 0,24,0,true);
        }
    }
}