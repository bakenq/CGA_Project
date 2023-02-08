import * as THREE from 'three';
import * as DATGUI from 'datgui';
import * as CONTROLS from 'controls';
import * as TWEEN from 'tween';
import Stats from 'stats';

// Own modules
import PowerStation from './objects/PowerStation.js';
import Floor from './objects/Floor.js';
import Background from "./objects/Background.js";
import Physics from './physics/Physics.js';
import PowerStationFromFile from './objects/PowerStationFromFile.js';

// Variable Imports
import {blades} from "./eventfunctions/executeRaycast.js";
import {armDown} from "./eventfunctions/executeRaycast.js";
import {pivotpoint} from "./objects/PowerStation.js";
import {pivotpoint2} from "./objects/PowerStation.js";


// Event functions
import {updateAspectRatio} from './eventfunctions/updateAspectRatio.js';
import {executeRaycast} from './eventfunctions/executeRaycast.js';
import {keyDownAction, keyUpAction} from './eventfunctions/executeKeyAction.js';

function main() {

  window.scene = new THREE.Scene();
  //window.scene.add(new THREE.AxesHelper(50));

  window.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  window.camera.position.set(-100, 300, 300);

  window.renderer = new THREE.WebGLRenderer({antialias: true});
  window.renderer.setSize(window.innerWidth, window.innerHeight);
  window.renderer.setClearColor(0xffffff);
  window.renderer.shadowMap.enabled = true;

  window.physics = new Physics(false);
  window.physics.setup(0, -300, 0, 1 / 240, true);

  window.audioListener = new THREE.AudioListener();
  window.camera.add(window.audioListener);

  document.getElementById('3d_content').appendChild(window.renderer.domElement);


  // Power Station
  const powerStation = new PowerStation();
  powerStation.position.set(0, 2.5, -50);
  powerStation.addPhysics();
  window.scene.add(powerStation);

  //Powerstationfromfile
  const powerStationFromFile = new PowerStationFromFile();
  powerStationFromFile.scale.set(7.5,7.5,7.5);
  powerStationFromFile.position.set(0, 37.5, 50);
  powerStationFromFile.rotation.y = Math.PI;
  powerStationFromFile.addPhysics();
  window.scene.add(powerStationFromFile);

  // Floor
  const floor = new Floor();
  floor.position.set(0, 0, 0);
  floor.addSound();
  window.scene.add(floor);

  //Background
  const background = new Background();
  background.position.set(200,100,0);
  //background.rotation.x = Math.PI;
  window.scene.add(background);


  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff);
  ambientLight.intensity = 0.5;
  window.scene.add(ambientLight);

  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(100, 200, 200);
  spotLight.intensity = 0.8;
  spotLight.target = floor;
  spotLight.angle = THREE.MathUtils.degToRad(30);
  spotLight.penumbra = 1.0;
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.set(2048, 2048);
  spotLight.shadow.camera.aspect = 1;
  spotLight.shadow.camera.near = 100;
  spotLight.shadow.camera.far = 500;
  spotLight.shadow.bias = -0.001;
  //window.scene.add(new THREE.CameraHelper(spotLight.shadow.camera));
  window.scene.add(spotLight);

  const stats = new Stats();
  document.body.appendChild(stats.dom);

  const gui = new DATGUI.GUI();
  gui.add(spotLight.position, 'x', 0, 200);
  gui.add(spotLight.position, 'y', 0, 200);
  gui.add(spotLight.position, 'z', 0, 200);

  const orbitControls = new CONTROLS.OrbitControls(window.camera, window.renderer.domElement);
  orbitControls.target = new THREE.Vector3(0, 0, 0);
  orbitControls.update();

  const clock = new THREE.Clock();

  function mainLoop() {

    stats.begin();

    const delta = clock.getDelta();

    //AnimationMixer PowerStationFromfile
    if (powerStationFromFile.animationMixer !== null) {
      powerStationFromFile.animationMixer.update(delta);
    }

    TWEEN.update();

    // Update the blade's rotation
    if (blades) {
      pivotpoint.rotation.z -= 1 * delta;
      pivotpoint2.rotation.z += 1 * delta;
    } else if (!armDown) {
      pivotpoint.rotation.z = 0;
      pivotpoint2.rotation.z = 0;
    }

    window.physics.update(delta);

    window.renderer.render(window.scene, window.camera);

    stats.end();
    requestAnimationFrame(mainLoop);
  }

  mainLoop();
}

document.getElementById("startButton").addEventListener("click", function () {
  main();
  document.getElementById("overlay").remove();
  window.onresize = updateAspectRatio;
  window.onclick = executeRaycast;
  window.onkeydown = keyDownAction;
  window.onkeyup = keyUpAction;
});