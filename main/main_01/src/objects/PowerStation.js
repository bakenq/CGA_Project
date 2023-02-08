import * as THREE from 'three';
import * as TWEEN from 'tween';
import CSG from 'csg';


// Export Variablen

//------------------------Blades----------------------
const bladeMaterial = new THREE.MeshStandardMaterial({
    color: 0xd3d3d3,
    flatShading: false,
    roughness: 0.0,
    metalness: 0.15,
    side: THREE.DoubleSide,
    map: new THREE.TextureLoader().load('src/images/BladeMaterial.jpg')
});


//Blades mit BufferGeoemtry
const positions = [
    1, 1, 0, //0
    0, 0, 3, //1
    1, 20, 2, //2
    0.74, 20, 3, //3

    1, 1, 0, //4
    2, 0, 3, //5
    1, 20, 2, //6
    1.26, 20, 3, //7
];

const indices = [
    2,0,1, //Seite 1 1/2
    1,3,2, //Seite 1 2/2

    6,2,3, //Top 1/2
    3,7,6, //Top 2/2

    6,4,5, //Seite 2 1/2
    5,7,6, //Seite 2 2/2

    4,0,1, //bot 1/2
    1,5,4, //bot 2/2

    3,1,5, //Front 1/2
    5,7,3,  //Front 2/2

    6,4,0, //Back 1/2
    0,2,6  //Back 2/2


];

const bladeGeometry = new THREE.BufferGeometry();
bladeGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
bladeGeometry.setIndex(indices);
bladeGeometry.computeVertexNormals();
const blade = new THREE.Mesh(bladeGeometry, bladeMaterial);
blade.castShadow = true;
blade.receiveShadow = true;
blade.position.set(0,0,0);
blade.name = 'blades';


//Rundung blade
const rundBladeGeometry = new THREE.CylinderGeometry(0.25,1,21.95,25);
const rundBlade = new THREE.Mesh(rundBladeGeometry, bladeMaterial);
rundBlade.position.set(1, 9, 3);
rundBlade.castShadow = true;
rundBlade.receiveShadow = true;
rundBlade.name = 'blades';

//Blade Up Right
const bladeGroupRU = new THREE.Group();
bladeGroupRU.add(rundBlade,blade);
bladeGroupRU.position.set(-2.5, 3, -1.75);
bladeGroupRU.scale.set(0.85, 0.85, 0.85);
bladeGroupRU.rotation.y = 4 / Math.PI;
bladeGroupRU.name = 'bladeGroupRU';
//bladeGroupRU.scale.set(0.6, 0.6, 0.6);
//bladeGroupRU.name = 'blades';

//Blade Down Right
const bladeGroupRD = bladeGroupRU.clone();
//bladeGroupRD.position.set(-9, 21, 25);
bladeGroupRD.position.set(2.5, -3, 0);
bladeGroupRD.rotation.x = Math.PI;
bladeGroupRD.rotation.y = -4 / Math.PI;
bladeGroupRD.name = 'bladeGroupRD';


//Pivot Group for Rotation
const pivotpoint = new THREE.Group();
pivotpoint.add(bladeGroupRD, bladeGroupRU);
pivotpoint.position.set(53.75, 6, -5.5);
pivotpoint.name = 'pivotpoint';
//pivotpoint.children[0].name = 'blade1';
//pivotpoint.rotation.y = Math.PI;

const pivotpoint2 = pivotpoint.clone();
pivotpoint2.position.set(9.75, 6, -5.5);
pivotpoint2.name = 'pivotpoint2';
//pivotpoint2.children[0].name = 'blade2';

//--------------------------end------------------


export default class PowerStation extends THREE.Group {

    constructor() {
        super();

        this.animations = [];
        this.addParts();
    }

    addParts() {
        // Materials
        //----------
        const baseMaterial = new THREE.MeshStandardMaterial({
            color: 0x808080,
            flatShading: false,
            roughness: 0.5,
            metalness: 0.35
        });

        const baseTextured = new THREE.MeshPhongMaterial({
            color: 0x808080,
            flatShading: false,
            map: new THREE.TextureLoader().load('src/images/Rust.png')
        });

        const towerMaterial = new THREE.MeshStandardMaterial({
            color: 0xe5de00,
            flatShading: false,
            roughness: 0.2,
            metalness: 0.15
        });

        const towerFlatMaterial = new THREE.MeshStandardMaterial({
            color: 0xe5de00,
            flatShading: true,
            roughness: 0.0,
            metalness: 0.15
        });

        const towerBumpMaterial = new THREE.MeshStandardMaterial({
            //color: 0xe5de00,
            flatShading: false,
            roughness: 0.0,
            metalness: 0.15,
            bumpMap: new THREE.TextureLoader().load('src/images/BigBump.jpeg'),
            map: new THREE.TextureLoader().load('src/images/TurbMap.jpg'),
            bumpScale: 0.2
        })

        const roofTextured = new THREE.MeshStandardMaterial({
            color: 0xe5de00,
            flatShading: true,
            roughness: 0.0,
            metalness: 0.15,
            map: new THREE.TextureLoader().load('src/images/Roof.png'),
            side: THREE.DoubleSide
        });

        const rescueRingMaterial = new THREE.MeshPhongMaterial({
            color: 0xa83236,
            flatShading: false,
            specular: 0x111111,
            shininess: 100
        });

        const towerDetailMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            flatShading: true,
        })


        // Geometry
        //---------

        // Base
        const baseGeometry = new THREE.CylinderGeometry(8, 8, 16, 32);
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.position.set(0, 8, 0);
        base.castShadow = true;
        base.receiveShadow = true;
        base.name = 'base';
        this.add(base);

        // Tower
        const towerGeometry = new THREE.CylinderGeometry(6, 6, 48, 32);
        const tower = new THREE.Mesh(towerGeometry, towerMaterial);
        tower.position.set(0, 40, 0);
        tower.castShadow = true;
        tower.receiveShadow = true;
        tower.name = 'tower';

        const towerSidesGeometry = new THREE.BoxGeometry(1, 44, 13.85);
        const towerSides = new THREE.Mesh(towerSidesGeometry, towerMaterial);
        towerSides.position.set(0, -2, 0);
        towerSides.castShadow = true;
        towerSides.receiveShadow = true;
        towerSides.name = 'towerSides';

        tower.add(towerSides);
        this.add(tower);


        // TowerTop
        const towerTopGeometry = new THREE.CylinderGeometry(8,8,10,6);
        const towerTop = new THREE.Mesh(towerTopGeometry, towerFlatMaterial);
        towerTop.position.set(0,65,0);
        towerTop.castShadow = true;
        towerTop.receiveShadow = true;
        towerTop.name = 'towerTop';
        this.add(towerTop);

        // Tower balcony
        const towerBalconyGeometry = new THREE.CylinderGeometry(14, 14, 1, 32);
        const towerBalcony = new THREE.Mesh(towerBalconyGeometry, towerMaterial);
        towerBalcony.position.set(0,60,0);
        towerBalcony.rotation.y = Math.PI / 2;
        towerBalcony.castShadow = true;
        towerBalcony.receiveShadow = true;
        towerBalcony.name = 'towerBalcony';
        this.add(towerBalcony);

        // Tower balcony fence
        //Original
        const fenceGeometry = new THREE.CylinderGeometry(0.15,0.15,5.5);
        const fence = new THREE.Mesh(fenceGeometry, towerMaterial);
        fence.position.set(0,62.25,13.5);
        fence.castShadow = true;
        fence.name = 'fence';
        //this.add(fence, fence2);




        //Copys
        const fence2 = fence.clone();
        fence2.position.set(0,62.25, -13.5);

        const fence3 = fence.clone();
        fence3.position.set(13.5,62.25,0);

        const fence4 = fence.clone();
        fence4.position.set(-13.5,62.25,0);

        const fence5 = fence.clone();
        fence5.position.set(-9,62.25,10);

        const fence6 = fence.clone();
        fence6.position.set(9,62.25,10);

        const fence7 = fence.clone();
        fence7.position.set(-9,62.25,-10);

        const fence8 = fence.clone();
        fence8.position.set(9,62.25,-10);

        //Adding fences
        this.add(fence, fence2, fence3, fence4, fence5, fence6, fence7, fence8);


        //Tower Balcony Railing (2 Parts)

        //Railing 1 top
        const towerBalconyRailingGeometry = new THREE.TorusBufferGeometry(13.5,0.25,10,45);
        const towerBalconyRailing = new THREE.Mesh(towerBalconyRailingGeometry, towerMaterial);
        towerBalconyRailing.position.set(0,65,0);
        towerBalconyRailing.rotation.x = Math.PI / 2;
        towerBalconyRailing.castShadow = true;
        towerBalconyRailing.receiveShadow = true;
        towerBalconyRailing.name = 'towerBalconyRailing';
        this.add(towerBalconyRailing);

        //Railing 2 bot
        const towerBalconyRailingBot = towerBalconyRailing.clone();
        towerBalconyRailingBot.position.set(0, 62,0);
        this.add(towerBalconyRailingBot);

        // TowerTop Detail

        // TowerTop Detail
        const towerTopDetailGeometry = new THREE.CylinderGeometry(0.2,0.25,0.5,42,);
        const topdetail = new THREE.Mesh(towerTopDetailGeometry, towerDetailMaterial);
        topdetail.position.set(0,78,0.5);
        topdetail.castShadow = true;
        topdetail.name = 'topdetail';
        this.add(topdetail);


        //Tower Top Roof
        const towerTopRoofGeometry = new THREE.CylinderGeometry(1,8,8,6);
        //const towerTopRoof = new THREE.Mesh(towerTopRoofGeometry, towerMaterial);
        const towerTopRoof = new THREE.Mesh(towerTopRoofGeometry, [roofTextured, towerFlatMaterial, towerFlatMaterial])
        towerTopRoof.position.set(0,74,0);
        towerTopRoof.castShadow = true;
        towerTopRoof.receiveShadow = true;
        towerTopRoof.name = 'towerTopRoof';
        this.add(towerTopRoof);

        //Tower Antenna
        const towerAntennaGeometry = new THREE.CylinderGeometry(0.25,0.25,25);
        const towerAntenna = new THREE.Mesh(towerAntennaGeometry, towerMaterial);
        towerAntenna.position.set(0,80,-0.5);
        towerAntenna.castShadow = true;
        towerAntenna.receiveShadow = true;
        towerAntenna.name = 'towerAntenna';
        this.add(towerAntenna);

        //Tower Antenna Detail
        const towerAntennaDetailGeometry = new THREE.BoxGeometry(1.5,2,0.2);
        const antennaDetail = new THREE.Mesh(towerAntennaDetailGeometry, towerMaterial);
        antennaDetail.position.set(0,85,-0.5);
        antennaDetail.castShadow = true;
        antennaDetail.receiveShadow = true;
        antennaDetail.name = 'antennaDetail';

        const antennaDetail2 = antennaDetail.clone();
        antennaDetail.position.set(0,85,-0.5);
        antennaDetail2.rotation.y = Math.PI / 2 ;

        this.add(antennaDetail, antennaDetail2);

        //Turbine
        const turbineGeometry = new THREE.CapsuleGeometry(2,20);
        const turbine = new THREE.Mesh(turbineGeometry, towerBumpMaterial);
        turbine.position.set(54,6,3);
        turbine.castShadow = true;
        turbine.receiveShadow = true;
        turbine.rotation.z = Math.PI / 2;
        turbine.rotation.y = Math.PI / 2;
        turbine.name = 'turbine';


        const turbine2 = turbine.clone();
        turbine2.position.set(10,6,3);
        //this.add(turbine, turbine2);


        // Blade Arm
        const armGeometry = new THREE.BoxGeometry(4, 4, 48);
        const arm = new THREE.Mesh(armGeometry, towerMaterial);
        arm.position.set(0 , 24, 0);
        arm.castShadow = true;
        arm.receiveShadow = true;
        arm.name = 'arm';


        const length = 64, width = 8;

        const shape = new THREE.Shape();
        shape.moveTo( 0,0 );
        shape.lineTo( 0, width );
        shape.lineTo( length, width );
        shape.lineTo( length, 0 );
        shape.lineTo( 0, 0 );

        const extrudeSettings = {
            steps: 4,
            depth: 6,
            bevelEnabled: true,
            bevelThickness: 3.5,
            bevelSize: 1,
            bevelOffset: -3.75,
            bevelSegments: 6
        };

        const bladeArmgeometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
        const bladeArm = new THREE.Mesh( bladeArmgeometry, towerMaterial ) ;
        bladeArm.position.set(-3, 20, 32);
        bladeArm.rotation.y = Math.PI / 2;
        bladeArm.castShadow = true;
        bladeArm.name = 'bladeArm';

        const armHolderGeometry = new THREE.CylinderGeometry(7, 7, 12, 32);
        const armHolder = new THREE.Mesh(armHolderGeometry, towerMaterial);
        armHolder.position.set(32, 4, 3);
        armHolder.castShadow = true;
        armHolder.receiveShadow = true;
        armHolder.name = 'armHolder';

        bladeArm.add(armHolder);
        bladeArm.add(turbine);
        bladeArm.add(turbine2);
        bladeArm.add(pivotpoint);
        bladeArm.add(pivotpoint2);

        this.add(bladeArm);


        // Rescue Ring
        const rescueRingGeometry = new THREE.TorusBufferGeometry(2, 0.75, 16, 48);
        const rescueRing = new THREE.Mesh(rescueRingGeometry, rescueRingMaterial);
        rescueRing.position.set(-3, 63.5, -7.5);
        rescueRing.rotation.y = Math.PI / 6;
        rescueRing.name = 'rescueRing';
        this.add(rescueRing);


        // Blade Arm Animation
        // -------------------
        bladeArm.tweenAnimationUp = new TWEEN.Tween(bladeArm.position).to(new THREE.Vector3(
                bladeArm.position.x,
                bladeArm.position.y + 29,
                bladeArm.position.z),
            2000).easing(TWEEN.Easing.Quadratic.Out);

        bladeArm.tweenAnimationDown = new TWEEN.Tween(bladeArm.position).to(new THREE.Vector3(
                bladeArm.position.x,
                bladeArm.position.y,
                bladeArm.position.z),
            2000).easing(TWEEN.Easing.Quadratic.Out);
        bladeArm.up = false;


    }


    addPhysics(){
        // Hier nut zum testen wie die children aufgebaut sind

        //console.log(this);
        /*
        console.log(this.children[16].children[3].children[0]); // blade 1
        console.log(this.children[16].children[4].children[0]); // blade 1
         */

        //window.physics.addBox(this,3,10, 3, 60, 0,24,-40,true);
        window.physics.addCylinder(this,10,8, 8, 70, 32, 0, 35, 0);
        // nur letzte hinzugefügte physics box ist mit dem Objekt verbunden?
    }
}

export {pivotpoint};
export {pivotpoint2};