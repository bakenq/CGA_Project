import * as THREE from 'three';

window.raycaster = new THREE.Raycaster();

let blades = false;
let armDown = true;

export function executeRaycast(event) {

  const mousePosition = new THREE.Vector2();
  mousePosition.x = 2 * (event.clientX / window.innerWidth) - 1;
  mousePosition.y = -2 * (event.clientY / window.innerHeight) + 1;

  window.raycaster.setFromCamera(mousePosition, window.camera);
  let intersects = window.raycaster.intersectObject(window.scene, true);

  if (intersects.length > 0) {
    let firstHit = intersects[0].object;

    if (firstHit.name === 'bladeArm') {
      firstHit.up = !firstHit.up;
      if (firstHit.up) {
        firstHit.tweenAnimationDown.stop();
        firstHit.tweenAnimationUp.start();
        armDown = false;
        blades = false;
      } else {
        firstHit.tweenAnimationUp.stop();
        firstHit.tweenAnimationDown.start();
        armDown = true;
      }
    } else if (firstHit.name === 'blades') {
      if (armDown) {
        blades = !blades;
      }

    }

  }
}
export {blades};
export {armDown};