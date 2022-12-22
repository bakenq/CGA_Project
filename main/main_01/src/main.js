import * as THREE from 'three';
import * as DATGUI from 'datgui';
import * as CONTROLS from 'controls';
import * as TWEEN from 'tween';
import Stats from 'stats';

// Own modules
import PowerStation from './objects/PowerStation.js';
import Television from './objects/Television.js';
import TelevisionFromFile from './objects/TelevisionFromFile.js';
import TableFromFile from './objects/TableFromFile.js';
import PlantFromFile from './objects/PlantFromFile.js';
import Floor from './objects/Floor.js';
import Physics from './physics/Physics.js';

// Event functions
import {updateAspectRatio} from './eventfunctions/updateAspectRatio.js';
import {executeRaycast} from './eventfunctions/executeRaycast.js';
import {keyDownAction, keyUpAction} from './eventfunctions/executeKeyAction.js';

function main() {

  window.scene = new THREE.Scene();
  window.scene.add(new THREE.AxesHelper(50));

  window.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  window.camera.position.set(-100, 300, 300);

  window.renderer = new THREE.WebGLRenderer({antialias: true});
  window.renderer.setSize(window.innerWidth, window.innerHeight);
  window.renderer.setClearColor(0xffffff);
  window.renderer.shadowMap.enabled = true;

  window.physics = new Physics();
  window.physics.setup(0, -200, 0, 1 / 240, true);

  window.audioListener = new THREE.AudioListener();
  window.camera.add(window.audioListener);

  document.getElementById('3d_content').appendChild(window.renderer.domElement);


  // Power Station
  const powerStation = new PowerStation();
  powerStation.position.set(0, 0, 0);
  window.scene.add(powerStation);

  // Blades
  // weil ich noch nicht weiß wie ich die Animation in der externen Datei mache
  const bladeMaterial = new THREE.MeshPhongMaterial({
    color: 0xd3d3d3,
    flatShading: true,
    specular: 0x111111,
    shininess: 100
  });

  const bladeGeometry = new THREE.CylinderGeometry(2, 2, 32, 32);
  const blade = new THREE.Mesh(bladeGeometry, bladeMaterial);
  blade.position.set(-4, 24, -22);
  blade.castShadow = true;
  window.scene.add(blade)

  const blade2 = new THREE.Mesh(bladeGeometry, bladeMaterial);
  blade2.position.set(-4, 24, 22);
  blade2.castShadow = true;
  window.scene.add(blade2)


  // Floor
  const floor = new Floor();
  floor.position.set(0, 0, 0);
  window.scene.add(floor);

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

    window.physics.update(delta);

    window.renderer.render(window.scene, window.camera);
    // Update the wind wheel's rotation
    blade.rotation.x += 0.01;
    blade.rotation.y += 0.01;

    blade2.rotation.x += 0.01;
    blade2.rotation.y += 0.01;



    stats.end();
    requestAnimationFrame(mainLoop);
  }

  mainLoop();
}

window.onload = main;
window.onresize = updateAspectRatio;