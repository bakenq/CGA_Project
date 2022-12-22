import * as THREE from 'three';
import * as TWEEN from 'tween';
import CSG from 'csg';

import {GridShader} from '../shaders/GridShader.js';

import {Animation, AnimationType, AnimationAxis} from '../animation/Animation.js';


export default class PowerStation extends THREE.Group {

    constructor() {
        super();

        this.animations = [];
        this.blackTexture = null;
        this.noiseTexture = null;
        this.movieTexture = null;
        this.addParts();
    }

    addParts() {

        // Materials
        const baseMaterial = new THREE.MeshPhongMaterial({
            color: 0x808080,
            flatShading: true,
            specular: 0x111111,
            shininess: 100
        });

        const towerMaterial = new THREE.MeshPhongMaterial({
            color: 0xe5de00,
            flatShading: true,
            specular: 0x111111,
            shininess: 100
        });

        const bladeMaterial = new THREE.MeshPhongMaterial({
            color: 0xd3d3d3,
            flatShading: true,
            specular: 0x111111,
            shininess: 100
        });


        // Geometry

        // Base
        const baseGeometry = new THREE.CylinderGeometry(6, 6, 16, 32);
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.position.set(0, 8, 0);
        base.castShadow = true;
        this.add(base);

        // Tower
        const towerGeometry = new THREE.CylinderGeometry(4, 4, 48, 32);
        const tower = new THREE.Mesh(towerGeometry, towerMaterial);
        tower.position.set(0, 40, 0);
        tower.castShadow = true;
        this.add(tower);

        // Blade Arm
        const armGeometry = new THREE.BoxGeometry(4, 4, 48);
        const arm = new THREE.Mesh(armGeometry, towerMaterial);
        arm.position.set(0 , 24, 0);
        arm.castShadow = true;
        this.add(arm);

        // Blades
        /*
        const bladeGeometry = new THREE.CylinderGeometry(2, 2, 32, 32);
        const blade = new THREE.Mesh(bladeGeometry, bladeMaterial);
        blade.position.set(-4, 24, -22);
        blade.castShadow = true;
        this.add(blade)

        const blade2 = new THREE.Mesh(bladeGeometry, bladeMaterial);
        blade2.position.set(-4, 24, 22);
        blade2.castShadow = true;
        this.add(blade2);

         */



    }
}