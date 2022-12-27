import * as THREE from 'three';

window.raycaster = new THREE.Raycaster();

let blades = false;

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
      } else {
        firstHit.tweenAnimationUp.stop();
        firstHit.tweenAnimationDown.start();
      }
    } else if (firstHit.name === 'blades') {
      blades = !blades;
    }

  }
}
export {blades};